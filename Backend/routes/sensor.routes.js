import express from "express";
import {getSensorData, createSensorData}  from "../controllers/sensor.controllers.js";
const router = express.Router();

router.get("/",  getSensorData);
router.post("/", createSensorData);

export default router;