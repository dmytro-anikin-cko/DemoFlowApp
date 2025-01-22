package com.demoflowapp

import android.content.Context
import android.util.Log
import com.checkout.components.core.CheckoutComponentsFactory
import com.checkout.components.interfaces.Environment
import com.checkout.components.interfaces.component.CheckoutComponentConfiguration
import com.checkout.components.interfaces.error.CheckoutError
import com.checkout.components.interfaces.model.ComponentName
import com.checkout.components.interfaces.model.PaymentSessionResponse
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class FlowModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FlowModule"
    }

    @ReactMethod
    fun startPaymentSession(paymentSessionID: String, paymentSessionToken: String, paymentSessionSecret: String) {
        Log.d("FlowModule", "Public Key: ${BuildConfig.FLOW_API_KEY}") // Log the public key
        Log.d("FlowModule", "startPaymentSession invoked with ID: $paymentSessionID")
        
        // Ensure the current activity is available
        val context = currentActivity as Context? ?: return

        // Configure the Flow SDK
        val configuration = CheckoutComponentConfiguration(
            context = context,
            paymentSession = PaymentSessionResponse(
                id = paymentSessionID,
                paymentSessionToken = paymentSessionToken,
                paymentSessionSecret = paymentSessionSecret
            ),
            publicKey = BuildConfig.FLOW_API_KEY, // Replace with your API key
            environment = Environment.SANDBOX // Use Environment.LIVE for production
        )

        // Initialize Checkout Components in a coroutine
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val checkoutComponents = CheckoutComponentsFactory(config = configuration).create()
                val flowComponent = checkoutComponents.create(ComponentName.Flow)
                Log.d("FlowModule", "Flow component created successfully")

                // Render the Flow component
                currentActivity?.runOnUiThread {
                    Log.d("FlowModule", "Rendering Flow component")
                    flowComponent.Render()
                }

            } catch (checkoutError: CheckoutError) {
                Log.e("FlowModule", "Error in creating Flow component", checkoutError)
                checkoutError.printStackTrace()
            }
        }
    }
}
