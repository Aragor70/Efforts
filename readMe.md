## Efforts web application

Meet the Efforts and organize your tasks. The efforts management platform lets you to upload your tasks to the global system and update them.

You can review your tasks in a form of the list. Click on them to mark as completed (you can update the status back). To make your efforts more efficient, we suggest you to filter the cards by status or a date of their creation.

## Demo

https://efforts.m-prus.uk/


## Technical Specification

- A README file with setup instructions.
- Good testing practices (full-stack).

- A git repository with clean commit history.
- Good REST practices.
- Async and Error handling (custom error response).


## Usage

1. Application is connected to PostgreSQL database. Find the latest version of PotgreSQL from the official website https://www.postgresql.org/download/
To initialize the PostgreSQL on your computer set up your access password during the installation and keep a default the other options.

2. Rename "config/config.env.env" to "config/config.env" and update environment settings to your own *. 

.* (Include only your db password, if you are using a default local configuration).

3. Access db command line (optional)

```
psql postgres postgres
```

## Install dependencies


```
# Run to change directory to client

cd client
```

```
# Run this command in both server and client directories.

npm install
```

```
# Run this command in ./client to build the client project.

npm run build
```

```
# Run to change directory to server

cd ../server
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


## Run App in development environment
```
npm run dev
```

## Run unit tests

Run Server-side tests
```
npm test
```
Run Client tests
```
npm client-tests
```


## Available access points: 

| open react app |
| :---: |

GET '/'


| get all available tasks + filtering (optional) |
| :---: |

GET api/tasks/

GET api/tasks?phrase=""

*letters are not case sensitive

GET api/tasks?status=""

*available 'completed' and 'pending'

GET api/tasks?startDate=""

GET api/tasks?endtDate=""

| create a new task |
| :---: |

POST api/tasks/ 

*JSON body = title is required

Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).

| update available task by id to update its title or status |
| :---: |

PUT api/tasks/:id 

*JSON body = title or isCompleted = true

Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).

| delete available task by id |
| :---: |

DELETE api/tasks/:id


## Installation Missing?

If some scenario is not covered, please let me know by email.

- Version prequire 1.0.0
- License MIT

created by mikey.prus@gmail.com

---


<p align="center"><img src="client/public/efforts-mobile.png" width="100%" alt="efforts"></p>
