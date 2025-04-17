import express, { Application, Request, Response } from "express"
import config from "./app/config";
import nodemailer from 'nodemailer';
import cors from 'cors'

const app:Application = express()

app.use(cors());
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.post("/contact",async(req,res)=>{
    const { name, email, message } = req.body;

    console.log(config.userMail,config.mailPass)

    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use host + port if you're using Mailtrap
      auth: {
        user: config.userMail,
        pass: config.mailPass,
      },
    });
  
    const mailOptions = {
      from: email,
      to: config.userMail,
      subject: `Message from ${name}`,
      text: message,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
})

export default app;