import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import authRouter from "./src/routes/AuthRoute";

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.use(express.json());  //parsing json content

app.get('/',(req:Request,res:Response)=>{
    res.send("Node~~Express~~Typescript app response");
});

app.get("/about",(req:Request,res:Response) =>{
    res.status(200).send("From About");
})

app.use("/auth",authRouter);

app.listen(port,() => console.log(`Server is running at ${port}`));
