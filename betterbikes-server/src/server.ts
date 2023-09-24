import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { appRoutes } from './routes/main';
import {errorMiddleware} from './middleware/errorHandler';
import "express-async-errors"
import fileUpload from "express-fileupload"
import socket, { Server, Socket } from "socket.io"

import { createSocketConnection } from './socket';
import swaggerDocs from './utils/swagger';
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



// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//app routes
appRoutes(app)
app.use("*",errorMiddleware)


const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`
  |=============================================|
    🖇️App listening at http://localhost:${port} 🖇️
  |=============================================|
  `);
});

const io = new Server (server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

app.set("socketio", io);
createSocketConnection(io);

swaggerDocs(app, 5000)

