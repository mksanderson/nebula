import express from 'express';
import bodyParser from 'body-parser';
import openrouterRouter from './routes/openrouter';

const app = express();
app.use(bodyParser.json());
app.use('/ai', openrouterRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
