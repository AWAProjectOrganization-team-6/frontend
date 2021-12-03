import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import { Component } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountData: {
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: '',
                paymentOption: {
                    
                }
            }
        };

        // this.paymentSelector = this.paymentSelector.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let accountData = { ...this.state.accountData };

        switch (event.target.name) {
            case 'firstName':
                accountData.firstName = event.target.value;
                break;
            case 'lastName':
                accountData.lastName = event.target.value;
                break;
            case 'address':
                accountData.address = event.target.value;
                break;
            case 'phoneNumber':
                accountData.phoneNumber = event.target.value;
                break;
            case 'email':
                accountData.email = event.target.value;
                break;
            case 'paymentOption':
                this.setState({ paymentOption: event.target.value });
                break;
        }

        this.setState({ accountData });
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Topbar/>
                <div className = {cx(styles.infoField, styles.font)}>
                    <div>
                        <div className = { styles.title }>Account Information</div>
                        <div className = { styles.infoBoxes }>
                            <input 
                                className = { styles.inputs } 
                                name='firstName' 
                                placeholder='First name' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='lastName' 
                                placeholder='Last name' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='address' 
                                placeholder='Address' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='phoneNumber' 
                                placeholder='Phone number' 
                                type='text' 
                                onChange={this.onChange}/>
                            <input 
                                className = { styles.inputs } 
                                name='email' 
                                placeholder='Email' 
                                type='text' 
                                onChange={this.onChange}
                            />
                        </div>
                        <div className = { styles.buttons }>
                            <button className = { styles.cancelButton }>Cancel</button>
                            <button className = { styles.confirmButton }>Confirm</button>
                        </div>
                    </div>
                    <div className = { styles.paymentSystem}>
                        <div className = { styles.paymentSelector }>Select payment option</div>
                        <div className = { styles.paymentOptionField}>
                            <div className = { styles.paymentOption }>Debit card</div>
                            <div className = { styles.paymentOption }>PayPal</div>
                        </div>
                    </div>  
                </div>
                <Footer/>
            </>
        );
    }
}

export default AccountInfo;