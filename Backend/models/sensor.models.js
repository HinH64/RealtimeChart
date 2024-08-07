import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
	{
		sensorName: {
			type: String,
			required: true,
		},
		temperature: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;