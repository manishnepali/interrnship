import { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import { useTable } from 'react-table';
import Time from './Time';
function Filter() {
  const [users, setUser]= useState([]);
  const [result, setResult]= useState([]);


  useEffect(() => {
    axios.get('/api')
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
         return  <option key={index} value={user.author.displayName}>{user.author.displayName}</option>
        })}
          </select>
          
    
                
           <button id="search" onClick={getWorker}><Link to="/timesheet"
           style={{color: "white"}}>search</Link></button>
        </form>
        </Route>
          <Route exact path="/timesheet">
          <Time />
          
          </Route>
          </Switch>
        </Router>
        
        
       
      </div>
    );

  }
  
  export default Filter;
  