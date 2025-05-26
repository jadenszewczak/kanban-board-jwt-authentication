import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem("token", idToken);
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem("token");
    window.location.assign("/login");
  }
}

export default new AuthService();
