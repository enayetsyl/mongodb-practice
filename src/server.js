import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";

async function main() {
  try {
    await mongoose.connect(config.database_url)

    app.listen(config.port, () => {
      console.log(`MongoDB practicing app is listening on port ${config.port}`)
    })

  } catch (error) {
    console.log(error)
  }
}

main()