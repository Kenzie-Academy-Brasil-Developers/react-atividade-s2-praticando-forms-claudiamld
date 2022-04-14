import './App.css';
import Form from './components/Form';
import {Route, Switch} from 'react-router-dom'
import UserCard from './components/UserCard';
import { useState } from 'react';

function App() {

  const [users, setUsers] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Form users={users} setUsers={setUsers} /> 
          </Route>
          <Route exact path="/usercard">
            <UserCard users={users} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
