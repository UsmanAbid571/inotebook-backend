const express = require("express");
const connectToMongo = require("./db");
const app = express();

connectToMongo();
const port = 3000

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`inotebook backend listening on port http://localhost:${port}`)
})