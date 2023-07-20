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

Moneybag is a tool for **managing personal finances** that allows users to create and categorize records, analyze income
and expenses, and manage multiple accounts.

The backend was written in **Java** using the **Spring framework** and uses a MySql database for data persistence. The
frontend is a single-page application connected via REST API and built with TypeScript, **Vue.js**, and Vuetify.

## 🔗 Links

- [🌐 Live](https://aws.dkk8cbmf1rlz.amplifyapp.com/login)
- [📺 Video example](https://www.youtube.com/watch?v=rzZ-Xvy9iwY)
- [💅 Backend repo](https://github.com/janbabak/Moneybag-BE)
- [📯 API documentation (Post man)](https://documenter.getpostman.com/view/13190557/2s93CRKWwv)
- [📄 API documentation (Swagger)](https://janbabak.github.io/Moneybag-BE/)

## ⚽️ Project Goals

I created this project for several reasons. Firstly, I wanted to **experiment with various technologies**. Secondly, I
aimed to experience all stages of the software development cycle. Additionally, I intended to add work to my portfolio
that would demonstrate my development skills.

## 🏗️ Realization

First, I created a list of all the requirements, chose the necessary technologies, and then started developing the
backend server.

I developed the front end as a SPA using the Vue.js framework using TypeScript instead of JavaScript for convenience and
using the Vuetify component library. I used the Axios library for communication with the API and the Apex charts library
for chart rendering. I also set up an automatic on GitHub using GitHub actions.

## 🚀 Features

- Multiple financial accounts
- Add records and categorize them
- Analytic of categories, incomes, expenses, cash flow...
- Charts
- Responsive web interface

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
