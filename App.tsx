import React from 'react';
import {SafeAreaView, Button, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';

const {FlowModule} = NativeModules; // Import FlowModule

if (!FlowModule) {
  console.error('FlowModule is not linked properly.');
}

function App(): React.JSX.Element {
  const startPayment = () => {
    // Replace these with actual values
    const paymentSessionID = 'ps_2rtxbnoBKYA8NxF8KAnScmOc4AH';
    const paymentSessionToken = 'pss_b64b1e1c-0084-4a04-8ef1-cc10493f8b8f';
    const paymentSessionSecret = 'YmFzZTY0:eyJpZCI6InBzXzJydHhibm9CS1lBOE54RjhLQW5TY21PYzRBSCIsImVudGl0eV9pZCI6ImVudF9rdHV5NDZqZ2loNW4yeXJxdHQ3MmpuZTR5eSIsImV4cGVyaW1lbnRzIjp7ImV4cF9jYXJkaG9sZGVyX2ZpZWxkX3Bvc2l0aW9uIjoidG9wIn0sInByb2Nlc3NpbmdfY2hhbm5lbF9pZCI6InBjX3cybmpwYjZqYmpqdWpnY3o1ZGd6eGRuNW1tIiwiYW1vdW50IjoxOTAwLCJsb2NhbGUiOiJlbi1HQiIsImN1cnJlbmN5IjoiRVVSIiwicGF5bWVudF9tZXRob2RzIjpbeyJ0eXBlIjoiY2FyZCIsImNhcmRfc2NoZW1lcyI6WyJWaXNhIiwiTWFzdGVyY2FyZCIsIkFtZXgiXSwic2NoZW1lX2Nob2ljZV9lbmFibGVkIjpmYWxzZSwic3RvcmVfcGF5bWVudF9kZXRhaWxzIjoiZGlzYWJsZWQifSx7InR5cGUiOiJhcHBsZXBheSIsImRpc3BsYXlfbmFtZSI6IkNLTyIsImNvdW50cnlfY29kZSI6IkVTIiwiY3VycmVuY3lfY29kZSI6IkVVUiIsIm1lcmNoYW50X2NhcGFiaWxpdGllcyI6WyJzdXBwb3J0czNEUyJdLCJzdXBwb3J0ZWRfbmV0d29ya3MiOlsidmlzYSIsIm1hc3RlckNhcmQiLCJhbWV4Il0sInRvdGFsIjp7ImxhYmVsIjoiQ0tPIiwidHlwZSI6ImZpbmFsIiwiYW1vdW50IjoiMTkifX0seyJ0eXBlIjoiZ29vZ2xlcGF5IiwibWVyY2hhbnQiOnsiaWQiOiIwODExMzA4OTM4NjI2ODg0OTk4MiIsIm5hbWUiOiJDS08iLCJvcmlnaW4iOiJodHRwczovL2NoZWNrb3V0LmNoZWNrb3V0LnRlc3Quc3VjY2VzcyJ9LCJ0cmFuc2FjdGlvbl9pbmZvIjp7InRvdGFsX3ByaWNlX3N0YXR1cyI6IkZJTkFMIiwidG90YWxfcHJpY2UiOiIxOSIsImNvdW50cnlfY29kZSI6IkVTIiwiY3VycmVuY3lfY29kZSI6IkVVUiJ9LCJjYXJkX3BhcmFtZXRlcnMiOnsiYWxsb3dlZF9hdXRoX21ldGhvZHMiOlsiUEFOX09OTFkiLCJDUllQVE9HUkFNXzNEUyJdLCJhbGxvd2VkX2NhcmRfbmV0d29ya3MiOlsiVklTQSIsIk1BU1RFUkNBUkQiLCJBTUVYIl19fSx7InR5cGUiOiJzb2ZvcnQifV0sImZlYXR1cmVfZmxhZ3MiOlsiYW5hbHl0aWNzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsImZyYW1lc19mYXN0bHlfd2FmX2VuYWJsZWQiLCJsb2dzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsInVzZV9ub25fYmljX2lkZWFsX2ludGVncmF0aW9uIl0sInJpc2siOnsiZW5hYmxlZCI6ZmFsc2V9LCJpbnRlZ3JhdGlvbl9kb21haW4iOiJhcGkuc2FuZGJveC5jaGVja291dC5jb20ifQ==';

    FlowModule.startPaymentSession(
      paymentSessionID,
      paymentSessionToken,
      paymentSessionSecret,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Start Payment Session" onPress={startPayment} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
