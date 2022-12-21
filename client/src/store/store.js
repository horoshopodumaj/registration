import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { URL } from "../App";
import UserService from "../services/UserService";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    isDisabled = false;
    userMessage = "";

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }
    setDisabled(bool) {
        this.isDisabled = bool;
    }
    setUserMessage(message) {
        this.userMessage = message;
    }

    async registration(email, password) {
        this.setDisabled(true);
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setUserMessage("");
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            this.setUserMessage(error.response.data.message);
        } finally {
            this.setDisabled(false);
        }
    }
    async login(email, password) {
        this.setDisabled(true);
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setUserMessage("");
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            this.setUserMessage(error.response.data.message);
        } finally {
            this.setDisabled(false);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${URL}/api/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async getUsers() {
        try {
            const response = await UserService.test();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
