var SonicChannelSearch = require("sonic-channel").Search;

var sonicChannelSearch = () => new SonicChannelSearch({
  host: "::1",            // Or '127.0.0.1' if you are still using IPv4
  port: 1491,             // Default port is '1491'
  auth: "SecretPassword"  // Authentication password (if any)
}).connect({
  connected: function () {
    // Connected handler
    console.info("Sonic Channel succeeded to connect to host (search).");
  },

  disconnected: function () {
    // Disconnected handler
    console.error("Sonic Channel is now disconnected (search).");
  },

  timeout: function () {
    // Timeout handler
    console.error("Sonic Channel connection timed out (search).");
  },

  retrying: function () {
    // Retry handler
    console.error("Trying to reconnect to Sonic Channel (search)...");
  },

  error: function (error) {
    // Failure handler
    console.error("Sonic Channel failed to connect to host (search).", error);
  }
});

export default sonicChannelSearch;