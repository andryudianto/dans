const router = require('express').Router()
const UserController = require('../controllers/UserController')
const JobController = require('../controllers/JobController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/jobs', JobController.getAllJob)
router.get('/jobs/location?', JobController.getJobByLocation)
router.get('/jobs/:id', JobController.getJobById)

module.exports = router