const axios = require('axios')

module.exports = class JobController{
    static getAllJob(req, res, next) {
        axios({
            url: 'https://jobs.github.com/positions.json',
            method: "get"
        })
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getJobByLocation(req, res, next) {
        const { q } = req.query 
        axios({
            url: 'https://jobs.github.com/positions.json?location='+q,
            method: "get"
        })
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getJobById(req, res, next) {
        const { id } = req.params
        axios({
            url: `https://jobs.github.com/positions/${id}.json`,
            method: "get"
        })
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }
}