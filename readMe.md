## Efforts web application

Meet the Efforts and organize your tasks. The efforts management platform lets you to upload your tasks to the global system and update them.

You can review your tasks in a form of the list. Click on them to mark as completed (you can update the status back). To make your efforts more efficient, we suggest you to filter the cards by status or a date of their creation.


## Technical Specification

- A README file with setup instructions.
- Good testing practices (full-stack).

- A git repository with clean commit history.
- Good REST practices.
- Async and Error handling (custom error response).


## Usage

1. Application is connected to PostgreSQL database. To download PotgreSQL https://www.postgresql.org/download/
In a way to initialize the PostgreSQL on your computer set up your access password during the installation and keep a default the other options.

2. Rename "config/config.env.env" to "config/config.env" and update environment settings to your own *. 

.* (Include only your db password, if you are using a default local configuration).


## Install dependencies

```
# Run this command in the base and client directory.

npm install
```

```
# Run to change directory to server

cd server
```

```
# Run to initialize the effort database

npx sequelize-cli db:create
```

```
# Run to initialize the tasks table

npx sequelize-cli db:migrate
```

```
# Run to seed initial rows (optional)

npx sequelize-cli db:seed:all
```


Run App in development environment
```
npm run dev
```

Run API tests
```
npm test
```
Run Client tests
```
npm client-tests
```

- Version prequire 1.0.0
- License MIT

created by mikey.prus@gmail.com

---


<p align="center"><img src="client/public/efforts-mobile.png" width="100%" alt="efforts"></p>
