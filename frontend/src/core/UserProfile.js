import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import NewsCard from './NewsCard';
import { loadNews } from './helper/newshelper';
import { getFollowingById } from './helper/socialhelper';


const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const prefrences = JSON.parse(localStorage.getItem("prefrences"));
    const [newsAvailable, setNewsAvailable] = useState(false);
    const [news,setNews] =useState([]);
    const [following, setFollowing] = useState([]);

    const userCard = (user,prefrences) => (
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
                                <Link to="/updateprefrences">
                                    Click Here to update location & prefrences
                                </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    )

    const loadSavedNews = () => {
        loadNews(user._id).then(data =>{
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

    return(
        <div>
            <Header/>
            <h2 className='display-2'>User Information</h2>
            {userCard(user,prefrences)}
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
            {!newsAvailable &&(
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

export default UserProfile;