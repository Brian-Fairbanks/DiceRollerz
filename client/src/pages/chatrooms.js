import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import Message from "../components/Message";

function Chatrooms(){
  const { user } = useContext(UserContext);
  const [allChatrooms, setAllChatrooms] = useState(["test"]);
  const [currentChatroom, setCurrentChatroom] = useState({posts:[{body:"No Messages"}]});

  const [newMessage, setNewMessage] = useState({
    sender:user.userName,
    room:"",
    body:""
  });

  // Run once when loading the page
  useEffect(() => {
    API.getChatrooms()
    .then( data => {setAllChatrooms(data.data)})
  }, [])

  //set sender for new message form once user context is loaded.
  useEffect(() => {
    setNewMessage( {...newMessage, sender: user._id})
  }, [user])


  // function to get information for an individual chat room.  Called when chat room name is clicked
  async function getChatLogs(id){
    const data = await API.getChatroom(id);
    // console.log(data.data);
    setCurrentChatroom(data.data);
    // set the current room in your new message state!
    setNewMessage( {...newMessage, sender: user._id, room: data.data.chatroom._id})
  }


  async function submitMessage(){

  }




  return (
    <div>

  list the chatrooms for {user._id}!
      <br/>
      {allChatrooms.map(room => {
        return (
          <button onClick={()=> {getChatLogs(room._id)}}>{room.name}</button>
        )
      })}

      <div className="row m-auto">
        {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
          return (
            <Message
              key={post._id}
              deleted={post.deleted}
              updated={post.updated}
              body={post.body}
              sender={post.sender}
              yours={post.sender == user._id}
            />
          )
        }):"No Messages"}        
      </div>

      {currentChatroom.chatroom? 
        <form className="col s12">
          <div className="row">
            <div className="input-field col s10">
              <textarea id="textarea1" onChange={(event)=>{setNewMessage({...newMessage, body:event.currentTarget.value})}} className="materialize-textarea"></textarea>
              <label htmlFor="textarea1">New Message</label>
            </div>
            <div className="col s2">
              <button>Submit</button>
            </div>
          </div>
        </form>
        :""
      }

    </div>
  )
}

export default Chatrooms;