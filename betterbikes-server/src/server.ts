import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';

import { errorMiddleware } from './middleware/errorHandler';
import appRoutes from './routes/main';
import { createSocketConnection } from './socket';
import swaggerDocs from './utils/swagger';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(bodyParser.json());

app.use(appRoutes);

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

app.set("io", io);
createSocketConnection(io);

swaggerDocs(app, 5000)

