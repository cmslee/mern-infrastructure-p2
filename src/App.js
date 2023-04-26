import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';

import { getUser } from './utilities/users-service';

import './App.css';

function App() {
  //set the user state that will be used to set up routing (whether to go to Auth or Order)
  //?step 7. code
  // const [user, setUser] = useState(null);
  //?we can set useState to getUser payload now that functions to get that data have been written (step 'update the state')
  const [user, setUser] = useState(getUser());
  //?test to see if user data is being received
  //console.log(getUser());

  return (
    <main className="App">
     { user ? 
      //routes tag goes here because we are doing routing for client-side under condition that user is signed in
      <>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        {/**legacy note: used to use component property, which doesn't call the component, but references it (i.e. component={NewOrderPage}). It was harder to pass props*/}
        <Route path='/orders/new' element={ <NewOrderPage /> }/>
        <Route path='/orders' element={ <OrderHistoryPage /> }/>
      </Routes>
      </>
     : 
      <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;