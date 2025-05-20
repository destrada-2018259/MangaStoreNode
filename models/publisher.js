const {Schema, model} = require ('mongoose')


const PublisherSchema = Schema({
    
    publisher: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    logoUrl:{
        type: String
    }
    
})

module.exports = model('Publisher', PublisherSchema)