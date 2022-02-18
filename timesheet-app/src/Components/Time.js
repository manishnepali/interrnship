import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import Table from "./Table";

function Time() {
  
  const [posts, setPost] = useState([])
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
    }

    useEffect(() => {
      axios.get('/api',
      header)
    .then( function (response)  {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      )
      setPost(response.data.results);
      setUser(response.data.results[1].jiraWorklogId)
      setLoadingData(false);
    }).catch(err => console.error(err));
  },[]);

 
  const columns = useMemo(
    () => [
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
      <div className="Time">
         {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={posts}
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
  
  export default Time;