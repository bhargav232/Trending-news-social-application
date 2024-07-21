import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Loading from "./core/Loading";
import UserProfile from "./core/UserProfile";
import ExploreNews from "./core/ExploreNews";
import UpdatePrefrences from "./user/UpdatePrefrences";
import Social from "./core/Social";
import ViewProfile from "./core/ViewProfile";


const Routes1 = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/loading" exact component={Loading} />
                <Route path="/myprofile" exact component={UserProfile} />
                <Route path="/explore" exact component={ExploreNews} />
                <Route path="/updateprefrences" exact component={UpdatePrefrences} />
                <Route path="/social" exact component={Social} />
                <Route path="/viewprofile" exact component={ViewProfile} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes1;