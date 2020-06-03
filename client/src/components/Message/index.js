import React from "react";
import moment from 'moment'
import "./styles.css";


function Message({ members, body, deleted, updated, sender, yours, id, getMsg, time, toGroup}) {

  const thisUser = members ? members.find(member => member.user === sender):"";
  const userImage = thisUser?thisUser.image : "";
  const userName = thisUser?thisUser.username : "";
  return (
    <div className={"col s12 white-text"} onClick={() => getMsg(body, id, sender)}>
      <div className ="col s11 offset-s1 left-align valign-wrapper">
        {toGroup?"":<div className="user-name"> {userName} </div>}
      </div>
      <div className="col s1 avatarWrapper">
      {userImage && !toGroup?
          <img src={userImage} alt={userName+"-avatar"} className="circle avatar avatar-glow"></img> 
        :
        ""
      }
      </div>
      <div className={`message col s10 left-align ${toGroup?" grouped ":""}${yours ? "red" : "teal"} ${deleted ? "fade" : ""}`}>
        {
          deleted ? "":
            <div>{time} {body} {updated ? <span className="edit">(edited)</span> : ""} </div> }
        {/*yours? <i className="far fa-edit"></i> :""*/}
      </div>
    </div>
  )
}

export default Message;