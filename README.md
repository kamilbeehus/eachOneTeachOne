# Each One Teach One

Each one Teach one is a social web platform that allows users to exchange knowledge based on their skills and interests. Each individual becomes both the teacher and the student.

## Table of Contents

- [Each One Teach One](#each-one-teach-one)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Usage](#usage)
  - [Configuration](#configuration)
    - [Use Prettier ESlint in the client folder](#use-prettier-eslint-in-the-client-folder)
  - [Authors](#authors)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

### Prerequisites

Ensure you have the following installed on your local machine :

- Node.js (version 22.4.1 or above)
- npm (version 10.8.2 or above) 
- MongoDB Atlas Account

### Setup

1. Clone the repository:

   ```sh
   git clone git@github.com:kamilbeehus/eachOneTeachOne.git
   cd eachOneTeachOne
   ```

2. Install dependencies for the backend:

   ```sh
   cd server
   npm install
   ```

3. Install dependencies for the frontend:

   ```sh
   cd ../client
   npm install
   ```

4. Configure environment variables:

- **Backend**: Create a `.env` file in the server directory and add the following credentials :

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_generated_jwt_secret_key
   ```

- Replace your_mongodb_atlas_connection_string with your actual connection string from MongoDB Atlas, formatted like this:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database?retryWrites=true&w=majority
   ```
   
- Generate a secret key for JWT and save it into your `.env` file as `JWT_SECRET`. You can do it from your terminal :

   ```sh
   openssl rand -base64 60  // On Linux
   ```
- Ensure the .env file is included in your .gitignore to prevent it from being committed:

   ```sh
   echo ".env" >> .gitignore
   ```

- Ensure your .env file is located inside of your `server` directory.

5. Start the backend server:

   ```sh
   cd server
   node --watch server.js
   ```

6. Start the frontend development server:
   ```sh
   cd ../client
   npm run dev
   ```

7. Start both backend and frontend using one command in the root directory (beta):
   
   To install the necessary package, first run:

   ```sh
   npm install 
   ```
   Afterward, you can run this one-line command: 

   ```sh
   npm run start 
   ```

## Usage

\*\*For future instructions on how to use the project. This could include how to run tests, any specific commands that need to be executed, or usage examples.

## Configuration

### Use Prettier ESlint in the client folder
1. Open up a terminal 
2. Type in `pwd` (print working directory) to make sure you're in the `eachOneTeachOne` folder
3. Type in `git pull` to make sure you're on the latest commit
3. Type in `cd .vscode`
4. Type in `cp settings.example.json settings.json` this will make a copy of settings.example.json and rename it to settings.json
5. If you don't already have the recommended vscode extensions installed, open the extensions tab in the left panel (1), then type `@recommended` (2) and finally click on the install buttons (3)

![PNG showing how to install the recommended VSCode Extensions](images/installRecommendedExtensions.png "Install instructions for recommended VSCode Extensions")

## Authors
- [Fiorella Mansilla](https://github.com/fiorella-mansilla) - Backend Development
- [Ferdinand Biermann](https://github.com/M0reThanMach1nery) - Frontend Development
- [Kamil Beehuspoteea](https://github.com/kamilbeehus) - Frontend Development

## Contributing

\*\*Guidelines for contributing to the project in case we decide to make it open source in the future.

## License

\*\*We should include a license as soon as we make the repository public.

