import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'
import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';

import {Table, Column, Cell} from 'fixed-data-table-2';
// import 'fixed-data-table-2/dist/fixed-data-table.css';




export default function Visual(){
 



    const [posts, setPost] = useState([])
    const [user, setUser] = useState([])
    const [count, setCount] = useState(10)
    const [loadingData, setLoadingData] = useState(true);
    const [members, setMembers] = useState([]);
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
        setMembers(response.data.results);
        setCount(response.data.metadata.count)
        console.log("member",members);
        setLoadingData(false);
        
      }).catch(err => console.error(err));
    },[]);
  
  
console.log("count",count)

const dateHeader = document.getElementById("headerDate");   
function test(){
  if(this.startDate == dateHeader){
    return true;
  }
}
const rows = [
  { someKey: "someValue" },
  { someKey: "anotherValue" },
  { someKey: "yetAnother" }
];





      return (
        <div className="Visual"
        style={{marginLeft: "5%", paddingTop: "2%"}}>
           
   
             {/* <Table
             
    rowHeight={50}
    rowsCount={count}
    width={1200}
    height={600}
    headerHeight={50}>
     <Column
          columnKey="description"
          header={<Cell>descrription</Cell>}
          cell={members.map((m, i)=>{
           return <Cell>{m[i].description}</Cell> })}
          fixed={true}
          width={100}
        />
    
  { members.map((m, i)=>{ 
    return <Column
     
      header={  <Cell id="headerDate">{m.startDate}</Cell> }
      footer={<Cell>test</Cell>}
      cell={<Cell> {tf.fromS(m.timeSpentSeconds)}</Cell>}
   
      width={100}
    />    
 }) }

  </Table>   */}

           
       {/* <table>
       {members.map((m, i)=>{
         
               return <tr key={i}>
                
                    <th >
                    {m.startDate}
                    </th>
                    <td>
                    {m.timeSpentSeconds}
                    </td>
                   
                    
                </tr>
                 })}
               
              
                </table> 
                */}
              <Timeline groups={members.map((m,index)=>{
    return{
        id:   m.jiraWorklogId,
        group: m.issue.id,
         title:  `${m.issue.key} ${m.description}`}
           })}
             items={ members.map((m,index)=>{
    return{id: m.issue.id,
        group:   m.jiraWorklogId,
         title:  tf.fromS(m.timeSpentSeconds),
         start_time:  moment(`${m.startDate}`, "YYYY-MM-DD").toDate(), end_time:  moment(`${m.startDate}`,"YYYY-MM-DD").add(1, "day").toDate()}
           })}
           visibleTimeStart={moment().add(-20, 'day')}
           visibleTimeEnd={moment().add(1, 'day')}
             />   
           
      
         
    
        </div>
      );
 
}