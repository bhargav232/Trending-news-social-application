import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../auth/helper';
import { getAllUsers } from './helper/socialhelper';
import Header from "./Header";
import UserCard from './UserCard';


const Social = () => {

    const [users,setUsers] = useState([]);

    const loggedInUser = isLoggedIn();


    const loadUsers = () => {
        getAllUsers().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setUsers(data);
            }
        })
    }

    useEffect(()=>{
        loadUsers()
    })

    return(
        <div>
            <Header />
            <div className="container-fluid bg-white text-dark text-center">
                <h1 className='text-primary'>Social</h1>
                <h5>Welcome,</h5>
                <h6 className='text-primary'>{loggedInUser.name}</h6>
                <div className="row">
                    {users.map((user,index) => {
                        if(user._id !== loggedInUser._id){
                            return(
                                <div key={index} className="col-sm-3">
                                    <UserCard user={user} />
                                    <br />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Social;