const app = require("./src/app");
require("dotenv").config();
const { connectDB } = require("./src/sharedutils/mongoose");

//create server
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port ${process.env.PORT}`);
    connectDB();
})