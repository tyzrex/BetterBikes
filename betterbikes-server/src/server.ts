import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { appRoutes } from './routes/main';
import {errorMiddleware} from './middleware/errorHandler';
import "express-async-errors"
import { validateToken } from './middleware/validateToken';
import fileUpload from "express-fileupload"
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(bodyParser.json());



app.post('/',validateToken, (req, res) => {
    res.send('Hello World!');
});

//app routes
appRoutes(app)
app.use("*",errorMiddleware)


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`
  |=============================================|
    🖇️App listening at http://localhost:${port} 🖇️
  |=============================================|
  `);
});