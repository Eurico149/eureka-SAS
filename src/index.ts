import express from "express";
import userRoutes from "./routes/userRoutes";
import {testDB} from "./conns/connectionMaria";
import redis from "./conns/connectionRedis";


const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.use('/user', userRoutes)

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
