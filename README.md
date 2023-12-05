<p align="center">
  <a href="#key-features">Set up</a> •
  <a href="#key-features">Tech stack</a> •
  <a href="#how-to-use">Features</a> •
  <a href="#how-to-use">PREVIEW</a> •
  <a href="#how-to-use">Unit Testing</a> •
</p>

## Set up

* If you want to test a demo with Netlify: 

1. Download or clone this project in VSC
2. Open your terminal 
3. Go to /users-server folder
4. Write command npm i and npm run start
5. Now open this link: https://65695205b6210d48bba65365--illustrious-sherbet-d86eb7.netlify.app/

* If you want to run this project locally then repeat the previous 1 and 2 mentioned steps and then:

  * FE (at '/users-client')
    - npm i
    - npm run dev
  * BE (at '/users-server')
    - npm i
    - npm run start

## Tech Stack

* React js + vite
* Typescript
* Nest js
* MongoDB

PLUS:

- JEST + React Testing Library
- Simple Docker image with project config
- useFormik hook
- Axios

## Features

* Select a role profile
  - Teacher:
    - Get a list of users
    - Create users (by changing role type)
    - Update users
    - Delete users
  - Student:
    - Pay course with MercadoPago integration: CheckoutPRO API


## PREVIEW

card payment preview
https://github.com/Agosdev/UsersApp/assets/67771188/5c30a92e-3b4f-4ead-9d51-e7f0a777b12f


preview app
https://github.com/Agosdev/UsersApp/assets/67771188/45c2c205-23b3-417c-a625-41b41d6babd0


## Unit Testing:  JEST + React Testing Library

Fail example
<img width="1270" alt="Screen Shot 2023-12-04 at 13 41 15" src="https://github.com/Agosdev/UsersApp/assets/67771188/9b8e2f5e-eadd-4b3f-b3e7-e985d86a0746">
Passed test example
<img width="1252" alt="Screen Shot 2023-12-04 at 13 40 32" src="https://github.com/Agosdev/UsersApp/assets/67771188/f732a033-a5cd-4985-951a-e087c62bd44f">


  
