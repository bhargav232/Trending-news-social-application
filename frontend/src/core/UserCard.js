import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../auth/helper";
import { followUser, getFollowingById } from "./helper/socialhelper";


const UserCard = ({user}) => {
    const name = user ? user.name : "name";
    const id = user ? user._id : "id";
    const photo = user ? user.photo : "No photo found";
    const email = user ? user.email: "id";

    const loggedInUser = JSON.parse(localStorage.getItem("user"));



    const [isFollowing, setIsFollowing] = useState(false);
    
    const checkfollowing = () => {
        if(isLoggedIn()){
            getFollowingById(loggedInUser._id,id).then(data => {
                if(data === null){
                    setIsFollowing(false);
                }
                else{
                    setIsFollowing(true);
                }
            })
        }
    }

    useMemo(() => {
        checkfollowing();
    }, [])

    const performFollow = () => {
        if(isLoggedIn()){
            followUser(isLoggedIn()._id, id).then(data => {
                if (data === null) {
                    setIsFollowing(false);
                }
                else {
                    setIsFollowing(true);
                }
            })
        }
    }

    const performView = () => {
        localStorage.setItem("view",JSON.stringify(id));
    }


    return (
        <div>
            <div className="card text-dark bg-light border border-info">
                <h5 className="card_header"><br />{name}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <img src={photo} className="img border-dark p-2" width={100} height={100} alt="Not Found" />
                        </div>
                        <div className="col-9">
                            <p className="lead text-left bg-light font-weight-normal">
                                {email}
                            </p>
                            <div className="row">
                                {!isFollowing && (<div className="col-6">
                                    <button className="btn btn-sm btn-dark" onClick={performFollow}>Follow</button>
                                </div>)}
                                {isFollowing && <div className="col-6">
                                    <button className="btn btn-sm btn-dark" onClick={performView}>
                                        <Link to="/viewprofile" className="text-white">View</Link></button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;