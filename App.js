import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import Dashboard from './components/Dashboard';
import ShopList from './components/ShopList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={LandingPage} />
          <PrivateRoute path="/UpdateProfile" component={UpdateProfile} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/ShopList" component={ShopList} />
          <PrivateRoute path="/Dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
