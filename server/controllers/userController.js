const userService = require("../service/userService");

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
    async logout(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
    async activate(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
    async refresh(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
    async test(req, res, next) {
        try {
            res.json(["123", "123"]);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();
