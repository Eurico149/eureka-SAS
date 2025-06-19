# SAS (Statefull Authentification Service)

eureka-SAS is a stateful authentication service that provides a secure and efficient way to manage user sessions. 

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

docker compose up --build --scale api=2
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