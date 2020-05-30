import React,{useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import userContext from '../../utils/userContext';

function Authenticate(){
  const {user} = useContext(userContext);
  const [isAuth, setIsAuth] = useState(false);
  useEffect( ()=>{
    setIsAuth(user._id?true:false);
  },[])

  return(
    <div>
          {isAuth? "" : <Redirect to="/login" />}
    </div>
    )
};

export default Authenticate;