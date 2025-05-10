const {Router} = require('express')
const {validateFields} = require('../middlewares/validate-fields')
const {validateJWT} = require('../middlewares/validate-jwt')
const {check} = require('express-validator')
const {getGenres, postGenre, putGenre, deleteGenre} = require('../controllers/genre')

const router = Router()

router.get('/get', [
    
], getGenres)

router.post('/add' , [
    validateJWT,
    validateFields,
    check('genre', 'Genre is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], postGenre)

router.put('/update/:id', [
    validateJWT,
    validateFields,
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid mongoId').isMongoId(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], putGenre)

router.delete('/delete/:id', [
    validateJWT,
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid mongoId').isMongoId(),
], deleteGenre)

module.exports = router;