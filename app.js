const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const handleError = require("./helpers/handleError")
const contactsRouter = require("./routes/contactsRouter")
const usersRouter = require('./routes/usersRouter')
const path = require("path")



dotenv.config()
const {MONGO_DB_HOST, PORT} = process.env


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


const startServer = async () => {
    try {
      await mongoose.connect(MONGO_DB_HOST)
      console.log("Database connection successful")

      app.use("/users", usersRouter)
      app.use("/api/contacts", contactsRouter)

      app.use((_, res) => {
        res.status(404).json({ message: "Route not found" });
      })

      app.use((err, req, res, next) => {
        handleError(err, req, res, next)
      })

      app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));

      app.listen(PORT, () => {
        console.log(`Server runing on ${PORT}`);
      })
    } catch (error) {
      console.error("Connection error", error)

      process.exit(1)
    }
}
startServer()