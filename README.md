# Dice Rollerz
![travis badge](https://img.shields.io/travis/Brian-Fairbanks/TV-Tracker)

## Description
<img src="https://raw.githubusercontent.com/Brian-Fairbanks/DiceRollerz/master/client/public/icons/DRZ.png" align="right" alt="Dice Rollerz Logo by Brian Fairbanks" width="150" height="150">
Dice Rollerz is an online chat app that helps D&D enthusiasts communicate and organize while seperated by distance.

- Users can create accounts and customize their profiles with avatars. 
- Registered users can create create chat rooms and send/receive messages from other users.
- In future builds, the chat app will incorperate game tools such as a dice roller to further aid users.


## Table of Contents
* [License](#license)
* [Scripts](#Scripts)
* [Dependencies](#dependencies)
* [Credits](#contributing)
* [Testing](#tests)
* [Questions](#questions)
* [Demo](#demo)

## License

<details open>
<summary>ICS License</summary>
<br>
Copyright 2020 Brian Fairbanks

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
</details>


## Scripts
### Install
    npm install
### Run (production)
    npm start
    npx nodemon server.js
### Run (dev)
    npm run client
### Seed
    npm run seed
### Build
    npm run build

## Dependencies
### Extenal APIs
* Coming soon

### Node Extensions
#### General
* "@material-ui/core": "^4.10.0",
* "@material/top-app-bar": "^6.0.0",
* "axios": "^0.19.2",
* "bcrypt": "^4.0.1",
* "bcryptjs": "^2.4.3",
* "body-parser": "^1.19.0",
* "express": "^4.17.1",
* "if-env": "^1.0.4",
* "is-empty": "^1.2.0",
* "jsonwebtoken": "^8.5.1",
* "material-components-web": "^6.0.0",
* "material-ui": "^0.20.2",
* "materialize": "^1.0.0",
* "materialize-css": "^1.0.0-rc.2",
* "mongoose": "^5.9.16",
* "passport": "^0.4.1",
* "passport-jwt": "^4.0.0",
* "react-materialize": "^3.9.2",
* "react-router-dom": "^5.2.0",
* "react-scroll-to-bottom": "^2.0.0",
* "react-tap-event-plugin": "^3.0.3",
* "socket.io": "^2.3.0",
* "validator": "^13.0.0"

#### Dev
* "concurrently": "^4.1.2",
* "nodemon": "^1.18.7"


## Verfification
### Travis CI
Continuous Integration checks using Travis CI

### Protected Master
The master branch is protected, and requires at least one peer review to merge into.


## Tests
Manually tested.  No additinal frameworks used.


## Contributing
Members Contributing on this project:
* [Brian Fairbanks](https://github.com/Brian-Fairbanks)
    * Project Manager
    * Database creation/management
    * API Backends
    * Icons/Images
    * Aditional Styling
    * Account Verification and Login error handling

* [Jonathan Andrews](https://github.com/ionathas78)
    * User Profile page
    * API calls for front end
    * 
* [Sergio Bracamontes](https://github.com/warsurge)
    * Sign up page
    * API calls for front end

* [Jason Strouphauer](https://github.com/jdstroup10)
    * Login page
    * Account Verification and Login error handling
    * API calls for front end
    * Documentation



## Questions
If you have any questions about this application, feel free to reach out to one of our members below:

<img src="https://avatars0.githubusercontent.com/u/59707181?v=4" height="32" width="32"> | brian.k.fairbanks@gmail.com


## Demo
Deployed to Heroku:
* Staging: https://dice-rollerz-stg.herokuapp.com/
* Production: https://dice-rollerz.herokuapp.com/


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Requirements
* Must use ReactJS in some way (even if minimal)
* Must use a Node and Express Web Server
* Must be backed by a MySQL or MongoDB Database with a Sequelize or Mongoose ORM  
* Must have both GET and POST routes for retrieving and adding new data
* Must be deployed using Heroku (with Data)
* Must utilize at least two libraries, packages, or technologies that we haven’t discussed
* Must allow for or involve the authentication of users in some way
* Must have a polished frontend/UI 
* Must have folder structure that meets MVC Paradigm
* Must meet good quality coding standards (indentation, scoping, naming)
* Must not expose sensitive API key information on the server