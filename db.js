const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://muhammadusmanabid571:iamusman123@inotebook.gyztt4y.mongodb.net/";

const connectToMongo = async () => {
   await mongoose.connect(mongoURI);
   console.log("connected to mongo successfully");
       

   }
   connectToMongo().catch(err => console.log(err));
 
module.exports = connectToMongo;

