import React from 'react';
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import Product from './product/App';
export default () => {
 return (
   <BrowserRouter>
    <Switch>
    <Route exact path='/' component={App}/>
    <Route path='/product' component={Product} />
    </Switch>
   </BrowserRouter>
 )
}