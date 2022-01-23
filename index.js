const express = require('express')
const app = express()

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.statusMessage = 'no such id exists'
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
        id: Math.round(Math.random() * 1000)
    }

    data = data.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})