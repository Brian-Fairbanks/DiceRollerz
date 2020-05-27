import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import Message from "../components/Message";
import NewChatModal from "../components/Modal";

function Chatrooms(){
  const { user } = useContext(UserContext);

  const [allChatrooms, setAllChatrooms] = useState(["test"]);
  const [currentChatroom, setCurrentChatroom] = useState({chatroom:{},posts:[{_id:"stop no key alert", body:"No Messages"}]});

  const [clientMsg, setClientMsg] = useState("")
  const [editMsg, setEditMsg] = useState({id:"", body:""})
  const [newMessage, setNewMessage] = useState({
    sender:user.userName,
    room:"",
    body:""
  });

/*  ###############################################################
    Helper Functions 
################################################################### */

    // function to get information for an individual chat room.  Called when chat room name is clicked
    async function getChatLogs(id){
      const data = await API.getChatroom(id);
      // console.log(data.data);
      setCurrentChatroom(data.data);
      // set the current room in your new message state!
      setNewMessage( {...newMessage, body:"", room: data.data.chatroom._id})
    }
  
  
    async function updateMessages(id){
      if(id === currentChatroom.chatroom._id){
        const data = await API.getChatroom(id);
        setCurrentChatroom(data.data);
      }
      else{
        console.log("New message in "+id);
      }
    }
  
  
    async function handleMsgSubmit(event) {
      event.preventDefault();
      if (newMessage.sender && newMessage.room && newMessage.body) {
        try{
          await API.sendPost(newMessage)
          setNewMessage({...newMessage, body:""});
          updateMessages(currentChatroom.chatroom._id)
        }
        catch (err){ console.log(err);}
      }
    };
  
    function handleInputChange(event) {
      const {value} = event.currentTarget;
      setNewMessage({...newMessage, body: value})
    };

    function getEditMessage(post, id){
      //alert(`Clicked ${JSON.stringify(post)}!`);
      setEditMsg({post, id})
      
    }


/*  ###############################################################
    Use Effects 
################################################################### */
  // Run once when loading the page
  useEffect(() => {
    // set up socket listener
    API.socketListen( function (msg){
      console.log(msg);
      setClientMsg(msg);
    })

    // get and print all chatrooms
    API.getChatrooms()
    .then( data => {setAllChatrooms(data.data)})
  }, [])

  //set sender for new message form once user context is loaded.
  useEffect(() => {
    setNewMessage( {sender: user._id})
  }, [user])

  // Update messages when socket.io callback changes this state
  useEffect(() => {
    console.log(clientMsg)
    if(clientMsg){
      updateMessages(clientMsg.room)
    }
  }, [clientMsg])



  return (
    <div className="center-align grey-text">
      list the chatrooms for {user.userName}
      <div>{currentChatroom.chatroom.name}</div>
      <br/>
      {allChatrooms.map(room => {
        return (
          <button key={room.id} onClick={()=> {getChatLogs(room._id)}} className="btn" >{room.name}</button>
        )
      })}

      {/*Adding a new chatroom button */}
      <NewChatModal
        //value={"Testing Values"}
      />

      <div className="posts row m-auto overflow-scroll ">
        {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
          return (
            <Message
              key={post._id}
              deleted={post.deleted}
              updated={post.updated}
              body={post.body}
              sender={post.sender}
              yours={post.sender === user._id}
              id = {post._id}
              getMsg={getEditMessage}
              time={post.timestamp}
            />
          )
        }):"No Messages"}        
      </div>

      {currentChatroom.chatroom? 
        <form className="row">
            <div className="input-field col s10">
              <textarea id="message" value={newMessage.body} onChange={handleInputChange} className="materialize-textarea" ></textarea>
              <label htmlFor="message">New Message</label>
            </div>
            <div className="col s2">
              <button onClick={handleMsgSubmit} className="btn">Submit</button>
            </div>
        </form>
        :""
      }
      {/* Context menu for updating a selected post.  This section should be moved, but here is the functionality*/}
      {editMsg.id?(
        <div>
          <button onClick={() => setEditMsg({id:"", body:""})}>Cancel</button>
          <button onClick={()=>{API.deletePost(editMsg.id); setEditMsg({id:"", body:""})}}>Delete</button>
          <button>Edit</button>
        </div>
        )
        :
        ""
      }

    </div>
  )
}

export default Chatrooms;