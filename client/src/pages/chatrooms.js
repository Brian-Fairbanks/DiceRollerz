import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Chatrooms(){

  const [allChatrooms, setAllChatrooms] = useState(["test"]);
  const [currentChatroom, setCurrentChatroom] = useState({posts:[{body:"No Messages"}]});

  useEffect(() => {
    API.getChatrooms()
    .then( data => {setAllChatrooms(data.data)})
  }, [])


  async function getChatLogs(id){
    const data = await API.getChatroom(id);
    console.log(data.data);
    setCurrentChatroom(data.data);
  }




  return (
    <div>
      list the chatrooms here!
      <br/>
      {allChatrooms.map(room => {
        return (
          <button onClick={()=> {getChatLogs(room._id)}}>{room.name}</button>
        )
      })}


      {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
        return (
          <div>{post.deleted?"Message has been deleted":post.body}</div>
        )
      }):"No Messages"}

    </div>
  )
}

export default Chatrooms;