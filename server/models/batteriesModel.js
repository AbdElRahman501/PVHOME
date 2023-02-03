import mongoose from "mongoose"


const batterySchema = new mongoose.Schema({
    name: { type: String },
    voltage: { type: Number },
    ampereHour: { type: Number },
    price: { type: Number },
    dod: { type: Number }
}, {
    timestamps: true,
});

const Batteries = mongoose.model("Batteries", batterySchema);
export default Batteries