const mongoose = require('mongoose')

// Check if password is entered
if (process.argv.length < 3) {
    console.log('Give password as argument!')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://algothen060:${password}@fullstack.i2prgsv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Create schema and model for contacts
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// A name and number is put in after the password, the newly made contact is added to the database
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} (num: ${person.number}) to phonebook`)
        mongoose.connection.close()
    })

// Just the password is put in as a parameter, display all the numbers in the phonebook
} else if (process.argv.length === 3) { 
    Person.find({}).then(result => {
        
        console.log('phonebook: ')

        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

// Any other number of parameters is considered an error
} else {
    console.log('Error: Too many arguments')
    process.exit(1)
}