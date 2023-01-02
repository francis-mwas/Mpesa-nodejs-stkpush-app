import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mpesaRoutes from './routes/MpesaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Mpesa routes
app.use('/api/v1/mpesa-payment', mpesaRoutes);

//listening to a port.
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
