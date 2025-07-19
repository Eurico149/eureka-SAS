# Eureka-SAS

Eureka-SAS is a stateful authentication service that provides a secure and efficient way to manage user sessions.
<br>
It is designed to handle user authentication in a scalable and lightweight manner, 
making it suitable for modern web applications.

# Stack
- Typescript
- MariaDB
- Redis
- Nginx
- Docker

## How to run
```
git clone https://github.com/Eurico149/eureka-SAS.git
cd eureka-SAS

docker compose up --scale api=2
```
It's also possible to test and see the endpoints of this service using insomnia with 
the json file provided in the root directory.

## Structure
```
eureka-SAS/
├─── docker-config/
│   ├─── mariaDB/
│   └─── nginx/
├─── src/
│   ├─── conns/
│   ├─── controllers/
│   ├─── middlewares/
│   ├─── models/
│   ├─── repositories/
│   ├─── routes/
│   └─── services/
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── Insomnia_eurekaSAS.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## License
This project is licensed under the [MIT License](LICENSE).
