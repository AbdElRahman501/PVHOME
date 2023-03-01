import mongoose from "mongoose"


const panelSchema = new mongoose.Schema({
    name: { type: String },
    power: { type: Number },
    vmpp:{ type: Number },
    impp:{ type: Number },
    voc:{ type: Number },
    isc:{ type: Number },
    dimensions: {
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number }
    },
    price: { type: Number },
    efficiency: { type: Number },
    type: { type: String }
}, {
    timestamps: true,
});

const Panels = mongoose.model("Panels", panelSchema);
export default Panels
