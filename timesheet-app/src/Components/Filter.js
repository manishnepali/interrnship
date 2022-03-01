import { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import { useTable } from 'react-table';
import Time from './Time';
import Team from "./Team";
import Approved from "./Approved";
import Table from "./Table";
import MemberTimesheet from "./MemberTimesheet";

function Filter() {
  const [users, setUser]= useState([]);
  const [teams, setTeams]= useState([]);
  const [result, setResult]= useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [members, setMembers] = useState([]);
  const header ={
    headers: {
      'Access-Control-Allow-Origin': 'true',
       'Accept': 'application/json',
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
       'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS"
     }
  }
  // https://cors-anywhere.herokuapp.com/


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

  function getMember(e){
    e.preventDefault();
    const select = document.getElementById("acc");
    const accountId = select.options[select.selectedIndex].value
    console.log(accountId);
    localStorage.setItem('accountId', accountId);
   const test =localStorage.getItem('accountId');
    console.log("local", test);
    function getInfo(){
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/user/${accountId}`,
          header)
        .then( function (response)  {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          )
          setMembers(response.data.results);
          console.log("member",members);
          
        }).catch(err => console.error(err));
      }
      // getInfo();
      setShowTable(true);
     
      setShowApproval(false);
      setShowTeams(false);

      console.log(users)
  }
  function getApproval(e){
    e.preventDefault();
    setShowTable(false);

    setShowTeams(false);
    setShowApproval(true);
  }
 function getTimesheet(e){
   e.preventDefault();
   setShowTable(false);
   setShowApproval(false);
   setShowTeams(true);
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
         <div id="teamForm">
            <label>select a worker:</label>
             <select style={{ margin: 15, padding: 10}} id="acc">
        {teams.map((team, index) => {
         return  <option key={index} value={team.member.accountId}>
                                  {team.member.displayName} is a {team.memberships.active.role.name}
        </option>
        })}

          </select> 
          <button id="memSearch" style={{fontSize: "1em"}} onClick={getMember}> <Link to="/team">see timesheet</Link> </button>
          </div>
          <div id="searchGroup">
          <button id="searchTT" style={{fontSize: "1em"}} style={{  color: "white"}} onClick={getTimesheet}> 
          team timesheet </button>
          <button id="searchA" style={{fontSize: "1em"}} onClick={getApproval}> Timesheet Approvals </button>

          </div>
            {showTable ? 
            <div id="teamlistBox">
            <MemberTimesheet/>
                    {/* <ul style={{ margin: 15, padding: 10}}
                     id="teamlist">
                    {members.map((member, index) => {
                    return  <li key={index} value={member.accountId}>
                                            <p>worklogId: {member.jiraWorklogId} </p> 
                                            <p>start date: {member.startDate}</p> 
                                            <p>tempoWorklogId: {member.tempoWorklogId}</p> 
                                            <p>timeSpentSeconds: {member.Time}</p> 
                                            <p>description: {member.description} </p> 
                    </li>
                    })}

          </ul>  */}
            </div> : null}
            {showApproval ? <Approved/>:null}
          {showTeams ? <Time/>:null}
          
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
  