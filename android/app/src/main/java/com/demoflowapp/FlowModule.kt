package com.demoflowapp

import android.content.Context
import android.util.Log
import android.widget.FrameLayout
import android.view.ViewGroup
import android.view.View
import android.widget.TextView
import android.graphics.Color
import com.checkout.components.core.CheckoutComponentsFactory
import com.checkout.components.interfaces.Environment
import com.checkout.components.interfaces.component.CheckoutComponentConfiguration
import com.checkout.components.interfaces.error.CheckoutError
import com.checkout.components.interfaces.model.ComponentName
import com.checkout.components.interfaces.model.PaymentSessionResponse
import com.checkout.components.interfaces.api.CheckoutComponents
import com.checkout.components.interfaces.component.ComponentCallback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class FlowModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var checkoutComponents: CheckoutComponents

    override fun getName(): String {
        return "FlowModule"
    }

    @ReactMethod
    fun startPaymentSession(paymentSessionID: String, paymentSessionToken: String, paymentSessionSecret: String) {
        Log.d("FlowModule", "Public Key: ${BuildConfig.FLOW_API_KEY}") // Log the public key
        Log.d("FlowModule", "startPaymentSession invoked with ID: $paymentSessionID")
        Log.d("currentActivity", "Current Activity: $currentActivity")

        // Ensure the current activity is available
        val context = currentActivity as Context? ?: return

        Log.d("Context", "Context: $context")


        // Create a FrameLayout programmatically
        val containerView = FrameLayout(context).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }

        // Set the FrameLayout as the content view for the current activity
        currentActivity?.runOnUiThread {
            currentActivity?.setContentView(containerView)
            Log.d("FlowModule", "ContainerView set as content view")
        }

        val customComponentCallback = ComponentCallback(
            onReady = { component ->
                Log.d("flow component","test onReady "+component.name)
            },
            onSubmit = { component ->
                Log.d("flow component ","test onSubmit "+component.name)
            },
            onSuccess = { component, paymentID ->
                Log.d("flow component payment success ${component.name}", paymentID)
            },
            onError = { component, checkoutError ->
                Log.d("flow component callback Error","onError "+checkoutError.message+", "+checkoutError.code)
            },
        )

        // Configure the Flow SDK
        val configuration = CheckoutComponentConfiguration(
            context = context,
            paymentSession = PaymentSessionResponse(
                id = paymentSessionID,
                paymentSessionToken = paymentSessionToken,
                paymentSessionSecret = paymentSessionSecret
            ),
            componentCallback = customComponentCallback,
            publicKey = "pk_sbox_unhsp6d22qf2w4wscmd7yvapmys", // Replace with your API key
            environment = Environment.SANDBOX // Use Environment.LIVE for production
        )

        Log.d("configuration", "Configuration: $configuration")


        // Initialize Checkout Components in a coroutine
        CoroutineScope(Dispatchers.IO).launch {
            try {
                checkoutComponents = CheckoutComponentsFactory(config = configuration).create()
                Log.d("checkoutComponents", "CheckoutComponents: $checkoutComponents")

                val flowComponent = checkoutComponents.create(com.checkout.components.interfaces.model.ComponentName.Flow)
                Log.d("FlowModule", "Flow component created successfully")

                // Render the Flow component
                withContext(Dispatchers.Main) {
                    Log.d("FlowModule", "Rendering Flow component")
                    val view = flowComponent.provideView(containerView)
                    if (view != null) {
                        Log.d("FlowModule", "Flow component view provided successfully")
                        containerView.addView(view)
                    } else {
                        Log.e("FlowModule", "Flow component view is null")
                        // Add fallback UI for debugging
                        val fallbackTextView = TextView(context).apply {
                            text = "Flow component failed to render."
                            textSize = 20f
                            setTextColor(Color.RED)
                        }
                        containerView.addView(fallbackTextView)
                    }
                }

            } catch (checkoutError: CheckoutError) {
                Log.e("FlowModule", "Error in creating Flow component", checkoutError)
                checkoutError.printStackTrace()
            }
        }
    }
}
