import Sensor from "../models/sensor.models.js";
export const createSensorData = async (req, res) => {
    try {
        const { sensorName, temperature } = req.body;
        if (!sensorName || !temperature) {
            return res.status(400).json({ error: "Please provide sensorName and temperature" });
        }
        const newSensorData = new Sensor({
            sensorName,
            temperature,
        });
        await newSensorData.save();
        res.status(201).json(newSensorData);
    } catch (error) {
        console.error("Error in createSensorData: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getSensorData = async (req, res) => {
    try {
        const sensorName = req.query.sensorName;
        if (!sensorName) {
            return res.status(400).json({ error: "Please provide SensorName" });
        }
        const sensorData = await Sensor.find({ sensorName: sensorName });
        res.status(200).json(sensorData);
    } catch (error) {
        console.error("Error in getSensorData: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

