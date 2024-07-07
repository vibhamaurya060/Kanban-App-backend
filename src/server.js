import  express from 'express';

import {config} from 'dotenv';
import ConnectToDb from './config/db.js';
config();
const app=express();
const port = process.env.PORT;
const db_uri=process.env.DB_URI 

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('this is a home route');
});

app.listen(port, async()=>{
  try{
    await ConnectToDb(db_uri);
    console.log("Connected to database")
    console.log(`Server is running at port ${port}`);
  }catch(err){
    console.log(err);
  }
})