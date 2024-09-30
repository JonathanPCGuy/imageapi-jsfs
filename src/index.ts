import express from 'express'
import apiRoutes from './routes/api'

const app = express();
const port = 3000;

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });