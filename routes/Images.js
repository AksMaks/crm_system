const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const upload = require("../middleware/Upload")
const controller = require("../controllers/Images")

const router = Router()

router.post(
  '/Get',
  [], 
  controller.Get
)

router.post(
  '/Insert',
  [], 
  upload.single('Image'),
  controller.Insert
)

router.post(
  '/Delete',
  [], 
  controller.Delete
)

module.exports = router