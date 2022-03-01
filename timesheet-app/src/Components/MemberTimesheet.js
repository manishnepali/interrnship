import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import Table from "./Table";



function MemberTimesheet() {
  
  const [posts, setPost] = useState([])
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const [members, setMembers] = useState([]);
  const accountId = localStorage.getItem('accountId');
  
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS"

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
      console.log("member",members);
      setLoadingData(false);
      
    }).catch(err => console.error(err));
  },[]);

 
  const columns = useMemo(
    () => [
      {Header: "start Date",
    accessor: "startDate"},
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
        Header: "Teammember",
        accessor: "author.displayName"
      },
      {
        Header: "description",
        accessor: "description"
      },
      
      {
        Header: "timeSpent",
        accessor: "timeSpentSeconds",
        Cell: ({ cell: { value } }) => {
          const hour = tf.fromS(value);
          return (
            hour
          );
        }
      }
    ],
    []
  );

 


    


    return (
      <div className="MemberTimesheet">
        <h2>{}</h2>
         {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={members}
        ></Table>

      )}
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
  
  export default MemberTimesheet;