import React from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Registration from './Components/UserRegistration';
import UserSignin from './Components/UserSignin';
import UserDashboard from './Components/UserDashboard';
import AddFeedback from './Components/AddFeedback';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/register" component={Registration}/>
          <Route exact path="/signin" component={UserSignin}/>
          <Route exact path="/dashboard" component={UserDashboard}/>
          <Route exact path="/feedback" component={AddFeedback}/>
        </Switch>
       
      </Router>
    </div>
  );
}

export default App;
