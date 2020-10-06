var express = require(`express`)
var router = express.Router()

const db = require('../../db/mongo')

/* GET users listing. */
router.get('/', function (req, res, next) {
    const info = {
        query: {},
        collection: req.app.locals.collectionDictionary
    }
    db.readAll(info)
    .then(entries => {
        res.json(entries)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router
