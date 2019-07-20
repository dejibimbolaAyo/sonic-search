var SonicChannelControl = require("sonic-channel").Control;

var sonicChannelControl = () => new SonicChannelControl({
  host: "::1",            // Or '127.0.0.1' if you are still using IPv4
  port: 1491,             // Default port is '1491'
  auth: "SecretPassword"  // Authentication password (if any)
}).connect({
  connected: function () {
    // Connected handler
    console.info("Sonic Channel succeeded to connect to host (control).");
  },

  disconnected: function () {
    // Disconnected handler
    console.error("Sonic Channel is now disconnected (control).");
  },

  timeout: function () {
    // Timeout handler
    console.error("Sonic Channel connection timed out (control).");
  },

  retrying: function () {
    // Retry handler
    console.error("Trying to reconnect to Sonic Channel (control)...");
  },

  error: function (error) {
    // Failure handler
    console.error("Sonic Channel failed to connect to host (control).", error);
  }
});

export default sonicChannelControl;
