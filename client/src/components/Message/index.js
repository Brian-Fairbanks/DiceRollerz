import React from "react";
import "./styles.css";


function Message({ visible, members, body, deleted, updated, sender, yours, id, getMsg, time, toGroup, command}) {

  const thisUser = members ? members.find(member => member.user === sender):"";
  const userImage = thisUser?thisUser.image : "";
  const userName = thisUser?thisUser.username : "";

  //Create markup for command responses
  function createMarkup() {
    return {__html: command};
  }

  return (
    <div className={visible?"col s12 white-text fade":"col s12 white-text"} onClick={() => getMsg(body, id, sender)}>
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
            <div>
              {time} 
              {body} 
              {command? <div className="command" dangerouslySetInnerHTML={createMarkup()}></div> : ""}
              {updated ? <span className="edit">(edited)</span> : ""}
            </div> }
        {/*yours? <i className="far fa-edit"></i> :""*/}
      </div>
      <div className="seen-container col offset-s1 s10">
          {members.map(member => member.lastSeen==id?
              (<div key={member._id} className="seen-member"><img className="seen-avatar" src={member.image}></img>{member.username}</div>)
              :
              ""
          )}
      </div>
    </div>
  )
}

export default Message;