import React from "react";

function Message({body, deleted, updated, sender, yours, id,  getMsg, time}){
  return(
    <div className={"col s12"} onClick={() => getMsg(body, id)}>
      <div>{time}</div>
      <div className={`col s10 push-s1 ${yours?"right-align red":"left-align teal"}`}>
        {
          deleted? "Message has been deleted":
            `${body} ${updated?"  (Updated)":""}`}
            {/*yours? <i className="far fa-edit"></i> :""*/}
      </div>
    </div>
  )
}

export default Message;