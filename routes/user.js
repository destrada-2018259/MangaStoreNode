const {Router} = require('express')

const {getUsers, postUser, putUser, deleteUser, signUp, updateAccount, deleteAccount} = require('../controllers/user')

const router = Router();


router.get('/get', getUsers);
router.post('/add', postUser);
router.put('/update/:id', putUser);
router.delete('/delete/:id', deleteUser);
router.post('/signup', signUp);
router.put('/updateAccount/:id', updateAccount);
router.delete('/deleteAccount/:id', deleteAccount);

module.exports = router;