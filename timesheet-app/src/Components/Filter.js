import { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import { useTable } from 'react-table';
import Time from './Time';
import Team from "./Team";
import Approved from "./Approved";
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
  const header ={
    headers: {
      'Access-Control-Allow-Origin': 'true',
       'Accept': 'application/json',
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
       'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS"
     }
  }
  function getTeams(){
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/teams/${id}/members`,
        header)
      .then( function (response)  {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        )
        setTeams(response.data.results);
        console.log("team",teams);
        
      }).catch(err => console.error(err));
    }
    getTeams();
    console.log(teams)
  }


  

    return (
      
      <div className="Filter">
        <Router>
        <Switch>
        <Route exact path="/">
        <form action=""
        className="Form"
        style={{ margin: 15, padding: 10}}>
            <label>select a team:</label>
            
         <select style={{ margin: 15, padding: 10}} id="test">
        {users.map((user, index) => {
         return  <option key={index} value={user.id}>{user.name}</option>
        })}
          </select>
          
    
                
           <button id="search" onClick={getWorker}> <Link to="/team">zoek</Link> </button>
        </form>
        <div id="timesheet">

        </div>
        </Route>
          <Route exact path="/timesheet">
          <Time />
          
          </Route>
          <Route exact path="/team">
         
            {/* {teams.name} <br/>
            <p>team lead: </p>
            {teams.lead.displayName} <br/>
            <p>summary: </p>
            {teams.summary} */}
             <form action=""
        className="Form"
        style={{ margin: 15, padding: 10}}>
            <label>select a worker:</label>
             <select style={{ margin: 15, padding: 10}} id="test">
        {teams.map((team, index) => {
         return  <option key={index}>{team.member.displayName} is a {team.memberships.active.role.name}</option>
        })}
          </select> 
          <button id="search" style={{fontSize: "1em"}}> <Link to="/team">member timesheet</Link> </button>
          <button id="search" style={{fontSize: "1em"}}> <Link to="/timesheet">team timesheet</Link> </button>

          </form>

          
          </Route>
          <Route exact path="/approved">

            <Approved/>
          </Route>
          
          
          
          </Switch>
        </Router>
        
        
       
      </div>
    );

  }
  
  
  export default Filter;
  