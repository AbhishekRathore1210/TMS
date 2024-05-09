import App from './app.mjs';
import Routes from './routes/index.mjs'

import connectToMongoDB from "./database/index.mjs";

connectToMongoDB();
  const app = new App([
    new Routes()
  ])

  app.listen()