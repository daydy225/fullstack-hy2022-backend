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

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
