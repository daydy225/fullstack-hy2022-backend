const { response } = require('express')
const express = require('express')

const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const info = {
    entries: persons.length,
    date: new Date(),
  }
  res.send(`
  <div>
  <p>Phonebook has info for ${info.entries} people</p>
  <p>${info.date.toGMTString()}</p>
  </div>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(400).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons.filter(person => person.id !== id)
  res.status(204).end()
})

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

const generateId = () => {
  return getRandomNumber(1, 100000000)
}

console.log(generateId())

app.post('/api/persons/', (req, res) => {
  const body = req.body
  console.log(body.name, body.number)

  // if (!body.name || !body.number) {
  //   return res.status(400).json({
  //     error: 'content missing',
  //   })
  // }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
