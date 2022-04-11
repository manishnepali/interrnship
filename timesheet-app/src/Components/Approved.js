import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import Table from "./Table";



function Approved() {
  
  const [posts, setPost] = useState([])
  const [user, setUser] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const id = localStorage.getItem('id');
  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }

    useEffect(() => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/timesheet-approvals/team/${id}?from=2022-03-01&to=2022-03-31`,
      header)
    .then( function (response)  {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      )
      setPost(response.data.results);
      setLoadingData(false);
    }).catch(err => console.error(err));
  },[]);

 
  const columns = useMemo(
    () => [
      {Header: "from",
    accessor: "period.from"},
    {Header: "to",
    accessor: "period.to"},
    {Header: "status",
    accessor: "status.key"},
      
    
    ],
    []
  );

 


    


    return (
      <div className="Approved">
        <h1>
      current approval for this team
      </h1>
         {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={posts}
        ></Table>
      )}
      
      </div>
    );
  }
  
  export default Approved;