import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import tokenRoutes from "./routes/tokenRoutes";

const app = express();

app.use(express.json());
app.use('/api/auth/user', userRoutes);
app.use('/api/auth/admin', adminRoutes);
app.use('/api/auth/token/user', tokenRoutes);

export default app;
