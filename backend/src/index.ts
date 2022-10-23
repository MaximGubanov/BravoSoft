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

// Получает всех активных (не удалёных) пользователей c подписками на активные (не удалёные) документы
app.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany({
        where: {
            is_active: true
        },
        include: {
            subscribe_docs: {
                where: {
                    document: {
                        is_active: true
                    },
                },
                select: {
                    document: true
                },
            },
        },
    })
    res.json(allUsers)
})

// Получает пользователя по его ID
app.get(`/user/:id`, async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: { 
            id: Number(id) 
        },
        include: {
            created_docs: {
                where: { 
                    is_active: true 
                } 
            }, 
            subscribe_docs: {
                select: {
                    doc_id: true
                },
            },
        },
    })
    res.json(user)
})

// Создаёт пользователя
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

// Удаляет пользователя, а так же удаляет заказы (связи в табл. DocumentOnUser) на документы, 
// сделанные этим же поль-ем, пользователь не удаляется из табл. полностью, только меняется поле is_active в false
app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const deletedUser = await prisma.user.update({
        where: {id: Number(id)},
        data: {
            is_active: false
        }
    })

    await prisma.documentOnUser.deleteMany({
        where: {
            user_id: Number(id)
        }
    })

    res.json({message: `Пользователь c ID: ${deletedUser.id} удален`})
})

// Получает все активные (не удалённые) документы с активными подписчиками (пользователями) 
// на этот документ
app.get('/documents', async (req, res) => {
    const allDocument = await prisma.document.findMany({
        where: {
            is_active: true
        },
        include: {
            subscribe_workers: {
                where: {
                    user: {
                        is_active: true
                    }
                },
                select: {
                    user: true
                }
            }
        }
    })

    const key = 'subscribe_workers'
    const sortedDocs = allDocument.sort((doc1, doc2) => doc1[key].length < doc2[key].length ? 1 : -1)

    res.json(sortedDocs)
})

// Получает активный (не удалёный) документ по id с подписчиками (пользователей) на этот документ
app.get('/document/:id', async (req, res) => {
    const {id} = req.params
    const document = await prisma.document.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            subscribe_workers: {
                where: {
                    user: {
                        is_active: true
                    }
                },
                select: {
                    user: true
                }
            }
        },
    })
    
    if (document?.is_active) {
        res.json(document)
    } 

    if (!document?.is_active) {
        res.json({message: "Документ неактвный (удалён) или не существует", result: document})
    }


})

// Создаёт документ
app.post('/document', async (req, res) => {
    const { title, created_by } = req.body
    const result = await prisma.document.create({
        data: {
            "title": title,
            "created_by": Number(created_by)
        },
        include: {
            subscribe_workers: true
        }
    })

    res.json({message: 'Документ успешно создан', result: result})
})

// Удаляет документ. Не удаляет запись из БД, только меняет поле is_active в false,
// а так же удаляет связи из табл. DocumentOnUser (заказы (orders) поль-ей на этот жокумент) 
app.delete('/document/:id', async (req, res) => {
    const { id } = req.params
    const deletedDocument = await prisma.document.update({
        where: { id: Number(id) },
        data: { is_active: false }
    })

    await prisma.documentOnUser.deleteMany({
        where: {
            doc_id: Number(id)
        }
    })

    res.json({message: `Документ с ID: ${id} удалён`, result: deletedDocument})
})

app.post('/order', async (req, res) => {
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

// Удаление заказа (удаляет запись из табл. DocumentOnUser)
app.delete('/order/delete', async (req, res) => {
    const {user_id, doc_id} = req.body

    const rel = await prisma.documentOnUser.findFirst({
        where: {
            user_id: Number(user_id),
            doc_id: Number(doc_id)
        }
    })

    await prisma.documentOnUser.deleteMany({
        where: {id: rel?.id}
    })

    res.json({message: `Запись с ${rel?.id} удална из таблицы`})
})

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`),
)