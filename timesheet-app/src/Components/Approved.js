import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import tf from 'hh-mm-ss';
import Table from "./Table";
import moment from 'moment';


function Approved() {
  
  const [posts, setPost] = useState([])
  const [loadingData, setLoadingData] = useState(false);
  const id = localStorage.getItem('id');
  const accountId = localStorage.getItem('accountId');
  console.log(accountId);

//get date funtion
const startOfMonth = moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
const endOfMonth   = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
console.log("s:", startOfMonth, "e:", endOfMonth);


  const header ={ 
    headers: {
     'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Authorization': "Bearer vlArWEw06XS8hk2fu8MdOcPpWWNAki"
    }
    }
//get approval by team
  //   useEffect(() => {
  //     axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/timesheet-approvals/team/${id}?from=${startOfMonth}&to=${endOfMonth}`,
  //     header)
  //   .then( function (response)  {
  //     console.log(
  //       `Response: ${response.status} ${response.statusText}`
  //     )
  //     setPost(response.data.results);
  //     setLoadingData(false);
  //   }).catch(err => console.error(err));
  // },[]);
//approve the open or in review timesheet
  // async function approveIt(e){
  //   e.preventDefault();
  //   axios.post(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/timesheet-approvals/user/${accountId}/approve?from=${startOfMonth}&to=${endOfMonth}`,
        
  //   header)
  // .then( function (response)  {
  //   document.getElementById("err").style.background = "#07926C";
  //   document.getElementById("err").innerHTML = response.statusText;
  //   console.log(
  //     `Response: ${response.status} ${response.statusText}`
  //   )
  // }).catch(err => {console.error(err); document.getElementById("err").style.background = "#D70300"; document.getElementById("err").innerHTML = err;});

  // }
  //approve the open or in review timesheet
  // async function rejectIt(e){
  //   e.preventDefault();
  //   axios.post(`https://cors-anywhere.herokuapp.com/https://api.tempo.io/core/3/timesheet-approvals/user/${accountId}/reject?from=${startOfMonth}&to=${endOfMonth}`,
        
  //   header)
  // .then( function (response)  {
  //   document.getElementById("err").innerHTML = response.statusText;
  //   document.getElementById("err").style.background = "#07926C";
  //   console.log(
  //     `Response: ${response.status} ${response.statusText}`
  //   )
  // }).catch(err => {console.error(err); document.getElementById("err").style.background = "#D70300"; document.getElementById("err").innerHTML = err; });

  // }

 //map data in table
  const columns = useMemo(
    () => [
      {Header: "user",
    accessor: "user.displayName"},
      {Header: "from",
    accessor: "period.from"},
    {Header: "to",
    accessor: "period.to"},
    {Header: "status",
    accessor: "status.key"},
    {Header: "requiredSeconds",
    accessor: "requiredSeconds"},
    {Header: "timeSpentSeconds",
    accessor: "timeSpentSeconds"},
    {Header: "approve",
    accessor: "approve",
   //create a approve button
    Cell: ({ cell }) => (
      <button value={"approve"} onClick={alert("Approved")}>
        {"approve"}
      </button>
      
    )},
    {Header: "reject",
    accessor: "reject",
    //create a approve button
     Cell: ({ cell }) => (
       
       <button value={"reject"} onClick={alert("rejected")}>
         {"reject"}
       </button>
     )}
      
    
    ],
    []
  );

 


    


    return (
      <div className="Approved">
        <h2>
      Approvals form last month for member of current team:
      </h2>
         {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={posts}
        >
          
        </Table>
      )}
      <div id="err"></div>
      </div>
    );
  }
  
  export default Approved;