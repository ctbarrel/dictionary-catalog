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

router.post('/', function (req, res, next) {
    const info = {
        doc: req.body,
        collection: req.app.locals.collectionDictionary
    }
    db.createOne(info)
    .then(data => {
        res.json(data.ops[0])
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router
