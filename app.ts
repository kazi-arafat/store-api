import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import authRouter from "./src/routes/AuthRoute";
import {productRouter} from "./src/routes/ProductRoute";
import {DbContext} from "./src/DAL/DbContext";


dotenv.config();

const app:Express = express();
const port = process.env.PORT;

//MiddleWares
app.use(express.json());  //parsing json content


//Database Operations
const db = new DbContext();

//routes
app.get("/api/about",(req:Request,res:Response) =>{
    res.status(200).json(
        {about: {
            "name": "store-api",
            "version": "1.0.0",
            "description": "API for sote admin app. Powered by node-typescript-mongodb.",
            "author": "Kazi Arafat",
            "license": "MIT",
            "repository": {
                "type": "git",
                "url": "git+https://github.com/kazi-arafat/store-api.git"
              },
            "homepage": "https://github.com/kazi-arafat/store-api#readme"
        }
    });
})

app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);

db.connect()
    .then(() =>{
        console.log("DB Connected!");
        app.listen(port,() => console.log(`Server is running at ${port}`));
    })
    .catch((e) => {
        console.log(`Error while starting server ${e}`);
        process.exit(1);
    });
