import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/login/', {username, password})
    }

    static async registration(data) {
        return $api.post('/register/', data, 
        {
            headers: { 'content-type': 'multipart/form-data' }
        })
    }

    static async getUserActualData() {
        return $api.get('profile')
    }
}