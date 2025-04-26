import express from 'express';

const app = express();
app.use(express.json()) // Middleware to parse JSON bodies

const users = []

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {

    users.push(req.body)

    res.status(201).json(req.body);

})