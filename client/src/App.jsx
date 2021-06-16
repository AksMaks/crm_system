import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import ManagerPanel from './components/ManagerPanelPage/ManagerPanel';
import CashboxMenu from './components/CashboxPage/CashboxMenu.jsx';
import Notifications from './components/Notifications/Notifications.jsx';

/*


*/

const App = (props) =>{
  return (
    <div className="App">
      <Notifications/>
      <Route	exact path="/(|Login)" render={ () => <LoginPage/> }/>    
      <Route  path="/ManagerPanel" render={ () => <ManagerPanel/> }/>
      <Route  path="/Cashbox" render={ () => <CashboxMenu/> }/>  
    </div>
  );
}

export default App;

