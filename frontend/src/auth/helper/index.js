import { API } from "../../backend";

export const getUser = () => {
    return fetch(`${API}/me`, { credentials: "include" }, {
        method: "GET",
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch(err => console.log(err));
}

export const setUser = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("user",JSON.stringify(data));
        next();
    }
}

export const isLoggedIn = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"))
    }
    else{
        return false;
    }
}

export const logout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("user");
        localStorage.removeItem("prefrences");
        next();

        return fetch(`${API}/logout`, {credentials: "include"}, {
            method: "GET",
        }).then(response => {
            console.log(response);
            return response.json();
        }).catch(err => console.log(err));
    }
}