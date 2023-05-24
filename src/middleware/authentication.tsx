export function authentication(response: any) {
    sessionStorage.setItem("token", JSON.stringify(response.data.token))
    sessionStorage.setItem("username", JSON.stringify(response.data.username))
}
export function getToken() {
    if (sessionStorage.getItem("token")) {
        const token: any = sessionStorage.getItem("token");
        return JSON.parse(token);
    } else {
        return false
    }
}

export function getUsername() {
    if (sessionStorage.getItem("username")) {
        const token: any = sessionStorage.getItem("username");
        return JSON.parse(token);
    } else {
        return false
    }
}

export function logout() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    window.location.replace("/login")
}