import React from 'react';
import './profile.css';
import { Avatar, AvatarWPic } from '../components/Avatar';

function App() {
  return (
    <div className="App">
      <Avatar>
        <AvatarWPic
            imagePath="https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"
            imageHeight="50px"
            altText="Red Dot"
            title="HAL 9000"
            text={["I'm sorry, Dave", "I'm afraid I can't do that."]}
            href="#"
            key="1"
        />
      </Avatar>
    </div>
  );
}

export default App;
