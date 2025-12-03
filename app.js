import express from "express";
import api from "./routes/api.js";
import database from "./config/database.js";
<<<<<<< Updated upstream
import cors from "cors";
=======
import cors from "cors"

>>>>>>> Stashed changes

const app = express();
app.use(cors())
app.use(express.json());

app.use(cors())

app.get ("/", (req, res) => {
    res.status(200).json({
        message : "OK",
    })
})
app.use("/api", api);

app.listen(3000, () => {
    database();
    console.log(`App berjalan di http://localhost:3000`);
})