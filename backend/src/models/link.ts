
import { Schema, model } from "mongoose"


const linkSchema = new Schema(
    {
        url: { type: "string", required:true, unique:true },
        target: { type:"string", required:true },
        owner: { type: "string", required:true },
        uses: { type: "number", required:true, default:-1 },
        tracking: { type: "boolean", required: true, default: false }
    }
)

const linkModel = model("link", linkSchema)

export default linkModel