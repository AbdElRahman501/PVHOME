import mongoose from "mongoose"


const batterySchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    voltage: { type: Number, required: true },
    ampereHour: { type: Number, required: true },
    price: { type: Number, required: true },
    dod: { type: Number, required: false }
}, {
    timestamps: true,
});

const Batteries = mongoose.model("Batteries", batterySchema);
export default Batteries