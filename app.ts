import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import authRouter from "./src/routes/AuthRoute";
import {DbContext} from "./src/DAL/DbContext";
import {PrismaClient} from '@prisma/client';


dotenv.config();

const app:Express = express();
const port = process.env.PORT;

//MiddleWares
app.use(express.json());  //parsing json content


//Database Operations
const db = new DbContext();

// const prisma = new PrismaClient();

// async function main(){
//     await prisma.$connect();
//     const allUsers = await prisma.user.findMany();
//     console.log(allUsers);
// }

// main()
// .then(async () => {
//     await prisma.$disconnect();
// })
// .catch(async (e) =>{
//     console.log(e);
//     await prisma.$disconnect();
//     process.exit(1);
// })
    

//routes
app.get('/',(req:Request,res:Response)=>{
    res.send("Node~~Express~~Typescript app response");
});

app.get("/about",(req:Request,res:Response) =>{
    res.status(200).send("From About");
})

app.use("/auth",authRouter);

db.connect()
    .then(() =>{
        console.log("DB Connected!");
        app.listen(port,() => console.log(`Server is running at ${port}`));
    })
    .catch((e) => {
        console.log(`Error while starting server ${e}`);
        process.exit(1);
    });
