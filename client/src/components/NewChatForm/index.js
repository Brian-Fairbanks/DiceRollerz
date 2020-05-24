import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/userContext";

function NewChatform(){

  const { user } = useContext(UserContext);

  const [newChatroom, setNewChatroom] = useState({
    name:"",
    members:[]
  });

  function handleNewChatroomForm(event){
    const {value} = event.target;
    setNewChatroom({...newChatroom, name: value})
  }

  function submitNewChat(){
    alert( JSON.stringify(newChatroom));
  }


  useEffect(() => {
    setNewChatroom( {...newChatroom, members: [{
      user: user._id,
      role:"DM"
    }]})
  }, [user])


  return(
    <div>
      <div className="modal-content">
      <h4>New Chatroom</h4>
      <form>
        
        <div class="input-field col s6">
          <input value={newChatroom.name} onChange={handleNewChatroomForm}id="chatName" type="text" class="validate" />
            <label class="active" for="chatName">Chatroom Name</label>
        </div>
        
      </form>
    </div>
      <div className="modal-footer">
        <a className="modal-close waves-effect waves-red btn">
          Cancel
        </a>
        <a className="modal-close waves-effect waves-green btn" onClick={submitNewChat}>
          Create
        </a>
      </div>
    </div>
  )
}

export default NewChatform;
