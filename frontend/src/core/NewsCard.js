import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../auth/helper";
import { getNewsByName, saveNews } from "./helper/newshelper";

const NewsCard = ({
    news
}) => {
    const cardTitle = news ? news.title : "News Title";
    const cardUrl = news ? news.url : "News URL";
    const cardImage = news ? news.image : "Image not found";
    const cardDescription = news ? news.snippet : "Description";
    const cardSource = news ? news.source : "Source";
    const cardTime = news ? news.lastUpdated : "Time";

    const [isSaved,setIsSaved] = useState(false);

    const checknews = () => {
        if (isLoggedIn()) {
            getNewsByName(isLoggedIn()._id, news).then(data => {
                if(data === null){
                    setIsSaved(false);
                }
                else{
                    setIsSaved(true);
                }
            })
        }
    }

    useEffect(() => {
        checknews();
    },[])

    const onSave = () => {
        if(isLoggedIn()){
            saveNews(isLoggedIn()._id,news).then(data => {
                if(data === null){
                    setIsSaved(false);
                }
                else{
                    setIsSaved(true);
                }
            })
        }
    }

    return(
        <div className="card text-dark bg-light border border-primary">
            <h5 className="card-header">{cardTitle}</h5>
            <div className="card-body">
                <div className="container">
                            <img src={cardImage} className="img border-dark p-2" width={150} height={150} alt="No Image" />
                            <p className="lead text-left bg-light font-weight-normal text-wrap">{cardDescription}</p>
                            <p className="lead text-left bg-light font-weight-light">Source:{cardSource}</p>
                            <p className="lead text-left bg-light font-weight-light">updated:{cardTime}</p>
                            <div className="row">
                                <div className="col-6">
                                    <a
                                        rel="noreferrer"
                                        href={cardUrl}
                                        target="_blank"
                                        className="btn btn-sm btn-dark"
                                    >
                                        Read More
                                    </a>
                                </div>
                                {!isSaved && isLoggedIn() && (<div className="col-6">
                                    <button className="btn btn-sm btn-dark" onClick={onSave}>Save News</button>
                                </div>)}
                            </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;