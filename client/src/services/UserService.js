import api from "../http";

export default class UserService {
    static test() {
        return api.get("/test");
    }
}
