
import { Schema, model } from "mongoose"

function makeid(length : number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

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