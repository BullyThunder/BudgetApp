const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); 
app.get('/',(req,res)=>{
    console.log(req.body);
    console.log('hello,express.');
    res.send(`Hello`);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});