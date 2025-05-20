const {Router} = require('express')
const {validateJWT} = require('../middlewares/validate-jwt')
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validate-fields')
const upload = require('../middlewares/upload-file')
const { getPublishers, postPublisher, putPublisher, deletePublisher} = require('../controllers/publisher')

const router = Router();

router.get('/get', [
    
], getPublishers)

router.post('/add', [
    validateJWT,
    upload.single('logo'),
    check('publisher', 'publisher is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty(),
    validateFields,
], postPublisher)

router.put('/update/:id', [
    validateJWT,
    upload.single('logo'),
    check('id', 'Id is required').not().isEmpty(),
    check('id','Id must be a valid mongoID').isMongoId(),
    check('publisher', 'publisher is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty(),
    validateFields,
], putPublisher)

router.delete('/delete/:id', [
    validateJWT,
    check('id', 'Id is required').not().isEmpty(),
    check('id','Id must be a valid mongoID').isMongoId(),
], deletePublisher)


module.exports = router