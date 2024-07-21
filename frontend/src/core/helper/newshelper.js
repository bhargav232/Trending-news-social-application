import { API } from "../../backend";


export const getTrendingNews = (location) =>{
    return fetch(`${API}/trending`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type":  "application/json",
        },
        body: JSON.stringify({location : location})
    }).then(response =>{
        return response.json();
    }).catch(err => console.log(err));
};


export const getNewsByCategory = (location,category) => {
    return fetch(`${API}/categorysearch`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: location, category: category })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

export const searchNews = (keyword) => {
    return fetch(`${API}/keywordsearch`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: keyword })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

export const saveNews = (userId,news) => {
    return fetch(`${API}/savenews`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId : userId,
            news: news})
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch(err => console.log(err));
}

export const getNewsByName = (userId, news) => {
    return fetch(`${API}/getnews`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            news: news
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

export const loadNews = (userId) => {
    return fetch(`${API}/loadnews`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId
        })
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch(err => console.log(err));
}