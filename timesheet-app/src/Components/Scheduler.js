import React, {useState, useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import axios from 'axios';


export default function Scheduler(){
      
  const [posts, setPost] = useState([])
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const accountId = localStorage.getItem('accountId');  
  
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }

    useEffect(() => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/user/${accountId}`,
      
      header)
    .then( function (response)  {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      )
      setPost(response.data.results);
      setUser(response.data.results[1].jiraWorklogId)
      console.log(posts)
      setLoadingData(false);
    }).catch(err => console.error(err));
  },[]);

 
        return (
            <div>
                   <DayPilotScheduler
                   cellWidth = {50}
                   eventHeight = {50}
                     startDate = {DayPilot.Date.today().firstDayOfMonth()}
                     days = {DayPilot.Date.today().daysInMonth()}
                    scale = {"Day"}
                    timeHeaders = {[
                        { groupBy: "Month"},
                        { groupBy: "Day", format: "d"}
                    ]}
                    resources = {posts.map((p,i)=>{
                        return {name: p.issue.key, id: i}
                    })}
                    events={posts.map((p,i)=>{
                       return {id: p.jiraWorklogId, text: p.descriptions, start: `${p.startDate}T00:00:00`, end: `${p.startDate}T23:00:00`, resource: i }
                    }) }
                
            />
                 
            </div>
           
        );
    
}
