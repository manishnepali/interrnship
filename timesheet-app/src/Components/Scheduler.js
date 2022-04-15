import React, {useState, useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import axios from 'axios';
import { Buffer } from 'buffer';
import tf from 'hh-mm-ss';
import mathSum from 'math-sum';
import Approved from './Approved';

export default function Scheduler(){
  const [posts, setPost] = useState([])
  const [tests, setTest] = useState([])
  const [showJira, setShowJira] = useState(false);
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const accountId = localStorage.getItem('accountId'); 
  const teamName = localStorage.getItem('team');
  console.log("teamName",teamName);
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

async function getWorklogs(){
  const total = document.getElementsByClassName("scheduler_default_event_inner")[0].textContent;
  console.log("t:", ...total)
  for (var i = 0; i < total.length; i++) {
    var hours = total[i].textContent;
    console.log("total: " + hours);
  }
  
}

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
 function onBeforeCellRender(args) {
  if (args.cell.start === summaryStart) {
    args.cell.properties.disabled = true;
    args.cell.properties.backColor = "#beab3f";

    const row = DayPilot.Scheduler.rows.find(args.cell.resource);
    const total = row.events.totalDuration();

    if (total.totalDays() > 0) {
       args.cell.properties.html = total.totalDays();
      args.cell.properties.areas = [
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
      args.cell.properties.areas = [];
    }

  }
}


        return (
            <div style={{width: "70%",  marginLeft: "15%", marginBottom: "2%"}}>
             
              <h2>user timesheet</h2>
         {loadingData ? (
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

                   
                    resources = { 
                      tests.map((p,i)=>{
                        
                        return{ name: p.key , id: p.id}
                          
            })}
         
           
                    events={posts.map((p,i)=>{
                       return {id: p.jiraWorklogId, text: `${tf.fromS(p.timeSpentSeconds)} hour `, start: `${p.startDate}T00:00:00`, end: `${p.startDate}T23:00:00`, resource: `${p.issue.id}`,  backColor: "#ffffff" , bubbleHtml: `${p.description} `}
                    }) }
               
            /> 
            )}
                   
            
           
            <a onClick={datePick} id="buttonsUx">&#8249; last month</a> <a onClick={datePick2}  id="buttonsUx">This month </a>  <a onClick={datePick1}  id="buttonsUx">next month &#8250;</a>
                
                    <div>
                      <Approved/>
                    </div>
               
            </div>
            
           
        );
    
}
