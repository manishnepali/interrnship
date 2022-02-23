import { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";

import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import { useTable } from 'react-table';
import Time from './Time';
function Team() {
  const [users, setUser]= useState([]);
  const [teams, setTeams]= useState([]);
  const [result, setResult]= useState([]);
 
{/* <Link to="/timesheet" style={{color: "white"}}>search</Link> */}

 const id = localStorage.getItem('id');
 console.log("id:", id)
    const header ={
      headers: {
        'Access-Control-Allow-Origin': 'true',
         'Accept': 'application/json',
         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
         'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS"
       }
    }
    useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/teams/${id}`,
        header)
      .then( function (response)  {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        )
        setTeams(response.data);
        console.log("team",teams);
        
      }).catch(err => console.error(err));
    }, []);



  

    return (
      
      <div className="Team">
        
         {/* <ul style={{ margin: 15, padding: 10}} id="test">
        {users.map((user, index) => {
         return  <li key={index}>{user.name}</li>
        })}
          </ul> */}
         
        
       
      </div>
    );

  }
  
  export default Team;
  