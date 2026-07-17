import express from 'express'
import {
  addReport,
  editReport,
  getReport,
  getReports,
  removeReport,
} from '../controllers/reportController.js'



const router = express.Router()

router.get('/', getReports)

router.put('/:id', editReport)

router.get('/:id', getReport)

router.post('/', addReport)

router.delete('/:id', removeReport)

export default router