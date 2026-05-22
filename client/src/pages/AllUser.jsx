import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"

const AllUser = () => {
    const [data,setData]=useState("")
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([])


   async function findUser(){
          const token = localStorage.getItem("token");
          //console.log(token)

   try{
        const res=await axios.get(
            "http://localhost:5000/api/AllUser",
            {
          headers: {
            Authorization: `${token}`
          },
          params: { search: data }
        }
        )
        setUsers(res.data)
        console.log(res.data)
         //   alert(JSON.stringify(res.data))
    }
    catch(err){
        console.log(err.response);
   console.log(err);
            alert(err.response?.data?.message || "data fetching error")
    }

    }

   //---------All user ------------------------------ 
useEffect(() => {
  fetchAllUsers();
}, []);

async function fetchAllUsers() {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://localhost:5000/api/AllUser/all",
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    setAllUsers(res.data);
  } catch (err) {
    console.log(err);
  }
}
    
//----------------------return------------------------
  return (
    <div>
        <h2>you an find ALLUSER hear</h2>
    <input type="text" name="text" placeholder='search user'   onChange={(e) => setData(e.target.value)} />
    <button onClick={findUser}>Click me</button>
      
<br />
  {/*-------------- search bars table ------------------  */}
     {users.length > 0 && (
  <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>User ID</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u._id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u._id}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}


<br />
<br />
<br />
{/*-------------------- All users data table-------------------------- */}
<h3>All Registered Users ({allUsers.length})</h3>

{allUsers.length > 0 && (
  <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {allUsers.map((u) => (
        <tr key={u._id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  )
}

export default AllUser
