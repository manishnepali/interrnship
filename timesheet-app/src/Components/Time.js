import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import { Buffer } from 'buffer';

export default function Time(){
  const [posts, setPost] = useState([])
  const [tests, setTest] = useState([])
  const [showJira, setShowJira] = useState(false);
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const accountId = localStorage.getItem('accountId'); 
  const teamId = localStorage.getItem("id")
  const teamName = localStorage.getItem('team');
  console.log(teamName, teamId);
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


        return (
            <div style={{width: "70%",  marginLeft: "15%", marginBottom: "2%"}}>
              <button onClick={getWorklogs}>test</button>
              <h2>time sheet for {accountId}</h2>
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
                    onBeforeCellRender ={ "true"}
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
                

               
            </div>
           
        );
    
}

// function Time() {
  
//   const [posts, setPost] = useState([])
//   const [user, setUser] = useState([])
//   const [loadingData, setLoadingData] = useState(true);
//   const teamId = localStorage.getItem('id');
//   console.log(teamId);
  
//   const header ={ 
//     headers: {
//      'Access-Control-Allow-Origin':'*',
//       'Accept': 'application/json',
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
//     }
//     }

//     useEffect(() => {
//       axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/team/${teamId}`,
      
//       header)
//     .then( function (response)  {
//       console.log(
//         `Response: ${response.status} ${response.statusText}`
//       )
//       setPost(response.data.results);
//       setUser(response.data.results[1].jiraWorklogId)
//       console.log(posts)
//       setLoadingData(false);
//     }).catch(err => console.error(err));
//   },[]);

 
//   const columns = useMemo(
//     () => [
//       {
//         Header: "Teammember",
//         accessor: "author.displayName",
//       },
     
//       {
//         Header: "issue key",
//         accessor: "issue.key"
//       },
//       {
//         Header: "issue id",
//         accessor: "issue.id"
//       },
//       {
//         Header: "Timesheet",
//         accessor: "jiraWorklogId" // accessor is the "key" in the data

//       },
//       {
//         Header: "description",
//         accessor: "description"
//       },
  
//   { Header: 'date and time',
//     columns: [
     
//   {Header: "date",
//   accessor: "startDate",
//   },
//   {
//     Header:'hours',
//     accessor: "timeSpentSeconds",
//         Cell: ({ cell: { value } }) => {
//           const hour = tf.fromS(value);
//           return (
//             hour
//           );
//         }
//       },
      
     
      

//     ],},
//     ],
//     []
//   );

 


    


//     return (
//       <div className="Time">
//       <h2>Team timesheet</h2>
//    <Scheduler />
//          {/* {loadingData ? (
//         <p>Loading Please wait...</p>
//       ) : (
//         <div id="testt">
//         <Table columns={columns} data={posts}
//         ></Table>
//         <Visual></Visual>
//         </div>
//       )} */}
//       {/* <ul>
//       {posts.map((post, index) => {
//         return <li key={index} 
//         id="list">
//           <li>
//           worker: {post.author.displayName} </li>
//           <li>tempoWorklogId: {post.tempoWorklogId} </li>
//           <li>desciption: {post.description}</li>
//           <li>issue: key: {post.issue.key} and id: {post.issue.id}</li>
//           <li>timeSpent: {tf.fromS(post.timeSpentSeconds)} hours</li>
//           <li>jiraWorklogId: {post.jiraWorklogId}</li>

          
//           </li>
//       })}
//       </ul>  */}

//       </div>
//     );
//   }
  
//   export default Time;