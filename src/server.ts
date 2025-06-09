import app from "./index";
import redis from "./conns/connectionRedis";
import { testDB } from "./conns/connectionMaria";

const PORT = process.env.PORT ?? 80;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


testDB();

redis.on('connect', () => {
    console.log('Redis Connected!');
});

redis.on('error', (err) => {
    console.error('Erro to connect to redis:', err);
});
