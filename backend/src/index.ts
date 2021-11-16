import fastify from "fastify"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import cookie, { FastifyCookieOptions } from "fastify-cookie"
import Link from "./models/link"
import cors from "fastify-cors"
import fstatic from "fastify-static"
import path from "path"

const urlRegex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")
const PORT = process.env.PORT || 3000
dotenv.config()
const app = fastify()
app.register(cookie, {} as FastifyCookieOptions)
app.register(cors, { origin:["http://localhost:3000", "https://teenie.herokuapp.com/", "https://www.teenie.ml"], credentials:true, exposedHeaders:["set-cookie", "cookie"] })


app.register(fstatic, {
    root: path.join(__dirname, "..", "static"),
    prefix: "/"
})



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


app.get("/", async(req, res) => {
    return res.sendFile("index.html")
})
app.get("/adachi.jpg", async(req, res) => {
    return res.sendFile("adachi.jpg")
})
app.get("/:link",async (req, res) => {
    // Redirect users
    console.log(req.headers);
    
    const { link } = Object(req.params)
    Link.findOne({ url:link })
    .then( data => {
        if(data===null){
            res.header("content-type", "text/html")
            res.status(404).send("<h1>Invalid URL</h1><style>h1{font-family:sans-serif;}html{display:flex;justify-content:center;align-items:center;}</style>")
            return
        }
        if(data.uses>0){
            Link.findByIdAndUpdate(data._id, { $inc: {uses:-1} } )
            .then( data =>{} )
        }
        else if(data.uses==0){
            res.header("content-type", "text/html")
            res.status(400).send("<h1>Maximum uses reached</h1><style>h1{font-family:sans-serif;}html{display:flex;justify-content:center;align-items:center;}</style>")
            return
        }
        res.redirect(data.target)
    } )
})

app.post("/api/register", async (req, res)=> {
    const newId = makeid(16)
    res.cookie("id", newId, { maxAge: 9999**9, httpOnly:true, domain:"teenie.ml", path:"/" })
    res.status(200).send({
        statusCode: 200,
        message: "Successfully registered"
    })
})
app.get("/api/register", async (req, res) => {
    console.log(req.cookies);
    
    const id = req.cookies.id || ""
    return !(id==="")

})
app.post("/api/links", async (req, res) => {
    console.log("Links");
    
    const { maxUses=-1, tracking=false, url="" } : { maxUses:number, tracking:boolean, url:string } = Object(req.body)
    const owner=req.cookies.id || ""
    console.log(owner);
    
    if(owner === ""){
        res.status(400).send(
            {
                statusCode: 400,
                message: "You need to register to use this feature"
            }
        )
        return
    }
    if(url===""){
        res.status(400).send(
            {
                statusCode: 400,
                message: "Url not provided"
            }
        )
        return
    }
    if(!url.match(urlRegex)){
        res.status(400).send(
            {
                statusCode: 400,
                message: "Invalid URL provided"
            }
        )
        return
    }
    Link.create(
        {
            target:url,
            owner:owner,
            uses:maxUses,
            tracking:tracking,
            url:makeid(6)
        }
    )
    .then( data => {
        console.log(data);
        
        res.status(201).send(
            {
                statusCode: 201,
                message: "Successfully created link",
                url: data.url,
                target: data.target,
                uses: data.uses,
                tracking:data.tracking
            }
        )
    } )
    .catch( err => {
        res.status(500).send(
            {
                statusCode: 500,
                message: "Unexpected server error",
                err
            }
        )
    } )

})

const start = async () => {

    try{
        app.listen(PORT, "0.0.0.0")
        console.log(`Server listening on port ${PORT}`);
        mongoose.connect(process.env.MONGOURL || "")
        .then( data => {
            console.log("Successfully connected to mongodb");
            
        } )
        .catch( err => {
            console.log("Database Error");
            console.log(err);         
            process.exit(1)
        })
    }
    catch(err){
        console.log("Unexpected Error");
        console.log(err);
        
    }
}

start()