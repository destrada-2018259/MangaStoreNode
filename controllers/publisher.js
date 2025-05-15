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

    const publisherDB = new Publisher({
        publisher,
        country,
        logo: req.file ? {data: req.file.buffer, contentType: req.file.mimetype} : null 
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

    const updatedPublisher = {data}

    if(req.file){updatedPublisher.logo={data: req.file.buffer, contentType: req.file.mimetype}}

    const PublisherDB = await Publisher.findByIdAndUpdate(id, updatedPublisher)

    res.json({
        msg: 'Publisher updated successfully',
        PublisherDB
    })
}

const deletePublisher = async(req = request, res = response) =>{
    const {id} = req.params
    
    const deletedPublisher = Publisher.findByIdAndDelete(id)

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