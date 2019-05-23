import React from 'react';
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Monitor from './containers/App';
import Product from './product/App';
import Main from './App';
import ShoppingCart from './product/Shoppingcart';
import Checkout from './product/Checkout';
export default () => {
 return (
   <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path='/monitor' component={Monitor}/>
    <Route path='/product' component={Product} />
    </Switch>
   </BrowserRouter>
 )
}