import mongoose from "mongoose"


const panelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String },
    power: { type: Number, required: true },
    maxStringVoltage: { type: Number, required: true },
    vmpp: { type: Number, required: true },
    impp: { type: Number, required: true },
    voc: { type: Number, required: true },
    isc: { type: Number, required: true },
    dimensions: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        depth: { type: Number, required: true }
    },
    price: { type: Number, required: true },
    efficiency: { type: Number, required: true },
    type: { type: String, required: true }
}, {
    timestamps: true,
});

const Panels = mongoose.model("Panels", panelSchema);
export default Panels
