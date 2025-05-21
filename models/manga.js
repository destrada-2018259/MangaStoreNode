const {model, Schema} = require('mongoose')

const MangaSchema = Schema({

    title:{
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    author:{
        type: String,
        required: true
    },
    pages:{
        type: Number,
        required: true
    },
    coverUrl:{
        type: String,
        required: true
    },
    publisher:{
        type: Schema.ObjectId,
        ref: 'Publisher',
        required: true,
    },
    genre:{
        type: Schema.ObjectId,
        ref: 'Genre',
        required: true,
    },
    demography:{
        type: Schema.ObjectId,
        ref: 'Demography',
        required: true,

    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Manga', MangaSchema)