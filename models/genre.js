const {Schema, model} = require('mongoose')


const GenreSchema = Schema({
    genre: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default : true

    }
})

module.exports = model('Genre', GenreSchema)