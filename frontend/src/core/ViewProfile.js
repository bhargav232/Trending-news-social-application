import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import NewsCard from './NewsCard';
import UserCard from './UserCard';
import { loadNews } from './helper/newshelper';
import { getPrefrences } from '../user/helper/prefrences';
import { getSocialbyId, getUserById } from './helper/socialhelper';

const ViewProfile = () => {

    const view = JSON.parse(localStorage.getItem("view"));

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const [profile,setProfile] = useState({});
    const [prefrences, setPrefrences] = useState({});
    const [newsAvailable, setNewsAvailable] = useState(false);
    const [news, setNews] = useState([]);
    const [followingAvailable, setFollowingAvailable] = useState(false)
    const [following, setFollowing] = useState([]);

    const loadUser = () => {
        getUserById(view).then( data => {
            if(data !== null){
                //console.log(data);
                setProfile(data);
            }
        })
    }

    useMemo(() => {
        loadUser()
    },[])

    const loadPrefrences = () => {
        getPrefrences(view).then( data => {
            if(data !== null){
                setPrefrences(data);
            }
        })
    }

    useMemo(() => {
        loadPrefrences()
    }, [])

    const loadSavedNews = () => {
        loadNews(view).then(data => {
            if (data === null) {
                setNewsAvailable(false);
            }
            else {
                setNewsAvailable(true);
                setNews(data.news);
            }
        })
    }

    useEffect(() => {
        loadSavedNews()
    }, [])

    const loadFollowing = () => {
        getSocialbyId(view).then(data => {
            if(data === null){
                setFollowingAvailable(false);
            }
            else{
                setFollowingAvailable(true);
                setFollowing(data.following);
            }
        })
    }

    useMemo(() => {
        loadFollowing()
    },[]);


    const userCard = (user, prefrences) => (
        <div>
            <div className="card text-dark bg-light border border-primary">
                <h5 className="card-header">Name: {user.name}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <img src={user.photo} className="img border-dark p-2" width={300} height={300} alt="No Image" />
                        </div>
                        <div className="col-9">
                            <p className="lead text-left bg-light font-weight-normal text-wrap">Email : {user.email}</p>
                            <p className="lead text-left bg-light font-weight-normal text-wrap">Location : {prefrences.location}</p>
                            <p className="lead text-left bg-light font-weight-light">Prefrence1 : {prefrences.prefrence1}</p>
                            <p className="lead text-left bg-light font-weight-light">Prefrence2 : {prefrences.prefrence2}</p>
                            <p className="lead text-left bg-light font-weight-light">Prefrence3 : {prefrences.prefrence3}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <div>
            <Header />
            <h2 className='display-2'>User Information</h2>
            {userCard(profile, prefrences)}
            <br />
            <h2>Saved News</h2>
            {newsAvailable && (
                <div className="row">
                    {news.map((news, index) => {
                        return (
                            <div key={index} className="col-sm-3">
                                <NewsCard news={news} />
                                <br />
                            </div>

                        )
                    })}
                </div>)}
            {!newsAvailable && (
                <div>
                    <h4>
                        No news Saved Yet.
                    </h4>
                </div>
            )
            }
        </div>
    )
}

export default ViewProfile;