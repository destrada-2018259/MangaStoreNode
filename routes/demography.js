const Router = require('express')
const {check} = require('express-validator')
const {getDemographics, postDemography, putDemography, deleteDemography} = require('../controllers/demography');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/get', [
    validateFields
], getDemographics)

router.post('/add', [
    check('demography', 'Demography is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateFields,
    validateJWT

], postDemography)

router.put('/update/:id',[
    check('id', 'Id ist required').not().isEmpty(),
    check('id', 'Id must be a valid Mongo id').isMongoId(),
    check('demography', 'Demography is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateFields,
    validateJWT
], putDemography)

router.delete('/delete/:id', [
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid mongo Id').isMongoId(),
    validateFields,
    validateJWT
], deleteDemography)

module.exports = router;