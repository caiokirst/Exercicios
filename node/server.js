import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json()) // Middleware to parse JSON bodies

const users = []

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/users', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age ? parseInt(req.query.age) : undefined
            }
        })

        res.status(200).json(users)
    }

    else {
        prisma.user.findMany()
        users = await prisma.user.findMany()

        res.status(200).json(users)
    }
})

app.post('/users', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
        .then(user => {
            console.log(user);
            res.status(201).json(user);
        })

    res.status(201).json(req.body);

})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(200).json(req.body);
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(req.body);
})