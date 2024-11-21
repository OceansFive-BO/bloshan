# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Getting Started

1. git clone the repo
2.  run `npm i` to install dependencies
3. make a copy of the `example.env` file in the root of your project and rename it `.env`
  - you will need to reach out for the configuration variables
4. `npm run dev` will start the server
  - the default port will be 5173, however if multiple instances of the server are running vite will run the server on a different port
5. navigate to http://localhost:5173 and behold the magnificent application

### Notes

 - the front end application requires the backend application (bloshanAPI) to also be running and that it should be running on port 3000
 - you will also need to seed a local database for your application to show books
   - The bloshanAPI repository has a seed script you just need to make sure you run
