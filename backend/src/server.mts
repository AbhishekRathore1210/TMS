import App from './app.mjs';
import Routes from './routes/index.mjs'

import connectToMongoDB from "./database/index.mjs";

const MongoDB_Connection_String = 'mongodb://localhost:27017/project';
try {
    await connectToMongoDB(MongoDB_Connection_String);
  } catch (e) {
    console.log("Error connecting to MongoDB: ", e);
  }


  const app = new App([
    new Routes()
  ])

  app.listen()