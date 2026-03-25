const express = require('express')

const app = express();
app.use(express.json());

app.get("/get-user"
    , (req, res) => {
        res.send("HELLO serverless AWS !!")
    }) 

    app.post("/create-user"
    , (req, res) => {
        res.send("CREATE serverless AWS !!")
    }) 

    app.put("/update-user"
    , (req, res) => {
        res.send("UPDATE serverless AWS !!")
    }) 


const port = process.env.PORT || 8088;
app.listen(port, '0.0.0.0', () => console.log('Listening on', port));
