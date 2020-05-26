import React from 'react';
import './profile.css';
import { Avatar, AvatarWPic } from '../components/Avatar';
import { Input, InputWIcon } from '../components/Input';
import { Textarea, TextareaWIcon } from '../components/TextArea';

function Profile(userId) {
  const [user, setUser ] = useState({_id:"", firstName:"", lastName:"", userName:"", email:"", description: ""})
  // handle setting user after login or signup!
  
  // this here is only temporary !!! -------------
  useEffect(() => {
    API.getUser(userId)
    .then(result => {
      console.log(result);
      setUser(result.data);
    })
    .catch(err => { console.error(err) });
  }, [])
  //  this here is only temporary !!! -------------


  return (
    <div className="App">
      <div className="row">
        <div className="col s12">
          <form className="container">
            
            <Avatar>
                <AvatarWPic
                    imagePath="https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"
                    imageHeight="100px"
                    altText="Red Dot"
                    title="HAL 9000"
                    text={["I'm sorry, Dave", "I'm afraid I can't do that."]}
                    href="#"
                />
            </Avatar>
              
            <InputWIcon
                id="user-name"
                name="userName"
                icon="person"
                label="User Name"
                placeholder="User Name"
                type="text"
                value={user.userName}
              />
              <InputWIcon
                id="first-name"
                name="firstName"
                icon=""
                label="First Name"
                placeholder="First Name"
                type="text"
                value={user.firstName}
              />
              <InputWIcon
                id="last-name"
                name="lastName"
                icon=""
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={user.lastName}
              />
              <InputWIcon
                id="email"
                name="email"
                icon="email"
                label="Email"
                placeholder="Email"
                type="text"
                value={user.email}
              />
              <TextareaWIcon
                id="description"
                name="desc"
                icon=""
                label="About Me"
                value={user.description}
              />
              
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
