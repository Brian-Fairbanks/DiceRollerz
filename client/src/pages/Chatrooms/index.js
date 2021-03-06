import React, { useState, useEffect, useContext } from "react";
//Utils
import UserContext from "../../utils/userContext";
import API from "../../utils/API";
// Components
import Chatroom from "../../components/Chatroom";
import NewMessage from "../../components/NewMessage";
import ChatNav from "../../components/ChatNav";
import "./styles.css";
// Notification sound
import UIFx from "uifx";
import notificationMP3 from './fireball.mp3';

function Chatrooms(props) {
  const { M } = props;
  // User Settings
  const { user } = useContext(UserContext);

  // Chatroom Settings
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState({ chatroom: {}, posts: [] });
  const [clientRoom, setClientRoom] = useState("");

  // Message Settings
  const [clientMsg, setClientMsg] = useState("")
  const [editMsg, setEditMsg] = useState({ id: "", body: "", sender: "", room: "" })
  const [isEditingMsg, setIsEditingMsg] = useState(false);

  // Sound initialization
  const notification = new UIFx(notificationMP3,{volume: 0.5});


  /*  ###############################################################
      Helper Functions 
  ################################################################### */

  /* Chatroom Helpers
  ==================================== */


  // Callback from socket.io.  Updates current chatroom if the message is there, else logs that there is a new message elsewhere
  //  come back to this section for handling notifications
  async function refreshMessages(id) {
    if (id === currentChatroom.chatroom._id) {
      const data = await API.getChatroom(id);
      setCurrentChatroom(data.data);
      updateChatRooms();
    }
    else {
      //console.log("New message in " + id);
      updateChatRooms();
    }
  }

  // Functinality to change the chatroom
  function changeChatRoom(id) {
    let newRoom = allChatrooms.find(room => room._id === id);
    if (!newRoom) {
      //console.log("Couldn't switch to chatroom " + id);
      return;
    }
    getChatLogs(id);
    setCurrentChatroom({ chatroom: newRoom });
    //console.log("Switched to room: " + id);
    clearEditMessage();
  }

  // function to get information for an individual chat room.  Called when chat room name is clicked
  async function getChatLogs(id) {
    const data = await API.getChatroom(id);
    setCurrentChatroom(data.data);
    // set the current room in your new message state!
    //setNewMessage({ ...newMessage, body: "", room: data.data.chatroom._id })
  }

  // Update and print all avaliable chatrooms
  function updateChatRooms() {
    //console.log("Updating the chatroom Data")
    API.getChatrooms()
      .then(data => {
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
      .catch(err => { console.error(err) });
  }

  /* Edit/Delete Context Helpers
  =============================================*/

  function getEditMessage(body, id, sender) {
    //alert(`Clicked ${JSON.stringify(post)}!`);
    setEditMsg({ id, body, sender, room: currentChatroom.chatroom._id })
  }

  function clearEditMessage() {
    //      Empties the current selection
    setEditMsg({ id: "", body: "", sender: "", room: "" })
  }

  function deleteEditMessage() {
    //      Deletes the currently selected message
    API.deletePost(editMsg.id);
    setIsEditingMsg(false);
    clearEditMessage();
  }

  function updateEditMessage() {
    //Starts editing the text of the currently selected message
    //setNewMessage(editMsg);
    setIsEditingMsg(true);
    document.getElementById("message").focus()
  }


  /*  ###############################################################
      Use Effects 
  ################################################################### */

  // Setting up Socket.io listeners once the page loads
  useEffect(() => {
    // set up new Message listener
    API.socketListen(function (msg) {
      //console.log(msg);
      setClientMsg(msg);
    })

    // set up new Chatroom listener  
    API.socketRoomListen(function (msg) {
      //console.log(msg);
      // updateChatRooms();
      setClientRoom(msg);
    })
  }, [])

  // get and print all chatrooms once user context is loaded.
  // added benefit of being called once a users lastViewdMessages update
  useEffect(() => {
    updateChatRooms()
  }, [user])

  // Update Chatrooms when socket.io callback changes this state
  useEffect(() => {
    if (clientRoom) {
      updateChatRooms();
    }
  }, [clientRoom])

  // Update Messages when socket.io callback changes this state
  useEffect(() => {
    if (clientMsg) {
      //console.log(clientMsg);
      refreshMessages(clientMsg.room)
      if(clientMsg.body!=="Set Message Seen"){
        notification.play();
      }

    }
  }, [clientMsg])

  /*  ###############################################################
      Chatrooms Render Display 
  ################################################################### */

  return (
    <div className="chat-wrapper">

      {/* Side Navbar 
      ==========================================*/}
      <ChatNav
        M={M}
        allChatrooms={allChatrooms}
        user = {user}
        changeChatRoom = {changeChatRoom}
        currentChatroom = {currentChatroom}
        />

      {/* Chatroom Content 
      ==========================================*/}
      <div className="chat-content center-align grey-text">

        <div className="chatroom-title grey-1 midieval left-align white-text">
          <div className="show-on-small" style={{ display: "none" }}>
            <div className="mr5 sidenav-trigger cur-pointer" data-target="chat-nav"><i className="small material-icons">menu</i></div>
          </div>
          {currentChatroom.chatroom.name ? currentChatroom.chatroom.name : "No Chatroom Selected"}
        </div>

        {/* Set up the chatroom component 
      =================================*/}
        <Chatroom
          user={user}
          currentChatroom={currentChatroom}
          getEditMessage={getEditMessage}
        />

        {/* Context menu for updating a selected post.  This section should be moved, but here is the functionality
      ==================================*/}
        {editMsg.id ? (
          <div>
            <button className="btn waves-effect waves-light red accent" onClick={clearEditMessage}>Cancel</button>
            <button className="btn waves-effect waves-light red accent" onClick={() => { deleteEditMessage() }} disabled={editMsg.sender !== user._id}>Delete</button>
            <button className="btn waves-effect waves-light red accent" onClick={updateEditMessage} disabled={editMsg.sender !== user._id}>Edit</button>
          </div>
        )
          :
          ""
        }

        {/* Chatroom Message Submit form
      ================================= */}
        <NewMessage
          user={user}
          currentChatroom={currentChatroom.chatroom._id}
          isEditingMsg={isEditingMsg}
          setIsEditingMsg={setIsEditingMsg}
          refreshMessages={() => refreshMessages(currentChatroom.chatroom._id)}
          editMsg={editMsg}
        />
      </div>
    </div>
  )
}

export default Chatrooms;