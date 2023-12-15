import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
 <tr>
   <td>{props.list.title}</td>
   {/* <td>{props.record.price}</td>
   <td>{props.record.url}</td> */}
   {/* <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td> */}
 </tr>
);
export default function RecordList() {
 const [list, setList] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/list/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const list = await response.json();
     setList(list);
   }
    getRecords();
    return;
 }, [list.length]);

  // This method will delete a record
//  async function deleteRecord(id) {
//    await fetch(`http://localhost:5000/${id}`, {
//      method: "DELETE"
//    });
//     const newRecords = records.filter((el) => el._id !== id);
//    setRecords(newRecords);
//  }


  // This method will map out the records on the table
 function recordList() {
   return list.map((list) => {
     return (
       <Record
         list={list}
         deleteRecord={() => deleteRecord(list._id)}
         key={list._id}
       />
     );
   });
 }

  // This following section will display the table with the records of individuals.
 return (
   <div>
     {/* <h3>Record List</h3> */}
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           {/* <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th> */}
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>   
     </table>
   </div>
 );
}