import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, Platform, Text, View } from 'react-native';
import { NativeModules } from 'react-native';

const { FlowModule, CheckoutFlowManager } = NativeModules; // Import both modules

// Add logging to debug module availability
console.log('Available Native Modules:', Object.keys(NativeModules));
console.log('Checking CheckoutFlowManager:', CheckoutFlowManager);
console.log('Checking FlowModule:', FlowModule);

// Platform-specific module validation
if (Platform.OS === 'ios' && !CheckoutFlowManager) {
  console.error('CheckoutFlowManager is not linked properly for iOS.');
}

if (Platform.OS === 'android' && !FlowModule) {
  console.error('FlowModule is not linked properly for Android.');
}

function App(): React.JSX.Element {
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState<string | null>(null);

  const startPayment = async () => {
    setStatus('Processing...');
    setError(null);
    
    try {

        const paymentSessionID = 'ps_2tgZLbjrrOLpEE10WtZTPEfJyvz';
        const paymentSessionToken = 'YmFzZTY0:eyJpZCI6InBzXzJ0Z1pMYmpyck9McEVFMTBXdFpUUEVmSnl2eiIsImVudGl0eV9pZCI6ImVudF9rdHV5NDZqZ2loNW4yeXJxdHQ3MmpuZTR5eSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfdzJuanBiNmpiamp1amdjejVkZ3p4ZG41bW0iLCJhbW91bnQiOjI4MDAsImxvY2FsZSI6ImVuLUdCIiwiY3VycmVuY3kiOiJFVVIiLCJwYXltZW50X21ldGhvZHMiOlt7InR5cGUiOiJjYXJkIiwiY2FyZF9zY2hlbWVzIjpbIlZpc2EiLCJNYXN0ZXJjYXJkIiwiQW1leCJdLCJzY2hlbWVfY2hvaWNlX2VuYWJsZWQiOmZhbHNlLCJzdG9yZV9wYXltZW50X2RldGFpbHMiOiJkaXNhYmxlZCJ9LHsidHlwZSI6ImFwcGxlcGF5IiwiZGlzcGxheV9uYW1lIjoiQ0tPIiwiY291bnRyeV9jb2RlIjoiRVMiLCJjdXJyZW5jeV9jb2RlIjoiRVVSIiwibWVyY2hhbnRfY2FwYWJpbGl0aWVzIjpbInN1cHBvcnRzM0RTIl0sInN1cHBvcnRlZF9uZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyQ2FyZCIsImFtZXgiXSwidG90YWwiOnsibGFiZWwiOiJDS08iLCJ0eXBlIjoiZmluYWwiLCJhbW91bnQiOiIyOCJ9fSx7InR5cGUiOiJnb29nbGVwYXkiLCJtZXJjaGFudCI6eyJpZCI6IjA4MTEzMDg5Mzg2MjY4ODQ5OTgyIiwibmFtZSI6IkNLTyIsIm9yaWdpbiI6Imh0dHBzOi8vY2hlY2tvdXQuY2hlY2tvdXQudGVzdC5zdWNjZXNzIn0sInRyYW5zYWN0aW9uX2luZm8iOnsidG90YWxfcHJpY2Vfc3RhdHVzIjoiRklOQUwiLCJ0b3RhbF9wcmljZSI6IjI4IiwiY291bnRyeV9jb2RlIjoiRVMiLCJjdXJyZW5jeV9jb2RlIjoiRVVSIn0sImNhcmRfcGFyYW1ldGVycyI6eyJhbGxvd2VkX2F1dGhfbWV0aG9kcyI6WyJQQU5fT05MWSIsIkNSWVBUT0dSQU1fM0RTIl0sImFsbG93ZWRfY2FyZF9uZXR3b3JrcyI6WyJWSVNBIiwiTUFTVEVSQ0FSRCIsIkFNRVgiXX19LHsidHlwZSI6InNvZm9ydCJ9XSwiZmVhdHVyZV9mbGFncyI6WyJhbmFseXRpY3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwiZ2V0X3dpdGhfcHVibGljX2tleV9lbmFibGVkIiwibG9nc19vYnNlcnZhYmlsaXR5X2VuYWJsZWQiLCJ1c2Vfbm9uX2JpY19pZGVhbF9pbnRlZ3JhdGlvbiJdLCJyaXNrIjp7ImVuYWJsZWQiOmZhbHNlfSwiaW50ZWdyYXRpb25fZG9tYWluIjoiYXBpLnNhbmRib3guY2hlY2tvdXQuY29tIn0=';
        const paymentSessionSecret = 'pss_89fce857-1bbc-4682-8e07-96f02542c0cc';

      // Sample payment session data
      const paymentSession = {
        id: 'ps_2tgXdFCcZQXEIEcvu7uImkT9CNr',
        payment_session_secret: 'pss_3e0ed0d8-7a46-40c0-aa4f-d82f8b41ef4c'
      };

      if (Platform.OS === 'ios') {
        console.log('Initializing iOS payment flow...');
        try {
          // Use the promise-based approach for iOS
          const initResult = await CheckoutFlowManager.initialize(paymentSession);
          console.log('iOS initialization result:', initResult);
          
          const renderResult = await CheckoutFlowManager.renderFlow();
          console.log('iOS render result:', renderResult);
          
          setStatus('Payment flow started');
        } catch (iosError) {
          console.error('iOS payment error:', iosError);
          setError(`iOS Error: ${iosError instanceof Error ? iosError.message : String(iosError)}`);
          setStatus('Error');
        }
      } else if (Platform.OS === 'android') {
        console.log('Initializing Android payment flow...');
        try {
          // For Android, use the existing implementation
          FlowModule.startPaymentSession(
            paymentSessionID,
            paymentSessionToken,
            paymentSessionSecret,
          );
          setStatus('Payment flow started');
        } catch (androidError) {
          console.error('Android payment error:', androidError);
          setError(`Android Error: ${androidError instanceof Error ? androidError.message : String(androidError)}`);
          setStatus('Error');
        }
      }
    } catch (error) {
      console.error('General payment error:', error);
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checkout.com Flow Demo</Text>
      
      {/* Status display */}
      <View style={styles.statusContainer}>
        <Text>Status: </Text>
        <Text style={
          status === 'Error' ? styles.errorText : 
          status === 'Processing...' ? styles.processingText : 
          status === 'Payment flow started' ? styles.successText : 
          styles.readyText
        }>
          {status}
        </Text>
      </View>
      
      {/* Error message if any */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {/* Module detection info */}
      <View style={styles.moduleInfoContainer}>
        <Text>iOS Module: {CheckoutFlowManager ? '✅ Available' : '❌ Missing'}</Text>
        <Text>Android Module: {FlowModule ? '✅ Available' : '❌ Missing'}</Text>
        <Text>Current Platform: {Platform.OS}</Text>
      </View>
      
      <Button 
        title="Start Payment Session" 
        onPress={startPayment} 
        disabled={status === 'Processing...'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: '#ffeeee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  moduleInfoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  successText: {
    color: 'green',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  processingText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  readyText: {
    color: 'black',
  },
});

export default App;