import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/userContext";
import { NewChatModal, AddUserModal } from "../../components/Modal";
import moment from "moment";
import Chatroom from "../../components/Chatroom";


//  invisibilify commence!

function Chatrooms(){
  const { user } = useContext(UserContext);

  const [allChatrooms, setAllChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState({chatroom:{},posts:[]});
  const [clientRoom, setClientRoom] = useState("");

  

  const [clientMsg, setClientMsg] = useState("")
  const [editMsg, setEditMsg] = useState({id:"", body:"", sender:"", room:""})
  const [isEditingMsg, setIsEditingMsg] = useState(false);
  const [newMessage, setNewMessage] = useState({
    sender:user.username,
    room:"",
    body:""
  });

  
  // dateStampts
  var lastDate="";
  
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




    /* Edit/Delete Context Helpers
    =============================================*/

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

    function updateEditMessage() {
      //      Starts editing the text of the currently selected message
      setNewMessage(editMsg); 
      setIsEditingMsg(true); 
      document.getElementById("message").focus()
    }





    function changeChatRoom(id) {
      let newRoom = allChatrooms.find(room => room._id === id);
      if (!newRoom) {
        console.log("Couldn't switch to chatroom "+id);
        return;
      }
      getChatLogs(id);
      setCurrentChatroom({chatroom: newRoom});
      console.log("Switched to room: " + id);
      clearEditMessage();
    }


    function updateChatRooms() {
      console.log("Updating the chatroom Data")
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
        myChatRooms.sort((a, b) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1);
        setAllChatrooms(myChatRooms);
      })
      .catch( err => {console.error(err)});
    }


    /* DateStamp Creation Logic
    ================================ */
    function printDate(timestamp){
      let date = moment(timestamp).format('MMMM Do YYYY')
      if(date === lastDate){
        return "";
      }
      lastDate=date;
      return (<span key={date} className="date-stamp">{date}</span>);
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

    API.socketRoomListen( function (msg){
      console.log(msg);
      // updateChatRooms();
      setClientRoom(msg);
    })
  }, [])

  // set sender for new message form once user context is loaded.
  useEffect(() => {
    setNewMessage( {sender: user._id})
    // also get and print all chatrooms
    updateChatRooms()
  }, [user])

   // Update messages when socket.io callback changes this state
  useEffect(() => {
    // console.log(clientMsg)
    if(clientRoom){
      updateChatRooms();
    }
  }, [clientRoom])

  // Update messages when socket.io callback changes this state
  useEffect(() => {
    // console.log(clientMsg)
    if(clientMsg){
      updateMessages(clientMsg.room)
    }
  }, [clientMsg])

  return (
    <div className="center-align grey-text">
      <div>{currentChatroom.chatroom.name}</div>
      <br/>
      {allChatrooms.map(room => {
        return (
          <button key={room._id} onClick={()=> {changeChatRoom(room._id)}} className="btn red accent" >{room.name}</button>
        )
        })
      }

      <div style={{display: "flex",  justifyContent: "center"}}>
      {/*Adding a new chatroom button */}
      <NewChatModal 
        onAddChatroom={updateChatRooms}
        //value={"Testing Values"}
      />
      {currentChatroom.chatroom._id &&
        currentChatroom.chatroom.members.find(item => item.role === "DM").user === user._id ?
        <AddUserModal
          chatRoom={currentChatroom.chatroom}
        /> :
        ""}
      </div>

      {/* Set up the chatroom component */}
      <Chatroom 
        user={user}
        currentChatroom={currentChatroom}
        getEditMessage = {() => getEditMessage()}
        printDate = {() => printDate()}
      />

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
          <button className="btn waves-effect waves-light red accent" onClick={() => {updateMessages(currentChatroom.chatroom._id); deleteEditMessage()}} disabled={editMsg.sender !== user._id}>Delete</button>
          <button className="btn waves-effect waves-light red accent" onClick={updateEditMessage} disabled={editMsg.sender !== user._id}>Edit</button>
        </div>
        )
        :
        ""
      }

    </div>
  )
}

export default Chatrooms;