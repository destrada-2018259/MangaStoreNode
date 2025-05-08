const {Schema, model} = require('mongoose')

const DemographySchema = Schema({
    demography:{
        type: String,
        required: [true, 'demography is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    status:{
        type: Boolean,
        default: true
    }
})

module.exports = model('Demography', DemographySchema)