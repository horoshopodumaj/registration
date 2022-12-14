class UserController {
    async registration(req, res, next) {
        try {
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
