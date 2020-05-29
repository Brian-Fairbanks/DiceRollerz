import React, {Component} from 'react';

class inputField extends Component {
    render() {
        return (
            <div className="inputField white-text">
                <input
                className='input white-text'
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e) => this.props.onChange(e.target.value)}>
                </input>
            </div>
        );
    }
}
export default inputField