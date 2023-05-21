import express, { urlencoded } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from './mongodb/connect.js';
import postRoutes from "./routes/postRoutes.js"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/v1/post", postRoutes);


app.get("/", async (req, res) => {
    res.send("Hello form Dall-E")
});
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
    }

    app.listen(3000, () => { console.log("Server is running at port 3000") })
};
startServer();