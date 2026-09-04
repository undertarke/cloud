import express from 'express';

const app = express();
app.use(express.json());


app.get('/get-demo', (req, res) => {
    res.send('hello demo');
});
app.post('/create-demo', (req, res) => {
    res.send('post demo');
});




app.get('/get-user', (req, res) => {
    res.send('HELLO Azure App Service!');
});
app.post('/create-user', (req, res) => {
    res.send('POST HELLO Azure App Service!');
});
app.put('/update-user', (req, res) => {
    res.send('update HELLO Azure App Service!');
});





const port = process.env.PORT || 8088;
app.listen(port, '0.0.0.0', () =>
    console.log('Listening on', port)
);