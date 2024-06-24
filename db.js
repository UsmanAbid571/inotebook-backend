const mongoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
   await mongoose.connect(mongoURI);
       

   }
   connectToMongo().catch(err => console.log(err));
 
module.exports = connectToMongo;

