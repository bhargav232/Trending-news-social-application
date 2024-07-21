import { API } from "../../backend";


export const getPrefrences = (userid) => {
    return fetch(`${API}/getprefrences`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: userid})
    }).then(response =>{
        console.log(response);
        return response.json();
    }).catch(err => console.log(err));
};

export const updatePrefrences = (userid,location,prefrence1,prefrence2,prefrence3) => {
    return fetch(`${API}/updateprefrences`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            userId: userid,
            location: location,
            prefrence1: prefrence1,
            prefrence2: prefrence2,
            prefrence3: prefrence3,
        })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};