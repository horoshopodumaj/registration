import api from "../http";

export default class AuthService {
    static login(email, password) {
        return api.post("api/login", { email, password });
    }
    static registration(email, password) {
        return api.post("api/registration", { email, password });
    }
    static logout() {
        return api.post("api/logout");
    }
}
