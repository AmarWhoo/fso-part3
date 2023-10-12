const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/persons')

morgan.token('data', (request, response) => {
  const body = JSON.stringify(request.body)
  return body
})

// Error handling

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

let persons = [
]

// Root GET request

app.get('/', (request, response) => {
  response.send('<h1>Welcome Traveler</h1>')
})

// GET Request for all people in the phonebook

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// GET request for general info about the phonebook

app.get('/info', (request, response) => {
  Person.countDocuments().then(result => {
    response.setHeader('Date', new Date().toUTCString());

    response.send(
      `Phonebook has info for ${result} people <br/>
      ${response.getHeader('Date')}`
    )
  })
})

// GET Specific person info

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// DELETE request for a person whos ID is specified

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//   const randomId = Math.floor(Math.random() * 10000)
//     return randomId
// }

// Add a person to the phonebook, POST request

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next)
})

// Update person already in the phonebook, POST request

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})