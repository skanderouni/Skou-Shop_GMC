import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';

//Screens import
import OrderListScreen from './Pages/OrderListScreen';
import ProfileScreen from './Pages/ProfileScreen';
import OrderScreen from './Pages/OrderScreen';
import ProductListScreen from './Pages/ProdcutListScreen';
import ShippingScreen from './Pages/ShippingScreen';

import SigninScreen from './Pages/SigninScreen';
import RegisterScreen from './Pages/RegisterScreen';
import ProductScreen from './Pages/ProductScreen';
import CartScreen from './Pages/CartScreen';
import HomeScreen from './Pages/HomeScreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/orderList' component={OrderListScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/products' component={ProductListScreen} />
        <Route path='/shipping' component={ShippingScreen} />

        <Route path='/signin' component={SigninScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />

        <Route exact path='/' component={HomeScreen} />
      </Switch>
    </div>
  );
}

export default App;
