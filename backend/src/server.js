import express from 'express'
import 'dotenv/config';
import cors from 'cors'



  

const app = express()
const PORT = process.env.PORT

 




app.listen(PORT,()=>{
    console.log(`server listen on port ${PORT}`)
})  