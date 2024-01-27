const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const handleError = require("./helpers/handleError")

const contactsRouter = require("./routes/contactsRouter")


const app = express();

const PORT = 3000

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(handleError);

app.listen(3000, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
