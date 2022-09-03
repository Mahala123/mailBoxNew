//import logo from './logo.svg';
import './App.css';
import Signup from './compnents/auth/Signup';
import WellcomePage from './compnents/pages/WellcomePage';
import {Switch,Route} from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const isLogin=useSelector(state=>state.auth.idToken)
  return (
    <div className="App">
     
      <Switch>
      {isLogin && <Route path='/welcome'exact>
      <WellcomePage/>
      </Route>}
     {!isLogin && <Route path='/'>
      <Signup/>
      </Route>}
      </Switch>
    </div>
  );
}

export default App;
