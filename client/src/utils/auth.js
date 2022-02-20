import decode from "jwt-decode";

class AuthService {
  // set token to localStorage and reload to homepage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // clear token from localStorage and reload homepage
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  // retrieve token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if token has exipired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  // check if user is logged in
  loggedIn() {
    // check if there is a saved token
    const token = this.getToken();
    // return boolean result: check if token is NOT undefined and NOT expired
    return !!token && !this.isTokenExpired(token);
  }
}

export default new AuthService();
