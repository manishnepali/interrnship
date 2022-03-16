import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';



// Table data as a list of array.
const test = [
  "first row",
  "second row",
  "third row"
  // .... and more
];

// Custom cell implementation with special prop
const MyCustomCell = ({ mySpecialProp }) =>
  <Cell>
    {mySpecialProp === "column2" ? "I'm column 2" : "I'm not column 2"}
  </Cell>;


export default function Orbs(){
    const [posts, setPost] = useState([])
    const [user, setUser] = useState([])
    const [count, setCount] = useState(10)
    const [loadingData, setLoadingData] = useState(true);
    const [members, setMembers] = useState([]);
    const accountId = localStorage.getItem('accountId');
    console.log(accountId);
    
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
    
    return (
        <div className="container sample">
        {/* <Table
    rowHeight={50}
    rowsCount={test.length}
    width={5000}
    height={5000}
    headerHeight={50}
    >
    <Column
      header={<Cell>Col 1</Cell>}
      cell={<Cell>Column 1 static content</Cell>}
      width={2000}
    />
    <Column
      header={<Cell>Col 2</Cell>}
      cell={<MyCustomCell mySpecialProp="column2" />}
      width={1000}
    />
    <Column
          columnKey="description"
          header={<Cell>First Name</Cell>}
          width={130}
          cell={({ rowIndex, columnKey }) => {
            return <Cell>{members[rowIndex][columnKey]}</Cell>;
          }}
        />
  </Table>, */}
        </div>
    );
   
   

           
   
}