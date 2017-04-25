# User Management API

# Introduction
Basic client-server application for managing user records.

`userManagementAPI` provides the following features:
- Seed project for manipulating users' database records
- CRUD operations over User model
- Client-side built with Angular2/ ngx-bootstrap
- Server-side built with Node.Js/ Express/ MongoDB/ Mongoose
- NPM for package managing
- Passport authentication
- Login/Logout


## How to start
Note that this project requires node >=v6.5.0 and npm >=3.10.3 in order to be able to take advantage of the complete functionality.
Make sure you've got MongoDB configured dbpath and server running on default port 27017.

```
# Clone project
git clone https://github.com/dmusev/userManagementAPI.git

# Navigate to project folder
cd userManagementAPI

# Run back-end package installer
npm install

# Navigate to sub folder "public"
cd userManagementAPI/public

# Run front-end package installer
npm install

# Navigate to project folder again
node index.js

# APP is available at: localhost:8081
# User seeded for initial login: admin password: admin

```

# Directory Structure

```
.
├── app                               <- back-end project
|   ├── config
|   |   ├── auth.js
|   |   ├── config.js
|   |   ├── database.js
|   |   ├── express.js
|   |   ├── passport.js
|   |   └── routes.js
|   ├── controllers
|   |   ├── home-controller.js
|   |   ├── index.js
|   |   └── users-controller.js
|   ├── models
|   |   └── User.js
|   └── utilities
|       └── encryption.js
├── public                              <- front-end project
|   ├── app
|   |   ├── 
|   |   ├── components
|   |   |   ├── login
|   |   ├── modules
|   |   |   ├── home
|   |   ├── shared
|   |   |   ├── footer
|   |   |   ├── header
|   |   ├── utils
|   |   |   ├── authGuardComponent.js
|   |   ├── app.component.ts
|   |   ├── app.modules.ts
|   |   ├── app.routes.ts
|   |   └── app.view.html
|   ├── assets                          <- global styles
|   ├── dist                            <- compiled typescript files to js
|   ├── index.html                      <- initial html loaded
|   ├── package.json                    <- dependencies of the front-end project
|   ├── systemjs.config.js              <- configuration of systemjs
|   └── tsconfig.js                     <- configuration of typescript
├── .gitignore            <- ignore files before git upload
├── index.js              <- node starting .js file
├── jsconfig.json         <- configuration of javascirpt
├── package.json          <- dependencies of the back-end project
└── README.md             <- project readme and how to install
```
