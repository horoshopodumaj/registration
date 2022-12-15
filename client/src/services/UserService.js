import api from "../http";

export default class UserService {
    test() {
        return api.get("/test");
    }
}
