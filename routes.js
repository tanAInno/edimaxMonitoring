import React from 'react';
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Monitor from './containers/App';
import Product from './product/App';
import Service from './service/App'
import Blog from './blog/App'
import Main from './App';
export default () => {
 return (
   <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path='/monitor' component={Monitor}/>
    <Route path='/product' component={Product} />
    <Route path='/service' component={Service} />
    <Route path='/blog' component={Blog} />
    </Switch>
   </BrowserRouter>
 )
}