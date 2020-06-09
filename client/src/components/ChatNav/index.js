import React, { useEffect } from "react";
import { NewChatModal, AddUserModal } from "../../components/Modal";


function Nav(props) {
  const { M, allChatrooms, user, changeChatRoom, currentChatroom } = props;

  useEffect(() => {
    initSideNav();
  }, [])

  function initSideNav() {
    let chatnav = document.querySelector('.sidenav.chat-nav');
    M.Sidenav.init(chatnav);
  }


  return (
    <div>
      <div className="hide-on-small-only fixed-chat-nav center-align grey-text grey-2">
        <div>
          <div className="midieval text-white chat-nav-title">- Chatrooms - </div>
          {/*Button to add new chat room
          ================================*/}
          <NewChatModal />

          {/* Add all buttons for this users avaliable allChatrooms
          ================================ */}
          {currentChatroom.chatroom._id &&
            currentChatroom.chatroom.members.find(item => item.role === "DM").user === user._id ?
            <AddUserModal
              chatRoom={currentChatroom.chatroom}
            /> :
            ""}
        </div>

        <div className="chat-nav-rule m-auto" />
        {user.seenMessages? allChatrooms.map(room => {
          return (
            <button
              key={room._id}
              onClick={() => { changeChatRoom(room._id) }}
              className={`chatroom-button midieval btn red accent${
                currentChatroom.chatroom._id === room._id ? " active" : " inactive"
                }${
                (!user.seenMessages.find(userRoom => userRoom.room === room._id)) || (user.seenMessages.find(userRoom => userRoom.room === room._id).message !== room.lastMessage) ?
                  " notify"
                  : ""}`
              }
            >
              {room.name}
            </button>
          )
        }):""
        }
      </div>


      <div id="chat-nav" className="sidenav chat-nav blue-grey darken-3">
        <div className="fixed-chat-nav center-align grey-text grey-2">
          <div>
            <div className="midieval text-white chat-nav-title">- Chatrooms - </div>
            {/*Button to add new chat room
          ================================*/}
            <NewChatModal />

            {/* Add all buttons for this users avaliable allChatrooms
          ================================ */}
            {currentChatroom.chatroom._id &&
              currentChatroom.chatroom.members.find(item => item.role === "DM").user === user._id ?
              <AddUserModal
                chatRoom={currentChatroom.chatroom}
              /> :
              ""}
          </div>

          <div className="chat-nav-rule m-auto" />

          {user.seenMessages? allChatrooms.map(room => {
            return (
              <button
                key={room._id}
                onClick={() => { changeChatRoom(room._id) }}
                className={`chatroom-button midieval btn red accent${
                  currentChatroom.chatroom._id === room._id ? " active" : " inactive"
                  }${
                  (!user.seenMessages.find(userRoom => userRoom.room === room._id)) || (user.seenMessages.find(userRoom => userRoom.room === room._id).message !== room.lastMessage) ?
                    " notify"
                    : ""}`
                }
              >
                {room.name}
              </button>
            )
          }):""
          }
        </div>
      </div>
    </div>
  );
}

export default Nav
