import React from "react";
import moment from "moment";
import Message from "../../components/Message";

// Scroll to bottom NPM package, to set a sticky scroller and keep the messages at the most recent.
import ScrollToBottom, { useSticky } from 'react-scroll-to-bottom';

function Chatroom(props){
  // Deconstruct props.
  const {currentChatroom, user, getEditMessage} = props;

  // sticky scrollbar settigns
  const [sticky] = useSticky();

  
  /* DateStamp Creation Logic
  ================================ */
  var lastDate="";


  function printDate(timestamp){
    let date = moment(timestamp).format('MMMM Do YYYY')
    if(date === lastDate){
      return "";
    }
    lastDate=date;
    //reset lastSender, so it shows properly on a new day
    lastSender = "";
    return (<span key={date} className="date-stamp">{date}</span>);
  }

  /* Username / TimeStamp Creation Logic
  ================================ */
  var lastSender = "";
  var lastTime = "";
  function printTime(timestamp, sender){
    const simpleStamp = moment(timestamp).format('h:mm A');
    if(lastSender!= sender || simpleStamp !== lastTime){
      lastSender = sender;
      lastTime = simpleStamp;
      return (<div className="timestamp">{simpleStamp}</div>);
    }
    return (<div className="timestamp"></div>);
  }


  /* Chatroom Render Display
  ================================ */
  return (
    <ScrollToBottom className="posts row m-auto overflow-scroll ">
    {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
      return (
        <div key={post._id+1}>
          {printDate(post.timestamp)}
          <Message
            toGroup={lastSender==post.sender}
            members={currentChatroom.chatroom.members}
            key={post._id}
            deleted={post.deleted}
            updated={post.updated}
            body={post.body}
            sender={post.sender}
            yours={post.sender === user._id}
            id = {post._id}
            getMsg={getEditMessage}
            time={printTime(post.timestamp, post.sender)}
            command={post.command?post.command:""}
            
          />
        </div>
      )
    }):"No Messages"}
    {!sticky}     
  </ScrollToBottom>
  )
}

export default Chatroom