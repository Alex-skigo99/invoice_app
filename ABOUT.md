# Node - React Tamplate

## Initial

    npm i
    cd client
    npm i
    ( npm run build )

## Features

- Node.js with:
    1. Typescript
    2. Express
    3. folders structure src (ts) -> build (js)
    4. index.ts - entry point
    5. Hello api - /api/hello

- React (CRA) with:
    1. Typescript
    2. folders structure
    3. utils/http_requests.ts - fetch functions collection
    4. env.development/env.production - for different behavior (PUSH to github!!!)

## Initial commands

    sudo npm init -y
    sudo npm i
    sudo npm i -g typescript
    sudo tsc --init
    sudo npm i express cors dotenv
    sudo npm i --save-dev @types/node @types/express @types/cors
    sudo npx create-react-app client --template typescript

## Run commands

### Run React (CRA) (:3000)

    cd client
    npm start

### Run node (:3001)

    1-st terminal: tsc -w
    2-nd terminal: nodemon build/index.js
    or node build/index.js or npm run start

## Not included commands

### For postgresql

    sudo npm i knex pg

### For mongo.db

    sudo npm i mongodb@6.9

### For Vite

    delete client
    sudo npm create vite@latest client --template react-ts
    cd client
    npm i
    npm run dev

### React-router-dom

    cd client
    npm install react-router-dom @types/react-router-dom

### Permision

    sudo chown -R sasha Dev
