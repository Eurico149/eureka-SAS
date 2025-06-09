import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

export default app;
