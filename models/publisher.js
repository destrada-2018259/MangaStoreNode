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
    logo:{
        data: Buffer,
        contentType: String
    }
    
})

module.exports = model('Publisher', PublisherSchema)