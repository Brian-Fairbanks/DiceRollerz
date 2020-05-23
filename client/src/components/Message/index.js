import React from "react";

function Message({body, deleted, updated, sender, yours}){
  return(
    <div className={"col s12"}>
      <div className={`col s6 push-s3 ${yours?"right-align red":"left-align teal"}`}>
        {
          deleted? "Message has been deleted":
            `${body} ${updated?"  (Updated)":""}`}
      </div>
    </div>
  )
}

export default Message;