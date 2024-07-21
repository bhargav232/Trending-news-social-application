import React,{useState,useEffect} from 'react';
import "../styles.css";
import NewsCard from "./NewsCard";
import Header from './Header';
import { getNewsByCategory, searchNews, getTrendingNews } from './helper/newshelper';

const ExploreNews = () => {

    const [category, setCategory] = useState("trending");
    const [location, setLocation] = useState("CA");
    const [news, setNews] = useState([]);
    const [keyword, setKeyword] = useState("");

    const handleChange = () => event => {
        const location = event.target.value;
        setLocation(location);
    }

    const handleClick = () => event => {
        const category = event.target.value;
        setCategory(category);
        console.log(category);
    }

    const handleSearch = () => event => {
        setKeyword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loadNewsBySearch();
    }

    const loadAllNewsByCategory = () => {
        if(category == "trending"){
            getTrendingNews(location).then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setNews(data);

                }
            })
        }
        else{
            getNewsByCategory(location, category).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setNews(data);

            }
        })}
    }

    useEffect(() => {
        loadAllNewsByCategory()
    }, [location, category])

    const loadNewsBySearch = () => {
        searchNews(keyword).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setNews(data);

            }
        })
    }

    return (
        <div>
            <Header />
            <div className="container-fluid bg-white text-dark text-center">
                <h1 className='text-primary'>Explore news</h1>
                <br />
                <label htmlFor="location">Select a Location:</label>
                &nbsp;&nbsp;
                <select name="location" id="location" onClick={handleChange()}  >
                    <option value={"CA"} >Select a location</option>
                    <option value={"AR"} >Argentina</option>
                    <option value={"AU"} >Australia
                    </option>
                    <option value={"AT"} >Austria
                    </option>
                    <option value={"BE"} >Belgium
                    </option>
                    <option value={"BR"} >Brazil
                    </option>
                    <option value={"CA"} >Canada
                    </option>
                    <option value={"CO"} >Colombia
                    </option>
                    <option value={"CZ"} >Czechia
                    </option>
                    <option value={"EG"} >Egypt
                    </option>
                    <option value={"FR"} >France
                    </option>
                    <option value={"DE"} >Germany
                    </option>
                    <option value={"GR"} >Greece
                    </option>
                    <option value={"HK"} >Hongkong
                    </option>
                    <option value={"HU"} >Hungary
                    </option>
                    <option value={"IN"} >India
                    </option>
                    <option value={"ID"} >Indonesia
                    </option>
                    <option value={"IE"} >Ireland
                    </option>
                    <option value={"IL"} >Israel
                    </option>
                    <option value={"IT"} >Italy
                    </option>
                    <option value={"JP"} >Japan
                    </option>
                    <option value={"MY"} >Malaysia
                    </option>
                    <option value={"MX"} >Mexico
                    </option>
                    <option value={"NL"} >Netherlands
                    </option>
                    <option value={"NZ"} >New Zealand
                    </option>
                    <option value={"NG"} >Nigeria
                    </option>
                    <option value={"NO"} >Norway
                    </option>
                    <option value={"PH"} >Philippines
                    </option>
                    <option value={"PL"} >Poland
                    </option>
                    <option value={"PT"} >Portugal
                    </option>
                    <option value={"RO"} >Romania
                    </option>
                    <option value={"RU"} >Russia
                    </option>
                    <option value={"SA"} >Saudi Arabia
                    </option>
                    <option value={"SG"} >Singapore
                    </option>
                    <option value={"ZA"} >South Africa
                    </option>
                    <option value={"KR"} >South Korea
                    </option>
                    <option value={"SE"} >Sweden
                    </option>
                    <option value={"CH"} >Switzerland
                    </option>
                    <option value={"TW"} >Taiwan
                    </option>
                    <option value={"TH"} >Thailand
                    </option>
                    <option value={"TR"} >Turkey
                    </option>
                    <option value={"UA"} >Ukraine
                    </option>
                    <option value={"GB"} >United Kingdon
                    </option>
                    <option value={"US"} >United States
                    </option>


                </select>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"trending"} onClick={handleClick()}>Trending</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"business"} onClick={handleClick()}>Business</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"entertainment"} onClick={handleClick()}>Entertainment</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"general"} onClick={handleClick()}>General</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"health"} onClick={handleClick()}>Health</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"science"} onClick={handleClick()}>Science</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"sports"} onClick={handleClick()}>Sports</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-outline-primary" value={"technology"} onClick={handleClick()}>Technology</button>
                &nbsp;&nbsp;
                <div className="input-group m-3">
                    <div className="form-outline">
                        <input type="text" id="form1" className="form-control" value={keyword} onChange={handleSearch()} placeholder='Search News' />
                    </div>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                        Search
                    </button>
                </div>
            </div>


            <br />



            <div className="row">
                {news.map((news, index) => {
                    return (

                        <div key={index} className="col-sm-6">
                            <NewsCard news={news} />
                            <br />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default ExploreNews;