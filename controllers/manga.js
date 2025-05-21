const {request, response} = require('express')
const Manga = require('../models/manga')


const getManga = async(req = request, res = response) =>{

    const mangaList = await Promise.all([
        Manga.CountDocuments(),
        Manga.find()
    ])

    res.json({
        msg: 'Mangas Found',
        mangaList
    })
}

const postManga = async(req = request, res = response) =>{

    const {title, synopsis, price, stock, author, pages, publisher, genre, demography} = req.body;
    const logoUrl = req.file?.path

    const MangaDb = new Manga({title, synopsis, price, stock, author, pages, publisher, genre, demography})

    await MangaDb.save();

    res.status(201).json({
        msg: 'Manga Created Successfully',
        MangaDb
    })
}