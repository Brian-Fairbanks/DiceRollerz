import React, {Component} from 'react';
import InputField from './inputField'
import SubmitButton from './submitButton';
import UserStore from '../../stores/userStore';



class loginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            //Disable button while login checks if username and password are correct to prevent double requests to API
            buttonDisabled: false
        }
    }

    //Removing spaces and setting max length to 15 characters for user and pass
    //Remove line 23 if we want to allow spaces in signup
    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 15) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    //Method to reset form if user/pass combination is incorrect
    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin() {
        if (!this.state.username){
            return;
        }
        if (!this.state.password){
            return;
        }    

        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //Sends user and pass input to API to check against our database for a match
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password


                })
            });

            let result = await res.json();
            if (result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            
            }
            //If user/pass does not match reset form and send alert to user
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }

        //If there is an error passing info to API log error to console and reset the form
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <div className="loginForm white-text">
                Log In
                <InputField
                    type='text'
                    placeholder='Username'
                    value={this.state.username ? this.state.username : ''}
                    onChange={(val) => this.setInputValue('username', val)}>
                </InputField>

                <InputField
                    type='password'
                    placeholder='Password'
                    value={this.state.password ? this.state.password : ''}
                    onChange={(val) => this.setInputValue('password', val)}>
                </InputField>

                <SubmitButton
                    text='Login'
                    disabled={this.state.buttonDisabled}
                    onClick={() => this.doLogin()}
                    >

                </SubmitButton>
                
            </div>
        );
    }
}
export default loginForm
