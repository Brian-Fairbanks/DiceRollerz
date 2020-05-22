import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Chatrooms(){

  const [chatrooms, setChatrooms] = useState(["test"]);

  useEffect(() => {
    API.getChatrooms()
    .then( data => {setChatrooms(data.data)})
  }, [])


  return (
    <div>
      list the chatrooms here!
      <br/>
      {chatrooms.map(room => {
        return (
          <div>{room.name}</div>
        )
      })}
    </div>
  )
}

export default Chatrooms;