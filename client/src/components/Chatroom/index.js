import React,{useState, useEffect, useContext} from "react";
import VisibilitySensor from 'react-visibility-sensor';
import moment from "moment";
import Message from "../Message";
import userContext from "../../utils/userContext"
import useDebounce from "../../utils/debounce";

// Scroll to bottom NPM package, to set a sticky scroller and keep the messages at the most recent.
import ScrollToBottom, { useSticky } from 'react-scroll-to-bottom';
import API from "../../utils/API";

function Chatroom(props){
  // Deconstruct UserContext
  const {user, setUser} = useContext(userContext);
  // Deconstruct props.
  const {currentChatroom, getEditMessage} = props;

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

  // dont bother checking against anything older than the last message the user saw
  const [userLastMessage, setUserLastMessage] = useState("");

  useEffect(()=>{
    if(currentChatroom.chatroom._id){
      const userChatRoom = user.seenMessages.find(rooms => rooms.room === currentChatroom.chatroom._id)
      const timeStamp = userChatRoom?userChatRoom.timeStamp:'1969-12-31T18:00:00.00Z';
      setUserLastMessage(timeStamp)
    }
  },[currentChatroom])

  // Checking if any messages in view are newer than the last one seen.
  function onChange (isVisible, id, timestamp, room, userID) {
      if (isVisible && (!recent.message || timestamp > recent.timestamp || room!= recent.room)){
        setRecent({message:id, timestamp:timestamp, room:room, user:userID})
      }
  }
  
  // send user last seen data to server
  const debouncedRecent = useDebounce(recent, 100);

  useEffect(() => {
    if (!debouncedRecent) {
      return;
    }
    if (debouncedRecent) {
      //console.log("Sending Data Now - ", recent);
      API.seenMessage(recent)
      .then(async (data) => {
        console.log(data);
        const userData = await API.getUser(user._id)
        //console.log(userData.data.seenMessages);
        setUser({...user, seenMessages:userData.data.seenMessages});
        // Let all other users know where you have seen
        API.socketRoom("Set Message Seen");
        API.socketMsg({room:recent.room, body:"Set Message Seen"});
        console.log("set User all done!");
      })
    }
  }, [debouncedRecent]);

  /* Chatroom Render Display
  ================================ */
  return (
    <ScrollToBottom className="flex-scroll-container row overflow-scroll ">
    {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
      return (
        <div className="message-wrapper" key={post._id+1}>
          {printDate(post.timestamp)}
          <VisibilitySensor 
            key={post._id}
            active={post.timestamp > userLastMessage}
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