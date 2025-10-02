//importação do express e do prisma client
const express = require('express')
const cors = require ('cors')
const { PrismaClient } = require('./generated/prisma')
// instanciação do prisma client,CORS e do express
const prisma = new PrismaClient()
const app = express()
app.use(cors('http://localhost:5173'))
// irá usar express.json para interpretar json
app.use(express.json())

// Array de users
const users = []

// rota post para criação de users
app.post('/users', async (req, res) => {
  // abertura para tratamento de erro
  try {
    // criação de user com prisma
    await prisma.user.create({
      data: { 
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age),
        pedido: req.body.pedido,
        status: req.body.status
      }
    })
    // resposta de sucesso
    res.status(201).json(req.body)
  } catch (err) {
    // tratamento de erro
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// rota get para listagem de users
app.get('/users', async (req, res) => {
  
  try {
    // variavel de users
    let users

    // se existir query name, filtra por name
    if (req.query && req.query.name) {
      users = await prisma.user.findMany({
        where: {
          name: {
            contains: req.query.name,
            mode: 'insensitive'
          }
        }
      })
      // se não, traz todos os users
    } else {
      users = await prisma.user.findMany()
    }
    // retorna os users
    return res.status(200).json(users)
  } catch (err) {
    // tratamento de erro
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

// rota put para atualização de users
app.put('/users/:id', async (req, res) => {
// validação de id, deve ser um ObjectId de 24 caracteres hex
const id = req.params.id
if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ error: 'id inválido. Deve ser um ObjectId de 24 caracteres hex.' })
  }
// abertura para tratamento de erro
  try {
    // atualização de user com prisma
    const update = await prisma.user.update({
      // filtro por id
      where: {
        id: req.params.id
      },
      // dados para atualização
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        pedido: req.body.pedido,
        status: req.body.status
      }
    })
    // resposta de sucesso
    res.status(200).json(req.body)
  } catch (err) {
    // resposta de erro
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
  })

// rota delete para remoção de users
 app.delete('/users/:id', async (req, res) => {
  // validação de id, deve ser um ObjectId de 24 caracteres hex
  const id = req.params.id
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ error: 'id inválido. Deve ser um ObjectId de 24 caracteres hex.' })
  }
  // abertura para tratamento de erro
  try {
    // remoção de user com prisma
    await prisma.user.delete({
      //ira filtrar pelo id tbm
      where: {
        id: req.params.id
      }
    })
    // resposta de sucesso
    res.status(204).json()
  } catch (err) {
    // resposta de erro
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})







app.listen(3000, () => console.log('Server rodando: http://localhost:3000'))
