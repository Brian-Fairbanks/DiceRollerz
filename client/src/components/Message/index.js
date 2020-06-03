import React from "react";
import moment from 'moment'
import "./styles.css";


function Message({ members, body, deleted, updated, sender, yours, id, getMsg, time }) {

  const thisUser = members ? members.find(member => member.user === sender):"";
  const userImage = thisUser?thisUser.image : "";
  const userName = thisUser?thisUser.username : "";
  return (
    <div className={"col s12 white-text"} onClick={() => getMsg(body, id, sender)}>
      <div className ="col s11 offset-s1 left-align valign-wrapper">
        <div className="user-name">{userName}</div>
        <div className="timestamp">{moment(time).format('h:mm:ss a')}</div>
      </div>
      <div className={`col s1 right-align valign-wrapper`}>
      {userImage?
          <img src={userImage} alt="avatar image" className="circle right" height="32" width="32"></img> 
          :
          ""
        }
      </div>
      <div className={`message col s10 left-align ${yours ? "red" : "teal"} ${deleted ? "fade" : ""}`}>
        {
          deleted ? "" :
            <div>{body} {updated ? <span className="edit">(edited)</span> : ""} </div>}
        {/*yours? <i className="far fa-edit"></i> :""*/}
      </div>
    </div>
  )
}

export default Message;