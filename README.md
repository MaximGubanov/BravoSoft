# BravoSoft

## http://194.61.0.120:3333/ - ресурс с готовым ТЗ

## Описание
***BACKEND***: 


    Express.js, TypeScript, cors - для реализации API
    Prisma ORM - для работы с БД
    Postgres - СУБД


***FRONTEND***:


    React.js, Redux, axios, react-router-dom, styled-components


## Как запустить локально?

    Клонируйте проект к себе на ПК:
    
        $ git clone https://github.com/MaximGubanov/BravoSoft.git
    
    Перейдите в директорию BravoSoft:

        $ cd BravoSoft
    
    Затем выполните:
    
        $ sudo docker-compose up --build

    Перейдите в браузер по ссылке http://localhost:3333

    Готово!


    Примечание: БД работает отдельно в Docker-контейнере на удалнном сервере.