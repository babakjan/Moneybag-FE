<img src="public/moneybag-logo.svg" alt="Moneybag logo" width=64 />

# Moneybag - Frontend

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=white&color=3eb27f)](https://vuejs.org)
[![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=flat&logo=vuetify&logoColor=white&color=1597f6)](https://vuetifyjs.com/en/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/multipage/)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white&color=264bdc)](https://www.w3.org/Style/CSS/Overview.en.html)
[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=flat&logo=figma&logoColor=white&color=5551ff)](https://www.figma.com)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com)

## 📝 Description

Moneybag is a **web application** used to manage **personal finance**. Users can have several accounts. They can create and categorize their records and then analyze their income and expenses.

The application consists of a **separate backend and frontend**, which are connected via a **REST API**. The backend is written in Java using the Spring framework and uses a MySql database for data persistence. The frontend is a **single-page application** written in TypeScript and the Vue.js and Vuetify frameworks.

## 🔗 Links

- [📺 Video example](https://www.youtube.com/watch?v=rzZ-Xvy9iwY)
- [💅 Backend repo](https://github.com/janbabak/Moneybag-BE)
- [📯 API documentation (Post man)](https://documenter.getpostman.com/view/131905572s93CRKWwv#b9ffcedf-337f-4546-8095-5740e9047e96)
- [📄 API documentation (Swagger)](https://janbabak.github.io/Moneybag-BE/)

## ⚽️ Project Goals

There were several reasons why I created this project. First of all, I wanted to try different technologies. Secondly, I wanted to try all stages of a software development cycle. And I also wanted to add some work to my portfolio, which can showcase my development skills.

## 🏗️ Realization

First, I created a list of all the requirements, chose the necessary technologies, and then started developing the backend server.

I developed the front end as a SPA using the Vue.js framework using TypeScript instead of JavaScript for convenience and using the Vuetify component library. I used the Axios library for communication with the API and the Apex charts library for chart rendering. I also set up an automatic on GitHub using GitHub actions.

## 🧑‍🔬 Technologies

- [Vue.js](https://vuejs.org)
- [Vuetify](https://vuetifyjs.com/en/)
- [TypeScript](https://www.typescriptlang.org)
- [Npm](https://www.npmjs.com)
- [Node.js](https://nodejs.org/en)
- [GitHub actions](https://github.com/features/actions)
- [git](https://git-scm.com)

## ✅ Software requirements

- npm
- node

## 🎬 How to run

### Clone repository

```bash
git clone https://github.com/babakjan/Moneybag-FE.git
cd Moneybag-FE/
```

### Start backend

[Backend repository](https://github.com/babakjan/Moneybag-BE)

### Install dependencies

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```
npm run lint
```

## 🎆 Screenshots

<img src="assets/images/desktop/mockups/webp/landing-shadow,rounded.webp" alt="Landing" />
<img src="assets/images/desktop/mockups/webp/dashboard-shadow,rounded.webp" alt="Dashboard" />
<img src="assets/images/desktop/mockups/webp/records-shadow,rounded.webp" alt="Records" />
<img src="assets/images/desktop/mockups/webp/analytic-shadow,rounded.webp" alt="Analytic" />

<p align="center">
    <img src="assets/images/mobile/mockups/webp/landing.webp" alt="Landing mobile" height=320/>
    <img src="assets/images/mobile/mockups/webp/dashboard.webp" alt="Dashboard mobile" height=320/>
    <img src="assets/images/mobile/mockups/webp/edit-account.webp" alt="Edit account mobile" height=320/>
    <img src="assets/images/mobile/mockups/webp/sign-up.webp" alt="Sing up mobile" height=320/>
    <img src="assets/images/mobile/mockups/webp/last-records.webp" alt="Last records mobile" height=320/>
</p>
