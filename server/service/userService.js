const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const UserDto = require("../dto/userDto");
const mailService = require("./mailService");
const ApiError = require("../exceptions/apiError");

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest("A user with this email already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("The user is not found, please register");
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Invalid password, try again");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async test() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();
