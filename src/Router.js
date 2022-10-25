import React from "react";
import { Switch, Route } from "react-router-dom";
import RouterHandler from './components/RouterHandler';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';

export default () => {
    return(
        <Switch>

            <RouterHandler  exact path="/">
                <Home/>
            </RouterHandler >
            <RouterHandler  exact path="/About">
                <About/>
            </RouterHandler >
            <RouterHandler  exact path="/SignIn">
                <SignIn/>
            </RouterHandler >
            <RouterHandler  exact path="/SignUp">
                <SignUp/>
            </RouterHandler >
            <RouterHandler  exact path="/ad/:id">
                <AdPage/>
            </RouterHandler >
            <RouterHandler  path="*">
                <NotFound/>
            </RouterHandler >
            
        </Switch>
    )
}