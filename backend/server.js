import express from 'express';
import dotenv from 'dotenv';
import connectToMongoose from './db/connectingToMongoose.js';
import operator from './operator.js';

dotenv.config();

const app = express();  
const PORT = process.env.PORT || 3000;  

app.use(express.json());

app.use('/api',operator);

app.listen(PORT, () => {  
  connectToMongoose();
  console.log(`Server is running on port ${PORT}`);
});