import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/userContext";
import chat from "material-ui/svg-icons/communication/chat";

function AddUserForm({ chatRoom }){

  const { user } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [members, setMembers] = useState([]);

  function clickAddHandler(event) {
    event.preventDefault();
    
    let newUser = {
      user: event.target.id,
      role: "Roller"
    }
    
    console.log(chatRoom);
    chatRoom.chatRoom.members.push(newUser);
    API.addChatroomMember(chatRoom.chatRoom._id, newUser)
      .then(data => console.log("Added member to chatroom " + chatRoom.chatRoom._id, data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    API.getUsers()
      .then(data => {
        setAllUsers(data.data);
      })
      .catch(err => console.error(err))
  })

  let x = -1;
  // console.log(allUsers, user, chatRoom);
  return(
      <div className="modal-content">
        <h4>Add Users</h4>
        <div className="users-field col s6" style={{height: "80%", overflow: "auto"}}>
          <ul>
            {allUsers.map(currentUser => {
                if ((!chatRoom.chatRoom.members.find(item => item.user === currentUser._id))) {
                  x++;

                  return (
                    <p>
                      {currentUser.username} 
                      <a id={currentUser._id} className="btn-small waves-effect waves-red right" onClick={clickAddHandler} key={x}>
                        +
                      </a>
                    </p>
                  )
                }
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-red btn">
            Cancel
          </a>
        </div>
    </div>
  )
}

export default AddUserForm;