import React,{useState, useEffect} from "react";
import VisibilitySensor from 'react-visibility-sensor';
import moment from "moment";
import Message from "../Message";
import useDebounce from "../../utils/debounce";

// Scroll to bottom NPM package, to set a sticky scroller and keep the messages at the most recent.
import ScrollToBottom, { useSticky } from 'react-scroll-to-bottom';
import API from "../../utils/API";

function Chatroom(props){
  // Deconstruct props.
  const {currentChatroom, user, getEditMessage} = props;

  // sticky scrollbar settigns
  const [sticky] = useSticky();

  //Most Recent Message
  const [recent, setRecent] = useState({message:"", timestamp:"", room:""})

  
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
    if(lastSender!== sender || simpleStamp !== lastTime){
      lastSender = sender;
      lastTime = simpleStamp;
      return (<div className="timestamp">{simpleStamp}</div>);
    }
    return (<div className="timestamp"></div>);
  }


  /* User Seen Messages
  =========================================================*/

  // Checking Visibility on most recent messages
  function onChange (isVisible, id, timestamp, room, user) {
      if (isVisible && (!recent.message || timestamp > recent.timestamp || room!= recent.room)){
        setRecent({message:id, timestamp:timestamp, room:room, user:user})
      }
  }
  
  // send user last seen data to server
  const debouncedRecent = useDebounce(recent, 1500);

  useEffect(() => {
    if (!debouncedRecent) {
      return;
    }
    if (debouncedRecent) {
      console.log("Sending Data Now - ", recent);
      API.seenMessage(recent)
      .then(data => {
        console.log(data);
      })
    }
  }, [debouncedRecent]);

  /* Chatroom Render Display
  ================================ */
  return (
    <ScrollToBottom className="posts row m-auto overflow-scroll ">
    {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
      return (
        <div key={post._id+1}>
          {printDate(post.timestamp)}
          <VisibilitySensor 
            key={post._id}
            //active={post.timestamp >= recent.timestamp}
            onChange={(isVisible) => onChange(isVisible, post._id, post.timestamp, post.room, user._id)}
          >
            <Message
              toGroup={lastSender===post.sender}
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
          </VisibilitySensor>
        </div>
      )
    }):"No Messages"}
    {!sticky}     
  </ScrollToBottom>
  )
}

export default Chatroom