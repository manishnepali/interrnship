import React, {useState, useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import axios from 'axios';
import { Buffer } from 'buffer';
import tf from 'hh-mm-ss';
import mathSum from 'math-sum';
import moment from 'moment';


export default function Scheduler(){
  const [posts, setPost] = useState([])
  const [tests, setTest] = useState([])
  const startOfMonth = moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
const endOfMonth   = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
console.log("s:", startOfMonth, "e:", endOfMonth);

  // const [showJira, setShowJira] = useState(false);
  // const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(false);
  const accountId = localStorage.getItem('accountId'); 
  const teamName = localStorage.getItem('team');
  console.log("teamName",teamName);
  // const initialValue = 0;
  //authentication for tempo timesheet, request a api-key in tempo app from the jira-workspace
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }
    //api-calls 
      useEffect(() => {
        //get all worklogs
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/`,
        
        header)
      .then( function (response)  {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        )
        setPost(response.data.results);
       //set data in arrray 
        console.log(posts)
        setLoadingData(false);
      }).catch(err => console.error(err));

      //get issues by assignee and reporter
      axios.get(`https://cors-anywhere.herokuapp.com/https://abano-playground.atlassian.net/rest/api/3/search?jql=assignee=${accountId}||reporter=${accountId}`,
   {
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'manish.nepali@abano.be:ipg6cqECKxuN31e8MLl8F131' //authemtication api key from attlassian
      ).toString('base64')}`
    },
    'Accept': 'application/json',
    },
  )
  .then( function (response)  {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    setTest(response.data.issues); //set data in arrray 
    console.log("tests:",tests.data.issues)
    setLoadingData(false);
  }).catch(err => console.error(err));
    },[]);

async function getWorklogs(){
  const total = document.getElementsByClassName("scheduler_default_event_inner")[0].textContent;
  console.log("t:", ...total)
  for (var i = 0; i < total.length; i++) {
    var hours = total[i].textContent;
    console.log("total: " + hours);
  }
  
}


//Create a summary colum on the right to display total hours worked that month by issues
const summaryStart = new DayPilot.Date("2100-01-01");
function createTimeline() {
  const timeline = [];
  const first = DayPilot.Date.today().firstDayOfMonth();
  const days = DayPilot.Date.today().daysInMonth();
  for (let i = 0; i < days; i++) {
    const start1 = start.addDays(i);
    timeline.push({
      start: start1,
      end: start1.addDays(1)
    });
  }

  timeline.push({
    start: summaryStart,
    end: summaryStart.addDays(1)
  });

  
  return timeline;
}
function onBeforeCellRender(args) {
  if (args.cell.start === summaryStart) {
    args.cell.properties.disabled = true;
    args.cell.properties.backColor = "#beab3f";

    const row = DayPilot.Scheduler.rows.find(args.cell.resource);
    const total = row.events.totalDuration();
    console.log("row",row);
    if (total.totalDays() > 0) {
       //args.cell.properties.html = total.totalDays();
    return  args.cell.properties.areas = [
        {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          style: "display: flex; justify-content: center; align-items: center;",
          html: "total.totalDays()"
        }
      ];
    }
    else {
    return  args.cell.properties.areas = [];
    }

  }
}



//to navigate to this, last and next month
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
             {/* only render calender-table if the data has loaded */}
              <h2>user timesheet</h2>
              <DayPilotScheduler
                   cellWidth = {75}
                   eventHeight = {50}
                     startDate = {start}
                     days = {DayPilot.Date.today().daysInMonth()}
                    scale = {"Day"}
                    theme={"stage"}
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
                {id: 1, text: "Event 1", start: `${startOfMonth}T00:00:00`, end: `${endOfMonth}T00:00:00`, resource: "A" },
                {id: 2, text: "Event 2", start: "2022-03-03T00:00:00", end: "2022-03-10T00:00:00", resource: "A", barColor: "#38761d", barBackColor: "#93c47d" },
                {id: 3, text: "Event 3", start: "2022-03-02T00:00:00", end: "2022-03-08T00:00:00", resource: "A", barColor: "#f1c232", barBackColor: "#f1c232" },
                {id: 4, text: "Event 3", start: "2022-03-02T00:00:00", end: "2022-03-08T00:00:00", resource: "A", barColor: "#cc0000", barBackColor: "#ea9999" }
            ]} 
            
                
            />
         {/* {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
                       <DayPilotScheduler
                  //  cellWidth = {75}
                   eventHeight = {50}
                     startDate = {start}
                     days = {DayPilot.Date.today().daysInMonth()}
                    // scale = {"Day"}
                    scale = {"Manual"}
                    timeHeaders = {[
                        {groupBy: "Month"},
                        {groupBy: "Day", format: "d"}
                    ]}
                   timeline={createTimeline()}
                    cellGroupBy
                    treeEnabled={true} 
                    autoScroll ={"Always"} 
                    rowHeaderColumnsMode={"Tabular"}     
                    eventHoverHandling ={"Bubble"}              
                    cellWidthSpec = {'manual'}
                    beforeCellRenderCaching={"false"} 
                    onBeforeCellRender={args => onBeforeCellRender(args)}
                    theme={"stage"}

                   //loop over issues
                    resources = { 
                      tests.map((p,i)=>{
                        
                        return{ name: p.key , id: p.id}
                          
            })}
         
           //bind events to the issues, tf = to convert seconds to hours, start = value where the event will be placed, resource = bind it to the issue 
                    events={posts.map((p,i)=>{
                       return {id: p.jiraWorklogId, text: `${tf.fromS(p.timeSpentSeconds)} \n hours `, start: `${p.startDate}T00:00:00`, end: `${p.startDate}T23:00:00`, resource: `${p.issue.id}`,  backColor: "#ffffff" , bubbleHtml: `${p.description} `}
                    }) }
               
            /> 
            )}
                    */}
            <br/>
           {/**navigate through next, this and last month */}
            <a onClick={datePick} id="buttonsUx">&#8249; last month</a> <a onClick={datePick2}  id="buttonsUx">This month </a>  <a onClick={datePick1}  id="buttonsUx">next month &#8250;</a>
                
                   
               
            </div>
            
           
        );
    
}
