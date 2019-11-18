import React from 'react';
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Monitor from './containers/History';
import Product from './product/App';
import Service from './service/App'
import Blog from './blog/App'
import Register from './Register/App'
import Profile from './Profile/App'
import Admin from './admin/App'
import Main from './App';
import ScrollToTop from './ScrollToTop'
export default () => {
 return (
   <BrowserRouter>
    <ScrollToTop>
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path='/monitor' component={Monitor}/>
    <Route path='/product' component={Product} />
    <Route path='/service' component={Service} />
    <Route path='/blog' component={Blog} />
    <Route path='/register' component={Register} />
    <Route path='/profile' component={Profile}/>
    <Route path='/admin' component={Admin}/>
    </Switch>
    </ScrollToTop>
   </BrowserRouter>
 )
}