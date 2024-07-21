import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUser, isLoggedIn, setUser } from '../auth/helper';
import { getPrefrences } from '../user/helper/prefrences';

const Loading = () => {


    const [name,setName] = useState("");
    const [newUser, setNewUser] = useState(false);

    //TODO: Prefrence Thing

    getUser().then(
        data => {
            setUser(data, () =>{
                const user = isLoggedIn();
                setName(user.name);
                getPrefrences(user._id).then(data => {
                    if (data == null) {
                        setNewUser(true);
                        console.log(newUser);
                    }
                    else {
                        localStorage.setItem("prefrences",JSON.stringify(data));
                        setNewUser(false);
                        console.log(newUser);
                    }
                }
                )
            })
        }
    )

    const user = isLoggedIn();

    const body = () => {
        if(newUser === true){
            return(
            <div>
                    <h5>Hello,{name} please Update your Prefrences</h5>
                    <br />
                    <Link to="/updateprefrences">
                        Click Here to update location & prefrences
                    </Link>
            </div>
            )
        }
        else{
            return(
            <div>
                <h3>Hello,{name}</h3>
                <h4>Welcome back</h4>
                <h5>Please Click below to go home</h5>
                <Link to="/">Home</Link>
            </div>
            )
        }
    }

    return(
        <div>
            {body()}
        </div>
    )
}

export default withRouter(Loading);