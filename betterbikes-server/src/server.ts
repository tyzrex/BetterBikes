import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { appRoutes } from './routes/main';
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//app routes
appRoutes(app)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`
  |=============================================|
    🖇️App listening at http://localhost:${port} 🖇️
  |=============================================|
  `);
});