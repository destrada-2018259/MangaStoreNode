const {request, response} = require('express')
const Publisher = require('../models/publisher')


const getPublishers = async(req = request, res = response) =>{

    const publisherList = await Promise.all([
        Publisher.countDocuments(),
        Publisher.find()
    ])

    res.json({
        msg: 'Publishers Found',
        publisherList
    })
}

const postPublisher = async(req = request, res = response) =>{

    const {publisher, country} = req.body;
    const logoUrl = req.file?.path

    const publisherDB = new Publisher({
        publisher,
        country,
        logoUrl,
    });

    await publisherDB.save();

    res.status(201).json({
        msg: 'Publisher created successfully',
        publisherDB
    })

}

const putPublisher = async(req = request, res = response) =>{

    const {id} = req.params

    const {_id, ...data} = req.body

    if(req.file){data.logoUrl= req.file?.path}


    const PublisherDB = await Publisher.findByIdAndUpdate(id, data)

    res.json({
        msg: 'Publisher updated successfully',
        PublisherDB
    })
}

const deletePublisher = async(req = request, res = response) =>{
    const {id} = req.params
    
    const deletedPublisher = await Publisher.findByIdAndDelete(id)

    res.json({
        msg:'Publisher deleted successfully',
        deletedPublisher
    })
}

module.exports = {
    getPublishers,
    postPublisher,
    putPublisher,
    deletePublisher,
}