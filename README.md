<p align="center">ouiVote</p>

<p align="center">
  <a href="https://www.npmjs.com/package/npm/v/8.11.0"><img src="https://img.shields.io/npm/v/vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/node/v/16.15.1"><img src="https://img.shields.io/node/v/v" alt="Version"></a>
  <a href=""><img src="https://camo.githubusercontent.com/8733716e2fd7444a0f383a9e5f43779a016bae35ddde4e1cc32a4f90bd9bb775/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d312e322e332d626c7565
" alt="Version"></a>
</p>

# MasterCamp project ekip

## Introduction
REST API web application

Which allows users to vote online. It's a free application without ads but contains premium paid features. 

You can create private votes, share them and participate in government private and public votes for national elections.

## Development

### Technologies

- MongoDB API
- Vue.js / Vuex
- Node.js
- Express.js

### Initialisation

You must have [node.js](https://webinstall.dev/node), [express.js](https://expressjs.com/en/starter/installing.html), [vue.js](https://vuejs.org/guide/quick-start.html) installed

From the Frontend and Backend direcory do :

---
    `npm install cli`

To install all the libraries you will need

### Run

---
    `npm run start`

To start the front and the back

### Visualization

---
    http://localhost:8081/

Open this to view your frontend app 

### Serveur

---
Backend is running on the 5000 port

⚠️ You will need to disable airdrop if you are on MacOs

## Ecosystem vue

| Project               | Status                                                       | Description                                             |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [vue-router]          | [![vue-router-status]][vue-router-package]                   | Single-page application routing                         |
| [vuex]                | [![vuex-status]][vuex-package]                               | Large-scale state management                            |
| [vue-cli]             | [![vue-cli-status]][vue-cli-package]                         | Project scaffolding                                     |
| [vue-page-transition] | [![vue-page-transition-status]][vue-page-transition-package] | Transition between page                                 |
| [vue-devtools]        | [![vue-devtools-status]][vue-devtools-package]               | Browser DevTools extension                              |

[vue-router]: https://github.com/vuejs/vue-router
[vuex]: https://github.com/vuejs/vuex
[vue-cli]: https://github.com/vuejs/vue-cli
[vue-page-transition]: https://github.com/vuejs/vue-page-transition
[vue-devtools]: https://github.com/vuejs/vue-devtools

[vue-router-status]: https://img.shields.io/npm/v/vue-router.svg
[vuex-status]: https://img.shields.io/npm/v/vuex.svg
[vue-cli-status]: https://img.shields.io/npm/v/@vue/cli.svg
[vue-page-transition-status]: https://img.shields.io/npm/v/vue-page-transition.svg
[vue-devtools-status]: https://img.shields.io/chrome-web-store/v/nhdogjmejiglipccpnnnanhbledajbpd.svg

[vue-router-package]: https://npmjs.com/package/vue-router
[vuex-package]: https://npmjs.com/package/vuex
[vue-cli-package]: https://npmjs.com/package/@vue/cli
[vue-page-transition-package]: https://www.npmjs.com/package/vue-page-transition
[vue-devtools-package]: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

## Security

The question of the security of the data is really important on this project, we find many ways to respond to the client properly :

---
### Robots

🤖 To prevent robots from logging in and creating fake accounts to rig official elections. We used a captcha via the google [recaptcha](https://www.google.com/recaptcha/about/) api

---
### Safe Login and actions

🔑 We wanted to verify the authorization of users to access our website, which is why we use [JWTS](https://jwt.io/introduction) tokens to login and update any information in our database.

🔐 And finally to prevent anyone from identifying themselves with an account that is not theirs, we have hashed user passwords using [bcrypt](https://www.npmjs.com/package/bcrypt) to enhance authentication.

---
### Security of the database

🔒 Even though mongoDB is already very secure, we have obviously encrypted all our data belonging to our users.

🥷 So as not to infringe on privacy and let customers vote anonymously and no one can see each other's votes even if we pass in simple reading our BDD

---
### Check informations

👓 Finally to reassure users our allow them to see, as long as any votes are open, their choice of vote. 

🤓 So if there is any doubt about the integrity of our system, they can verify that their data does not change over time.

## Tools and targets

### Development tools
- [Figma](https://www.figma.com/file/m4iI9m4WpGAMhajSSfLHea/Romain's-team-library?node-id=0%3A1)
- [Looping](https://github.com/GithRomain/MasterCamp/blob/main/Reponse-appel-offre/MCDProjet.loo)
- [Star UML](https://github.com/GithRomain/MasterCamp/blob/main/Reponse-appel-offre/UML_Diagrams.mdj)
- MongoDB
- Github
- Gitlab
- Discord
- [Excel](https://github.com/GithRomain/MasterCamp/blob/main/Reponse-appel-offre/Macro-planning.xlsx)
- [Word](https://github.com/GithRomain/MasterCamp/blob/main/Reponse-appel-offre/Cahier%20de%20charges.docx)

All the development was done on Windows 10 machines, linux machine (Ubuntu) and Mac OS machines.

### Target browsers

The application has been tested on the following browsers :
- Chrome
- Firefox
- Safari

### Deployement

## Contributors

Ekip :

- Romain Pasquier
- Maxime Perrin
- Jeremy Peilleron
