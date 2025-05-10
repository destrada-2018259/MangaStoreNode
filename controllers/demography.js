const {response, request} = require ('express')
const Demography = require('../models/demography')


const getDemographics = async(req = request, res = response) =>{

    const query = {status: true}

    const demographyList = await Promise.all([
        Demography.countDocuments(query),
        Demography.find(query)
    ]);

    res.json({
        msg: 'Demographics found',
        demographyList
    })
}

const postDemography = async(req = request, res = response) => {


    const {demography, description} = req.body;

    const demographyDB = new Demography({demography, description});
    await demographyDB.save();

    res.json.status(201)({
        msg: 'Demography created successfully',
        demographyDB
    })
}

const putDemography = async(req = request, res = response) =>{
    const {id} = req.params;
    const {_id, status, ...data} = req.body

    const updatedDemography = await Demography.findByIdAndUpdate(id, data)

    res.json({
        msg: 'Demography updated successfully',
        updatedDemography
    })
}

const deleteDemography = async(req = request, res = response) =>{
    const {id} = req.params;

    const deletedDemography = await Demography.findByIdAndDelete(id);

    res.json({
        msg: 'Demography deleted successfully',
        deletedDemography
    })
}


module.exports = {
    getDemographics,
    postDemography,
    putDemography,
    deleteDemography
}