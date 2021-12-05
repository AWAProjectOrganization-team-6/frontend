import react from 'react';
// import styles from '../styles/PayPal.module.scss';
import { Component } from 'react';

const styles = {
    paypalInput: {
        width: '8rem',
        height: '1.4rem',
        borderRadius: '256px',
        border: 'none',
        background: '#c4c4c4',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
        margin: '0.6875rem',
        fontSize: '1.25rem'
    }
};

class Paypal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            saveInfo: false
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        switch (event.target.name) {
            case 'pp_nickname':
                this.setState({login: event.target.value});
                break;
            case 'pp_password':
                this.setState({password: event.target.value});
                break;
            case 'pp_save_info':
                this.setState({saveInfo: event.target.checked});
                break;
        }
    }

    render() {
        return (
            <>
                <div>
                    <input 
                        type='text' 
                        style={styles.paypalInput}
                        placeholder='Login'
                        name='pp_nickname'
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <input 
                        type='password' 
                        style={styles.paypalInput}
                        placeholder='Password'
                        name='pp_password'
                        onChange={this.onChange}
                    />
                </div>
                <div hidden = {this.props.hideSaveInfo | false}>
                    <input 
                        type='checkbox'
                        name='pp_save_info'
                        checked={this.state.saveInfo}
                        onChange={this.onChange}
                    /> Save billing information 
                </div>
            </>
        );
    }
}

export default Paypal;