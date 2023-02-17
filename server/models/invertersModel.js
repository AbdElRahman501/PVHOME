import mongoose from "mongoose"


const inverterSchema = new mongoose.Schema({
    name: { type: String },
    voltage: [Number],
    power: { type: Number },
    price: { type: Number },
    efficiency: { type: Number }
}, {
    timestamps: true,
});

const Inverters = mongoose.model("Inverters", inverterSchema);
export default Inverters