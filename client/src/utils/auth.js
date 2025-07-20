import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
    // Implement your authentication logic here
     const token = localStorage.getItem('token');
     if(!token) return null;
        if(token) {
            try {
                // decode the token in order to get the user's information
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp < currentTime) {
                // Token is expired
                    localStorage.removeItem("token");
                    return null;
                }
                // set the current user
                return decoded;
            } catch (err) {
                // invalid or expire token, remove it from local storage
                localStorage.removeItem('token');
                return null;
            }
        }
    
}

export function setToken(token) {
    // implement your logic to set the token
    localStorage.setItem("token", token);
}

export function logout() {
    // implement your logic to remove the token
    localStorage.removeItem("token");
}