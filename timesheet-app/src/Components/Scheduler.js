import React, {useState, useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import axios from 'axios';
import { Buffer } from 'buffer';
import tf from 'hh-mm-ss';
import mathSum from 'math-sum';

export default function Scheduler(){
  const [posts, setPost] = useState([])
  const [tests, setTest] = useState([])
  const [showJira, setShowJira] = useState(false);
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const accountId = localStorage.getItem('accountId'); 
  const teamName = localStorage.getItem('team');
  console.log(teamName);
  const initialValue = 0;
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }
    const header1 ={ 
      headers: {
       'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Authorization': "Basic manish.nepali@abano.be:ipg6cqECKxuN31e8MLl8F131"
      }
      }

      useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/`,
        
        header)
      .then( function (response)  {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        )
        setPost(response.data.results);
       
        console.log(posts)
        setLoadingData(false);
      }).catch(err => console.error(err));

      axios.get(`https://cors-anywhere.herokuapp.com/https://abano-playground.atlassian.net/rest/api/3/search?jql=assignee=${accountId}||reporter=${accountId}`,
   {
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'manish.nepali@abano.be:ipg6cqECKxuN31e8MLl8F131'
      ).toString('base64')}`
    },
    'Accept': 'application/json',
    },
    
  )
  .then( function (response)  {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    setTest(response.data.issues);
    console.log("tests:",tests.data.issues)
    setLoadingData(false);
  }).catch(err => console.error(err));
    },[]);
  //   useEffect(() => {
  //     axios.get(`/api`,
      
  //     header)
  //   .then( function (response)  {
  //     console.log(
  //       `Response: ${response.status} ${response.statusText}`
  //     )
  //     setPost(response.data.results);
     
  //     console.log(posts)
  //     setLoadingData(false);
  //   }).catch(err => console.error(err));
  // },[]);
async function getWorklogs(){
  const total = document.getElementsByClassName("scheduler_default_event_inner")[0].textContent;
  console.log("t:", ...total)
  for (var i = 0; i < total.length; i++) {
    var hours = total[i].textContent;
    console.log("total: " + hours);
  }
  
}



const [start, setStart] = useState(DayPilot.Date.today().firstDayOfMonth());
 function datePick(){
    return setStart(DayPilot.Date.today().addDays(-30).firstDayOfMonth());
 }
 function datePick1(){
    return setStart(DayPilot.Date.today().addDays(30).firstDayOfMonth());
 }
 function datePick2(){
    return setStart(DayPilot.Date.today().firstDayOfMonth());
 }


        return (
            <div style={{width: "70%",  marginLeft: "15%", marginBottom: "2%"}}>
              <button onClick={getWorklogs}>test</button>
                       <DayPilotScheduler
                   cellWidth = {75}
                   eventHeight = {50}
                     startDate = {start}
                     days = {DayPilot.Date.today().daysInMonth()}
                    scale = {"Day"}
                    timeHeaders = {[
                        {groupBy: "Month"},
                        {groupBy: "Day", format: "d"}
                    ]}
                    
                    cellGroupBy
                    treeEnabled={true} 
                    autoScroll ={"Always"} 
                    rowHeaderColumnsMode={"Tabular"}     
                    eventHoverHandling ={"Bubble"}              

                    resources = { 
                      tests.map((p,i)=>{
                        
                        return{ name: p.key , id: p.id}
                          
            })}
                    events={posts.map((p,i)=>{
                       return {id: p.jiraWorklogId, text: `${tf.fromS(p.timeSpentSeconds)} hour `, start: `${p.startDate}T00:00:00`, end: `${p.startDate}T23:00:00`, resource: `${p.issue.id}`,  backColor: "#ffffff" , bubbleHtml: `${p.description} `}
                    }) }
               
            /> 
                
                   
                
       
            {/* <table>
               <th >
                    {posts.map((p,i)=>{
                      
                      const tijd =[ tf.fromS(p.timeSpentSeconds)];
                      return mathSum(tijd)})}
                    </th> 
                    
                    </table>    */}
           
            <button onClick={datePick}>last month</button> <button onClick={datePick2}>This month</button>  <button onClick={datePick1}>next month</button>
                {/* <DayPilotScheduler
                   cellWidth = {75}
                   eventHeight = {50}
                     startDate = {start}
                     days = {DayPilot.Date.today().daysInMonth()}
                    scale = {"Day"}
                    timeHeaders = {[
                        {groupBy: "Month"},
                        {groupBy: "Day", format: "d"}
                    ]}
                    treeEnabled={true} 
                    groupConcurrentEvents={true}
                    rowHeaderColumnsMode={"Tabular"}
                    autoScroll ={"Always"} 
                    eventClickHandling={false}
                    rowHeaderColumns ={[{ text: 'Name', display: "name", sort: "name" },
                    { text: 'description', display: "description", sort: "description" }]}
            resources={ [
                {name: "Group A", id: "A", expanded: true, children: [
                { name: "Resource A",description:"test", id: "A"},
                {name: "Resource B", id: "B"},
                {name: "Resource C", id: "C"},
                {name: "Resource D", id: "D"},
                {name: "Resource E", id: "E"},
                {name: "Resource F", id: "F"},
                {name: "Resource G", id: "G"}
              ]
            },
            {name: "Group B", id: "B", expanded: true, children: [
                {  text: "Group B", name: "Resource A", id: "A"},
                {name: "Resource B", id: "B"},
                {name: "Resource C", id: "C"},
                {name: "Resource D", id: "D"},
                {name: "Resource E", id: "E"},
                {name: "Resource F", id: "F"},
                {name: "Resource G", id: "G"}
              ]
            }
        
            ]}
            events={[
                {id: 1, text: "Event 1", start: "2022-03-02T00:00:00", end: "2022-03-05T00:00:00", resource: "A" },
                {id: 2, text: "Event 2", start: "2022-03-03T00:00:00", end: "2022-03-10T00:00:00", resource: "A", barColor: "#38761d", barBackColor: "#93c47d" },
                {id: 3, text: "Event 3", start: "2022-03-02T00:00:00", end: "2022-03-08T00:00:00", resource: "A", barColor: "#f1c232", barBackColor: "#f1c232" },
                {id: 4, text: "Event 3", start: "2022-03-02T00:00:00", end: "2022-03-08T00:00:00", resource: "A", barColor: "#cc0000", barBackColor: "#ea9999" }
            ]} 
            
                
            />   */}
              
            </div>
           
        );
    
}
