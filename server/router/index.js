const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 16 }),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/test", userController.test);

module.exports = router;
