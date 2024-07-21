import { API } from "../../backend";


export const followUser = (userId, userIdToFollow) => {
    return fetch(`${API}/followuser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            userIdToFollow: userIdToFollow 
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const getFollowingById = (userId, followingId) => {
    return fetch(`${API}/getfollowing`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            followingId: followingId
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const getSocialbyId = (userId) => {
    return fetch(`${API}/getfollowingbyid`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err))
}


export const getAllUsers = () => {
    return fetch(`${API}/getallusers`,{
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err));
}

export const getUserById = (id) => {
    return fetch(`${API}/getuser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: id
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}
