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
  const [close, setClose] = useState(false);
  const [showText, setText] = useState(true);

  const header ={
    headers: {
      'Access-Control-Allow-Origin': 'true',
       'Accept': 'application/json',
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
       'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
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
      setClose(true);
      setText(false);

      console.log(users)
  }
  function getWaiting(e){
    e.preventDefault();

    function getWait(){
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/timesheet-approvals/waiting`,
          header)
        .then( function (response)  {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          )
          setResult(response.data.results);
          console.log("result",result);
          
        }).catch(err => console.error(err));
      }
       getWait();
      setShowTable(false);
     
      setShowApproval(false);
      setShowTeams(false);
      setClose(true);
      setText(false);

      console.log(users)
  }
  function getApproval(e){
    e.preventDefault();
    setShowTable(false);

    setShowTeams(false);
    setShowApproval(true);
    setClose(true);
    setText(false);

  }
 function getTimesheet(e){
   e.preventDefault();
   setShowTable(false);
   setShowApproval(false);
   setShowTeams(true);
   setClose(true);
   setText(false);
 }
function closeDiv(e){
e.preventDefault();
setShowTable(false);
   setShowApproval(false);
   setShowTeams(false);
   setClose(false);
   setText(true);


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
          <button id="searchTT" style={{fontSize: "1em"}} onClick={getMember}> <Link to="/team">see timesheet</Link> </button>
          </div>
          <div id="searchGroup">
          <button id="searchTT" style={{fontSize: "1em", color: "white"}} onClick={getTimesheet}> 
          Team Timesheet </button>
          <button id="searchA" style={{fontSize: "1em"}} onClick={getApproval}> Timesheet Approvals </button>
          <button id="searchA" style={{fontSize: "1em"}} onClick={getWaiting}> Timesheet waiting for Approvals </button>

          </div>
          <div id="teamBox">
            {showText?<div>
              <h3>How to use:</h3>
              <p>Select a member from the select field</p>
              <p>Now you can view timesheet by member and team by selecting the given buutton.</p>
               <p>Check the statous of timesheet approvals for this month for this team
              </p>
              <p>optional: see timesheet waiting for your apprroval </p>
            </div>:null}
            
            
       
            {showTable ? 
              
            <MemberTimesheet/> : null}
                   
         
            {showApproval ? <Approved/>:null}
          {showTeams ? <Time/>:null}
        
          </div>
          {close ? <button id="searchTT" style={{fontSize: "1em", color: "white",
          position: "absolute", left: "90%", top: "50%", borderRadius: "33%", backgroundColor: "#ff4c30", cursor:"pointer",
          borderColor:'none'
        }}
          onClick={closeDiv}> x </button>:null}
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
  