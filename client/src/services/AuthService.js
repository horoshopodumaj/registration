import api from "../http";

export default class AuthService {
    async login(email, password) {
        return api.post("/login", { email, password });
    }
    async registration(email, password) {
        return api.post("/registration", { email, password });
    }
    async logout() {
        return api.post("/logout");
    }
}
