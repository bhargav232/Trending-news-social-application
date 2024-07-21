import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import { getPrefrences, updatePrefrences } from './helper/prefrences';

const UpdatePrefrences = () => {

    const [location, setLocation] = useState("CA");
    const [prefrence1, setPrefrence1] = useState("business");
    const [prefrence2, setPrefrence2] = useState("business");
    const [prefrence3, setPrefrence3] = useState("business");

    let history = useHistory();

    var user = JSON.parse(localStorage.getItem("user"));

    var userId = user._id;

    const handleChange = () => event => {
        setLocation(event.target.value);
    }

    const handlePrefrence1 = () => event => {
        setPrefrence1(event.target.value);
    }

    const handlePrefrence2 = () => event => {
        setPrefrence2(event.target.value);
    }

    const handlePrefrence3 = () => event => {
        setPrefrence3(event.target.value);
    }

    const onSubmit = () => {
        updatePrefrences(userId,location,prefrence1,prefrence2,prefrence3).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else{
                getPrefrences(userId).then(data => {
                    if (data == null) {
                        console.log("error");
                    }
                    else {
                        localStorage.setItem("prefrences", JSON.stringify(data));
                        console.log("success");
                    }
                }
                )
            }
        })
        history.push("/loading");
    }

    const prefrence = ["business","entertainment","general","health","science","sports","technology"];

    return(
        <div>
            <h1 className='text-primary'>Update your prefrences here:</h1>
            <br />
            <label htmlFor="location" className='text-primary'>Select a Location:</label>
            &nbsp;&nbsp;
            <select name="location" id="location" onChange={handleChange()}  >
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
            <br />
            <br />
            <label htmlFor="preference1" className='text-primary'>Select first Prefrence:</label>
            &nbsp;&nbsp;
            <select name="prefrence1" id="prefrence1" onChange={handlePrefrence1()}  >
                {prefrence.map((prf) => {
                    return(
                        <option key={prf} value={prf}>{prf}</option>
                    )
                })}
            </select>
            <br />
            <br />
            <label htmlFor="prefrence2" className='text-primary'>Select second Prefrence:</label>
            &nbsp;&nbsp;
            <select name="prefrence2" id="prefrence2" onChange={handlePrefrence2()}  >
                {
                prefrence.map((prf) => {
                    return (
                        <option key={prf} value={prf}>{prf}</option>
                    )
                })}
            </select>
            <br />
            <br />
            <label htmlFor="prefrence3" className='text-primary'>Select third Prefrence:</label>
            &nbsp;&nbsp;
            <select name="prefrence3" id="prefrence3" onChange={handlePrefrence3()}  >
                {
                    prefrence.map((prf) => {
                        return (
                            <option key={prf} value={prf}>{prf}</option>
                        )
                    })}
            </select>
            <br />
            <br />
            <button onClick={onSubmit} className="btn btn-outline-warning">
            Update</button>
        </div>
    )
}

export default UpdatePrefrences;