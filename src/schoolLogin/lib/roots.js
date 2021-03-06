import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

var useRouterHistory = require('react-router/lib/useRouterHistory');
var createHashHistory = require('history/lib/createHashHistory');
import {persistStore, autoRehydrate} from 'redux-persist'


/*Redux library Import*/
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/index.js';
const store = configureStore();
persistStore(store)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(useRouterHistory(createHashHistory)({ queryKey: false }), store);
var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

//Components
import Login from '../login.jsx';
import Admin from '../containers/register/admin.jsx';
import Schoool from '../containers/register/school.jsx';
import SchoolList from '../containers/list/schools.jsx';
import MyProfile from '../containers/edit/myprofile.jsx';


const Home = () => {
    return (
        <div>Home</div>
    )
}

function checkAuth(nextState, replaceState) {
    //   let { loggedIn } = store.getState().authenticate;
    //     if(!loggedIn){
    //         replaceState(null, '/');
    //     }
}

module.exports = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Login} />
            <Route onEnter={checkAuth}>
                <Route path='/home' component={Home} />
                <Route path='/register/admin' component={Admin} />
                <Route path='/register/school' component={Schoool} />
                <Route path='/list/school' component={SchoolList} />
                <Route path='/edit/profile' component={MyProfile} />
            </Route>
        </Router>
    </Provider>
)