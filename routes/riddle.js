const express = require('express')

const router = express.Router()
const {
  createRiddle,
  deleteRiddle,
  getAllRiddles,
  updateRiddle,
  getRiddle,
} = require('../controllers/riddle')

router.route('/').post(createRiddle).get(getAllRiddles)

router.route('/:id').get(getRiddle).delete(deleteRiddle).patch(updateRiddle)

module.exports = router
