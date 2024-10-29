<p align="center">
  <img src="https://user-images.githubusercontent.com/6764957/52892445-9045cf80-3136-11e9-9d5e-a1c47e505372.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">fs17-Frontend-project E-Commerce Project</h1>
</p>
<p align="center"> <em>Developed with the software and tools below.</em>
</p>
<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
</p>

## General Description

The application, using React TS and Redux Toolkit, creates a a fully functional e-commerce store.

Deployment link: https://master--thien-e-commerce-store.netlify.app/

Backend: https://github.com/ThienBach13/e-commerce-store-Backend

## Table of content

[API Reference](#api-reference)

[Install](#install)

[Features](#features)

[Package used](#package-used)

## API Reference

In this project, [Platzi API](https://fakeapi.platzi.com/) is used API resource.

## Install

1. Clone the repository:

```sh
git clone https://github.com/ThienBach13/e-commerce-store
```

2. Install all the packages and dependencies:

```sh
npm install
```

3. Start the application:

```sh
npm start
```

## Features

- **Page Development:**

  - Create at least four pages:
    - All Products
    - Product Details
    - Profile (requires user login)
    - Cart (can be a separate page or modal)

- **Redux Store Implementation:**

  - Manage state with Redux, including:
    - Product retrieval
    - Product creation, updating, and deletion (admin-exclusive)

- **Authentication Handling:**

  - Secure routes to private areas:
    - User profile page accessible only upon login

- **Responsive Design:**

  - Ensure responsive layout for diverse device compatibility.

- **Unit Testing:**

  - Conduct unit tests for reducers to ensure reliability.

- **Deployment:**

  - Deploy the application and update README documentation accordingly.

- **Pagination:**
  - Implement pagination for efficient handling of large datasets.

## Package used

<pre>
"@babel/plugin-proposal-private-property-in-object": "^7.21.11",
"@emotion/react": "^11.11.4",
"@emotion/styled": "^11.11.0",
"@mui/icons-material": "^5.15.11",
"@mui/material": "^5.15.12",
"@reduxjs/toolkit": "^2.2.1",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"@types/jest": "^27.5.2",
"@types/node": "^16.18.80",
"@types/react": "^18.2.55",
"@types/react-dom": "^18.2.19",
"axios": "^1.6.7",
"formik": "^2.4.5",
"lodash": "^4.17.21",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.51.0",
"react-redux": "^9.1.0",
"react-router": "^6.22.1",
"react-router-dom": "^6.22.2",
"react-scripts": "^5.0.1",
"react-toastify": "^10.0.4",
"typescript": "^4.9.5",
"web-vitals": "^2.1.4",
"yup": "^1.4.0"
</pre>
