import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import Message from "../components/Message";
import { NewChatModal, AddUserModal } from "../components/Modal";

// Scroll to bottom NPM package, to set a sticky scroller and keep the messages at the most recent.
import ScrollToBottom, { useSticky } from 'react-scroll-to-bottom';

//  invisibilify commence!

function Chatrooms(){
  const { user } = useContext(UserContext);

  const [allChatrooms, setAllChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState({chatroom:{},posts:[{_id:"stop no key alert", body:"No Messages"}]});

  const [clientMsg, setClientMsg] = useState("")
  const [editMsg, setEditMsg] = useState({id:"", body:"", sender:"", room:""})
  const [isEditingMsg, setIsEditingMsg] = useState(false);
  const [newMessage, setNewMessage] = useState({
    sender:user.username,
    room:"",
    body:""
  });

  // sticky scrollbar settigns
  const [sticky] = useSticky();
  
/*  ###############################################################
    Helper Functions 
################################################################### */

    // function to get information for an individual chat room.  Called when chat room name is clicked
    async function getChatLogs(id){
      const data = await API.getChatroom(id);
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
          if (!isEditingMsg) {
            await API.sendPost(newMessage)
          } else {
            await API.editPost(newMessage);
            setIsEditingMsg(false)
          }
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

    function getEditMessage(body, id, sender){
      //alert(`Clicked ${JSON.stringify(post)}!`);
      setEditMsg({id, body, sender, room: currentChatroom.chatroom._id})
    }

    function clearEditMessage() {
      //      Empties the current selection
      setEditMsg({id:"", body:"", sender:"", room:""})
    }

    function deleteEditMessage() {
      //      Deletes the currently selected message
      API.deletePost(editMsg.id); 
      setIsEditingMsg(false);
      clearEditMessage();
    }

    function UpdateEditMessage() {
      //      Starts editing the text of the currently selected message
      setNewMessage(editMsg); 
      setIsEditingMsg(true); 
      document.getElementById("message").focus()
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
    .then( data => {
      let myChatRooms = [];
      if (Array.isArray(data.data)) {
        data.data.map(room => {
          if (room.members.find(item => item.user === user._id)) {
            myChatRooms.push(room);
          }
        })
      }
      setAllChatrooms(myChatRooms);
    })
  }, [user])

  //  Chat Socket goes here
  
  //set sender for new message form once user context is loaded.
  useEffect(() => {
    setNewMessage( {sender: user._id})
  }, [user])

  // Update messages when socket.io callback changes this state
  useEffect(() => {
    // console.log(clientMsg)
    if(clientMsg){
      updateMessages(clientMsg.room)
    }
  }, [clientMsg])

  return (
    <div className="center-align grey-text">
      list the chatrooms for {user.username}
      <div>{currentChatroom.chatroom.name}</div>
      <br/>
      {allChatrooms.map(room => {
        return (
          <button key={room._id} onClick={()=> {getChatLogs(room._id);clearEditMessage();}} className="btn red accent" >{room.name}</button>
        )
        })
      }

      <div style={{display: "flex",  justifyContent: "center"}}>
      {/*Adding a new chatroom button */}
      <NewChatModal 
        //value={"Testing Values"}
      />
      {currentChatroom.chatroom._id &&
        currentChatroom.chatroom.members.find(item => item.role === "DM").user === user._id ?
        <AddUserModal
          chatRoom={currentChatroom.chatroom}
        /> :
        ""}
      </div>

      <ScrollToBottom className="posts row m-auto overflow-scroll ">
        {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
          return (
            <Message
              members={currentChatroom.chatroom.members}
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
        {!sticky}     
      </ScrollToBottom>

      {currentChatroom.chatroom? 
        <form className="row flex flex-align-center">
            <div className="input-field col flex-grow">
              <textarea id="message" value={newMessage.body} onChange={handleInputChange} className="materialize-textarea white-text" ></textarea>
              <label htmlFor="message">{(!isEditingMsg ? "New Message" : "Edit Message")}</label>
            </div>
            <div className="col">
              <button className="btn red accent" onClick={handleMsgSubmit}>Submit
              </button>
            </div>
        </form>
        :""
      }
      {/* Context menu for updating a selected post.  This section should be moved, but here is the functionality*/}
      {editMsg.id?(
        <div>
          <button className="btn waves-effect waves-light red accent" onClick={clearEditMessage}>Cancel</button>
          <button className="btn waves-effect waves-light red accent" onClick={deleteEditMessage} disabled={editMsg.sender !== user._id}>Delete</button>
          <button className="btn waves-effect waves-light red accent" onClick={UpdateEditMessage} disabled={editMsg.sender !== user._id}>Edit</button>
        </div>
        )
        :
        ""
      }

    </div>
  )
}

export default Chatrooms;