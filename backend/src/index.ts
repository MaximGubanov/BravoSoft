import { PrismaClient } from '@prisma/client'
import express from 'express'


const prisma = new PrismaClient()
const app = express()
const cors = require('cors')

const PORT = 4000

app.use(express.json())
app.use(cors({
    origin: '*'
}));

app.post('/user', async (req, res) => {
    const { firstname, lastname, surname } = req.body
    if (firstname && lastname && surname) {
        const result = await prisma.user.create({
            data: { ...req.body }
        })
        res.json({message: 'Пользователь успешно создан', result: result})
    } else {
        res.json({message: 'Поля не должны быть пустыми'})
    }
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.update({
        where: {id: Number(id)},
        data: {
            is_active: false
        },
        include: {'subscribe_docs': true},
    })

    res.json(user)
})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        where: {is_active: true}
    })
    res.json(users)
})

app.get(`/user/:id`, async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
            created_docs: {
                where: { is_active: true } 
            }, 
            subscribe_docs: {
                select: {doc_id: true}
            }
        }
    })
    res.json(user)
})

app.post('/doc', async (req, res) => {
    const { title, created_by } = req.body
    const result = await prisma.document.create({
        data: {
            "title": title,
            "created_by": Number(created_by)
        }
    })
    res.json({message: 'Документ успешно создан', result: result})
})

app.get('/docs', async (req, res) => {
    const docs = await prisma.document.findMany({
        where: {
            is_active: true
        },
        include: {
            subscribe_workers: true
        },
    })
    
    const key = 'subscribe_workers'
    const sortedDocs = docs.sort((doc1, doc2) => doc1[key].length < doc2[key].length ? 1 : -1)
    
    res.json(sortedDocs)
})

app.get(`/doc/:id`, async (req, res) => {
    const { id } = req.params
    const doc = await prisma.document.findUnique({
        where: { id: Number(id) },
        include: {
            subscribe_workers: {
                select: { user_id: true }
            }
        }
    })
    res.json(doc)
})

// не жёсткое удаление документов, просто деактивируем
app.put(`/doc/:id`, async (req, res) => {
    const { id } = req.params
    const doc = await prisma.document.update({
        where: { id: Number(id) },
        data: { is_active: false }
    })
    res.json(doc)
})

app.post('/request-a-doc', async (req, res) => {
    const { user_id, doc_id } = req.body
    
    try {
        const document = await prisma.document.findFirst({
            where: { id: Number(doc_id) },
            include: {
                subscribe_workers: true
            }
        })
        
        if (document == null) {
            res.json({message: `Такой документ не существует`})
        }

        const subscribers = document?.subscribe_workers
        const subscriber = subscribers?.filter(item => item.user_id == user_id)
        
        if (subscriber?.length) {
            res.json({message: 'Вы уже делали заявку на этот документ'})
        } else {
            const result = await prisma.documentOnUser.create({
                data: {
                    user_id: Number(user_id),
                    doc_id: Number(document?.id)
                }
            })
            res.json({message: 'Заявка успешно создана', result: result})
        }
    } catch(e) {
        res.json({message: 'Непредвиденная ошибка'})
    }
})


app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`),
)