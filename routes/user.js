const {Router} = require('express')

const {getUsers, postUser, putUser, deleteUser, signUp, updateAccount, deleteAccount} = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const { userExists } = require('../helpers/db-validators');

const router = Router();


router.get('/get',[

    validateFields
], getUsers);

router.post('/add', [
    
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    validateFields
], postUser);

router.put('/update/:id',[
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid Mongo id').isMongoId(),
    check('id').custom(userExists),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], putUser);

router.delete('/delete/:id',[
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid Mongo id').isMongoId(),
    validateFields
], deleteUser);

router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    validateFields
], signUp);

router.put('/updateAccount/:id',[
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid Mongo id').isMongoId(),
    check('id').custom(userExists),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], updateAccount);

router.delete('/deleteAccount/:id',[
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Id must be a valid Mongo id').isMongoId(),
    validateFields
], deleteAccount);

module.exports = router;