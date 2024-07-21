import React, { useState, useEffect, useMemo } from "react";
import { isLoggedIn } from "../auth/helper";
import Header from "./Header";
import { getNewsByCategory, getTrendingNews } from "./helper/newshelper";
import NewsCard from "./NewsCard";
import "../styles.css";


const Home = () => {

    

    const [location,setLocation] = useState("CA");
    const [prefrence1,setPrefrence1] = useState("business");
    const [prefrence2,setPrefrence2] = useState("technology");
    const [prefrence3,setPrefrence3] = useState("entertainment");


    const user = JSON.parse(localStorage.getItem("user"));
    const prefrences = JSON.parse(localStorage.getItem("prefrences"));
    
    const loadLocation = () => {
        if (isLoggedIn() !== false){
            setLocation(prefrences.location);
        }
    }

    useMemo(() => {
        loadLocation();
    },[])

    const loadprefrence1 = () => {
        if (isLoggedIn() !== false) {
            setPrefrence1(prefrences.prefrence1);
        }
    }

    useMemo(() => {
        loadprefrence1();
    },[])

    const loadprefrence2 = () => {
        if (isLoggedIn() !== false) {
            setPrefrence2(prefrences.prefrence2);
        }
    }

    useMemo(() => {
        loadprefrence2();
    }, [])
    
    const loadprefrence3 = () => {
        if (isLoggedIn() !== false) {
            setPrefrence3(prefrences.prefrence3);
        }
    }

    useMemo(() => {
        loadprefrence3();
    }, [])

    const [trends, setTrends] = useState([]);
    const [prefrence1News, setPrefrence1News] = useState([]);
    const [prefrence2News, setPrefrence2News] = useState([]);
    const [prefrence3News, setPrefrence3News] = useState([]);

    const loadAllTrends = () => {
        getTrendingNews(location).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setTrends(data);
            }
        })
    }

    useEffect(() => {
        loadAllTrends()
    }, [location]);

    const loadNewsbyPrefrence1 = () => {
        getNewsByCategory(location,prefrence1).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setPrefrence1News(data);
            }
        })
    }
    useEffect(() => {
        loadNewsbyPrefrence1()
    }, [location,prefrence1]);

    const loadNewsbyPrefrence2 = () => {
        getNewsByCategory(location, prefrence2).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPrefrence2News(data);
            }
        })
    }
    useEffect(() => {
        loadNewsbyPrefrence2()
    }, [location, prefrence2]);

    const loadNewsbyPrefrence3 = () => {
        getNewsByCategory(location, prefrence3).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPrefrence3News(data);
            }
        })
    }
    useEffect(() => {
        loadNewsbyPrefrence3()
    }, [location, prefrence3]);

    return(
        <div>
            <Header />
            <div className="container-fluid bg-white text-dark text-center">
                <h1 className='text-primary'>Trending news</h1>
                <h5>By Google-Trends</h5>
                <h6>Location : {location}</h6>
                <div className="row">
                    {trends.map((news, index) => {
                        return (
                            <div key={index} className="col-sm-3">
                                <NewsCard news={news} />
                                <br />
                            </div>

                        )
                    })}
                </div>
                <h2 className="text-white bg-secondary">{prefrence1}</h2>
                <h5>By NewsApi</h5>
                <div className="row">
                    {prefrence1News.map((news, index) => {
                        return (

                            <div key={index} className="col-sm-3">
                                <NewsCard news={news} />
                                <br />
                            </div>

                        )
                    })}
                </div>
                <h2 className="text-white bg-secondary">{prefrence2}</h2>
                <h5>By NewsApi</h5>
                <div className="row">
                    {prefrence2News.map((news, index) => {
                        return (

                            <div key={index} className="col-sm-3">
                                <NewsCard news={news} />
                                <br />
                            </div>

                        )
                    })}
                </div>
                <h2 className="text-white bg-secondary">{prefrence3}</h2>
                <h5>By NewsApi</h5>
                <div className="row">
                    {prefrence3News.map((news, index) => {
                        return (

                            <div key={index} className="col-sm-3">
                                <NewsCard news={news} />
                                <br />
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;