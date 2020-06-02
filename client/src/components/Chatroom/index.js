import React from "react";
import Message from "../../components/Message";

// Scroll to bottom NPM package, to set a sticky scroller and keep the messages at the most recent.
import ScrollToBottom, { useSticky } from 'react-scroll-to-bottom';

function Chatroom(props){
  // Deconstruct props.
  const {currentChatroom, user, getEditMessage, printDate} = props;

  // sticky scrollbar settigns
  const [sticky] = useSticky();

  return (
    <ScrollToBottom className="posts row m-auto overflow-scroll ">
    {"posts" in currentChatroom ?currentChatroom.posts.map(post => {
      return (
        <div>
          {printDate(post.timestamp)}
          <Message
            members={currentChatroom.chatroom.members}
            key={post._id}
            deleted={post.deleted}
            updated={post.updated}
            body={post.body}
            sender={post.sender}
            yours={post.sender === user._id}
            id = {post._id}
            getMsg={getEditMessage}
            time={post.timestamp}
          />
        </div>
      )
    }):"No Messages"}
    {!sticky}     
  </ScrollToBottom>
  )
}

export default Chatroom