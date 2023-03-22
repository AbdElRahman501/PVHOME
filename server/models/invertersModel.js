import mongoose from "mongoose"


const inverterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    voltage: [{ type: Number}],
    voltageRang: {
        min: { type: Number },
        max: { type: Number }
    },
    power: { type: Number, required: true },
    inputPowerMax: { type: Number, required: true },
    price: { type: Number, required: true },
    efficiency: { type: Number, required: true }
}, {
    timestamps: true,
});

const Inverters = mongoose.model("Inverters", inverterSchema);
export default Inverters