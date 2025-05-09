const app=require('./App');
const connectDatabase = require('./db/Database');

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

 const cors = require("cors");
  app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend.onrender.com'],
    credentials: true
  }));
  

  // const cors = require("cors");
  // app.use(cors({
  //   origin: ['http://localhost:5173', ''],
  //   credentials: true
  // }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

//connect DB
connectDatabase();


// create server
const server = app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT}`
    );
  });


//from here no need to show students
//unhandled promise rejections

process.on("unhandledRejection", (err)=> {
    console.log(`Shutting down the server for ${err.message}`)
    console.log('shutting down the server for unhandled promises')
    server.close(() => {
        process.exit(1);
        });
})
