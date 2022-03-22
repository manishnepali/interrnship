import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import Table from "./Table";
import Visual from './Visual';
import moment from 'moment';
import Scheduler from './Scheduler'


function Time() {
  
  const [posts, setPost] = useState([])
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const teamId = localStorage.getItem('id');
  console.log(teamId);
  
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }

    useEffect(() => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/worklogs/team/${teamId}`,
      
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

 
  const columns = useMemo(
    () => [
      {
        Header: "Teammember",
        accessor: "author.displayName",
      },
     
      {
        Header: "issue key",
        accessor: "issue.key"
      },
      {
        Header: "issue id",
        accessor: "issue.id"
      },
      {
        Header: "Timesheet",
        accessor: "jiraWorklogId" // accessor is the "key" in the data

      },
      {
        Header: "description",
        accessor: "description"
      },
  
  { Header: 'date and time',
    columns: [
     
  {Header: "date",
  accessor: "startDate",
  },
  {
    Header:'hours',
    accessor: "timeSpentSeconds",
        Cell: ({ cell: { value } }) => {
          const hour = tf.fromS(value);
          return (
            hour
          );
        }
      },
      
     
      

    ],},
    ],
    []
  );

 


    


    return (
      <div className="Time">
      <h2>Team timesheet</h2>
   <Scheduler />
         {/* {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <div id="testt">
        <Table columns={columns} data={posts}
        ></Table>
        <Visual></Visual>
        </div>
      )} */}
      {/* <ul>
      {posts.map((post, index) => {
        return <li key={index} 
        id="list">
          <li>
          worker: {post.author.displayName} </li>
          <li>tempoWorklogId: {post.tempoWorklogId} </li>
          <li>desciption: {post.description}</li>
          <li>issue: key: {post.issue.key} and id: {post.issue.id}</li>
          <li>timeSpent: {tf.fromS(post.timeSpentSeconds)} hours</li>
          <li>jiraWorklogId: {post.jiraWorklogId}</li>

          
          </li>
      })}
      </ul>  */}

      </div>
    );
  }
  
  export default Time;