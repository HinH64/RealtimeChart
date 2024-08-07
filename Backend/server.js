import express from "express";
import dotenv from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";
import sensorRoutes from "./routes/sensor.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use("/api/sensor", sensorRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log('Server Running on port ' + PORT);
}
);