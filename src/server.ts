import app from "./app";

import mqtt from "mqtt";

/**
 * Start mqtt sub
 */
const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

client.on('connect', function () {
  client.subscribe('jczas/feeds/jenkins')
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
});

client.on('error', function (error) {
  console.log('error: ' + error)
});


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});


export default server;
