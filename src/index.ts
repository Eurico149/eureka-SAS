import express from "express";
import redis from "./conns/connectionRedis";
import {testDB} from "./conns/connectionMaria";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";


const app = express();
const PORT = process.env.PORT ?? 80;
app.use(express.json());

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})



testDB();

redis.on('connect', () => {
    console.log('Redis Connected!');
});

redis.on('error', (err) => {
    console.error('Erro to connect to redis:', err);
});
