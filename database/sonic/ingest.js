var SonicChannelIngest = require("sonic-channel").Ingest;

var sonicChannelIngest = () => new SonicChannelIngest({
  host: "::1",            // Or '127.0.0.1' if you are still using IPv4
  port: 1491,             // Default port is '1491'
  auth: "SecretPassword"  // Authentication password (if any)
}).connect({
  connected: function () {
    // Connected handler
    console.info("Sonic Channel succeeded to connect to host (ingest).");
  },

  disconnected: function () {
    // Disconnected handler
    console.error("Sonic Channel is now disconnected (ingest).");
  },

  timeout: function () {
    // Timeout handler
    console.error("Sonic Channel connection timed out (ingest).");
  },

  retrying: function () {
    // Retry handler
    console.error("Trying to reconnect to Sonic Channel (ingest)...");
  },

  error: function (error) {
    // Failure handler
    console.error("Sonic Channel failed to connect to host (ingest).", error);
  }
});

export default sonicChannelIngest;