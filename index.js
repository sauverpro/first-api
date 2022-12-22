const mysql= require("mysql");
const lodash = require("lodash");
const {v4: uuid}= require("uuid");
const express= require("express");
const cors= require("cors");
const emv= require('dotenv').config();
const port= process.env.PORT;
const { result } = require("lodash");
const app= express();
app.use(express.json());
var db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "post"
})
app.post('/save/:value', (req, res) =>{
    let content = req.params.value;
    content = content.replaceAll('-'," ");
    const id= uuid();
    db.connect((err)=>{
        if (err) throw err;
        console.log("connected!! ");
        let sql=`INSERT INTO posts VALUES('','${id}','${content}')`;
        db.query(sql, (erro, result) =>{
            if (erro) throw erro;
            res.json( {
                "commentId": id,
                "message": content,
                "status": "data saved"
            });
        });
    });
    

});
app.get('/view/:id', (req, res)=>{
    let id = req.params.id;
    db.connect((err) =>{
        if (err) console.log(err.name);
        let sql =  `SELECT * FROM posts WHERE comment_id='${id}'`;
        db.query(sql, (error, result)=>{
            if (error) console.log( error.message);
            console.log(result);
            res.json({
                "value id": result[0].id,
                "value id": result[0].comment_id,
                "value": result[0].content
            })
          
        })
    })
})
app.get('/all', (req, res)=>{
    db.connect((error) => {
        if (error) throw error;
        db.query("SELECT * FROM  posts", (er,result)=>{
            if(er) throw er;
            res.send(result);
            
        })
    })
})
app.listen(port, ()=> console.log("server is running....!" + port));