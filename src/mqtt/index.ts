import * as mqtt from "mqtt/dist/mqtt.min";
export const client = mqtt.connect("ws://localhost:8888");
