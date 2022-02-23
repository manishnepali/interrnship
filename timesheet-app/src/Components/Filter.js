import { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import { useTable } from 'react-table';
import Time from './Time';
import Team from "./Team";
function Filter() {
  const [users, setUser]= useState([]);
  const [teams, setTeams]= useState([]);
  const [result, setResult]= useState([]);
 
{/* <Link to="/timesheet" style={{color: "white"}}>search</Link> */}


  useEffect(() => {
    axios.get('/team')
  .then( function (response)  {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    setUser(response.data.results);
    setResult(response.data)
 
  }).catch(err => console.error(err));
},[]);
console.log(users);
function getWorker(e){
  e.preventDefault();
  const select = document.getElementById("test");
  const value = select.options[select.selectedIndex].text
  console.log(value);
  const id = select.value;
  console.log(id);
  localStorage.setItem('id', id);
  }


  

    return (
      
      <div className="Filter">
        <Router>
        <Switch>
        <Route exact path="/">
        <form action=""
        className="Form"
        style={{ margin: 15, padding: 10}}>
            <label>select a worker:</label>
            
         <select style={{ margin: 15, padding: 10}} id="test">
        {users.map((user, index) => {
         return  <option key={index} value={user.id}>{user.name}</option>
        })}
          </select>
          
    
                
           <button id="search" onClick={getWorker}> <Link to="/team">search</Link> </button>
        </form>
        <div id="timesheet">

        </div>
        </Route>
          <Route exact path="/timesheet">
          <Time />
          
          </Route>
          <Route exact path="/team">
          <Team />
          
          </Route>
          
          
          </Switch>
        </Router>
        
        
       
      </div>
    );

  }
  
  
  export default Filter;
  