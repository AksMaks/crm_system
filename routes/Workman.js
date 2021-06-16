const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const controller = require("../controllers/Workman")

const router = Router()

router.post(
  '/Login',
  [], 
  controller.Login
)

router.post(
  '/Get',
  [], 
  controller.Get
)

router.post(
  '/Insert',
  [], 
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