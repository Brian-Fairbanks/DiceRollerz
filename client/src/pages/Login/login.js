import React, { Component } from 'react';
import UserStore from '../../stores/userStore';
import LoginForm from './loginForm';
import SubmitButton from './submitButton';
//import '../../App.css';
import { observer } from 'mobx-react';
import './login.css';



class Login extends Component {
    //API call goes here

    async componentDidMount() {

        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
                console.log("Login Suceeded")
            }

            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;

            }
        }

        catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
        //Note: Might need to add more validation to ensure user is actually logged in.
    }

    async doLogout() {

        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.username = '';

            }

        }

        catch (e) {
            console.log(e)
        }
    }

    render() {

        if (UserStore.loading) {
            return (
                <div className="login">
                    <div className="container">
                        Loading your dungeon . . .
                    </div>
                </div>
            );
        }

        else {
            if (UserStore.isLoggedIn) {
                return (
                    <div className="login">
                        <div className="container">
                            Welcome to the party {UserStore.username}!

                            <SubmitButton
                                text={'Log Out'}
                                disabled={false}
                                onClick={() => this.doLogout()}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div className="login">
                    <div className="container">
                       
                        <LoginForm></LoginForm>
                    </div>

                </div>
            );
        }
    }
}
export default observer(Login);