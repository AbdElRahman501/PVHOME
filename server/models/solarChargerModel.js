import mongoose from "mongoose"


const solarChargerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    systemVoltage: [{ type: Number }],
    maxStringVoltage: { type: Number },
    maxPower: { type: Number, required: true },
    rateCurrent: { type: Number, required: true },
    price: { type: Number, required: true },
    efficiency: { type: Number },
    features: [{ type: String }]
}, {
    timestamps: true,
});

const SolarCharger = mongoose.model("SolarCharger", solarChargerSchema);
export default SolarCharger