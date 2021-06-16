const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const controller = require("../controllers/Branches")

const router = Router()

router.post(
  '/Get',
  [], 
  controller.Get
)

router.post(
  '/Insert',
  [check('Name', "Короткое название").isLength({ min: 5 })], 
  controller.Insert
)

router.post(
  '/Update',
  [], 
  controller.Update
)

router.post(
  '/Delete',
  [], 
  controller.Delete
)

module.exports = router