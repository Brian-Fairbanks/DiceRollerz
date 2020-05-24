import React, {
    Component
} from 'react'

export class User extends Component {
    sate = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        occupatoin: '',
        city: '',
        bio: ''
    }
}

nextStep = () => {
    const {
        step
    } = this.state;
    this.setState({
        step: step + 1
    })
}

prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    });
}