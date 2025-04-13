const express = require('express');
const app  = express();
const productsroute = require('./routes/productsRoute') ;


app.use('/api/products',productsroute) ;

app.listen(4000,()=>{
    console.log("Server is running on port 4000") ;
})