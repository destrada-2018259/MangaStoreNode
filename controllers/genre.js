const{request, response} = require('express')
const Genre = require ('../models/genre')


const getGenres = async(req = request, res = response) =>{
    const query = {status: true}

    const genresList = await Promise.all([
        Genre.countDocuments(query),
        Genre.find(query)
    ])
    
    res.json({
        msg: 'Genres found',
        genresList
    })
}


const postGenre = async(req = request, res = response) =>{

    const {genre, description} = req.body

    const genreDB = new Genre({genre, description})
    await genreDB.save()

    res.status(201).json({
        msg: 'Genre created seccesfully',
        genreDB
    })
}

const putGenre = async(req = request, res = response) =>{

    const {id} = req.params

    const {_id, status,... data} = req.body

    const updatedGenre = await Genre.findByIdAndUpdate(id, data)

    res.json({
        msg: 'Genre updated succesfully',
        updatedGenre
    })
}

const deleteGenre = async (req = request, res = response) =>{
    const {id} = req.params

    const deletedGenre = await Genre.findByIdAndDelete(id)

    res.json({
        msg: 'Genre deleted succesfully',
        deletedGenre
    })
}

module.exports = {
    getGenres,
    postGenre,
    putGenre,
    deleteGenre
}