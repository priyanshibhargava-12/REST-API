 const express = require('express');

 const connectMongoDB = require("./connection");

 const {logReqRes} = require('./middlewares');

 const userRouter = require('./routes/user');
 

 const app = express(); 
 const PORT = 8000;


//connection with db
connectMongoDB();


//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


// Routes
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})