import path from 'path';
import express from "express";
import 'dotenv/config'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true ,limit: '50mb' }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_CLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});