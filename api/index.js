const express = require("express");
const connectToMongo = require("../db");
const app = express();
var cors = require('cors')

connectToMongo();
const port = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => res.send("Express on Vercel"));
//Available Routes
app.use('/api/auth',require('../routes/auth'))
app.use('/api/notes',require('../routes/notes'))


app.listen(port, () => {
  console.log(`inotebook backend listening on port http://localhost:${port}`)
})