import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

app.use("/user", userRoutes)
