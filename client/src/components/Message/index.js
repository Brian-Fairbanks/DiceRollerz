import React from "react";

function Message({body, deleted, updated, sender, yours, id,  getMsg, time}){
  return(
    <div className={"col s12 white-text"} onClick={() => getMsg(body, id)}>
      <div>{time}</div>
      <div className={`message col s10 push-s1 left-align ${yours?"red":"teal"} ${deleted? "fade":""}`}>
        {
          deleted? "":
            `${body} ${updated?"  (Updated)":""}`}
            {/*yours? <i className="far fa-edit"></i> :""*/}
      </div>
    </div>
  )
}

export default Message;