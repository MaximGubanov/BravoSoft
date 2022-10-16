# BravoSoft

## Описание
***BACKEND***: 


    Express.js - для реализации API
    Prisma ORM - для работы с БД
    Postgres - СУБД


***FRONTEND***:


    React.js, Axios


## Как запустить?

    Postgres существует в виде docker-контейнера.
        $ cd BravoSoft
        $ docker-compose up -d

        Имя БД - postgres
        Пользователь - user
        Пароль - user
        Порт - 5432

    FrontEnd:
        $ cd frontend/app
        $ npm install (установить зависимости)
        $ npm start
    
    BackEnd:
        $ cd backend
        $ npm install (установить зависимости)
        $ npm run serve

   