import react from 'react';
import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import { Component } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import DebitCard from '../components/DebitCard';

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
                paymentOption: '',
                paymentDetails: {
                    
                }
            }
        };

        this.onChange = this.onChange.bind(this);
        this.paymentDetails = react.createRef();
        this.handleConfirm = this.handleConfirm.bind(this);

        // Access child state 
        // this.paymentDetails.current.state;
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
                if (event.target.value === 'Debit card') {
                    accountData.paymentOption = 1;
                } 
                console.log(event.target.value);
                break;
        }

        this.setState({ accountData });
        // console.log(this.state);
    }

    handleConfirm() {
        console.log(this.paymentDetails.current.state);
    }

    render() {
        let paymentOptionField = (
            <></>
        );

        switch (this.state.accountData.paymentOption) {
            case 1:
                paymentOptionField = (<DebitCard ref={this.paymentDetails} hideSaveInfo={true}/>);
                break;
            default:
                break;
            }

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
                                type='email' 
                                onChange={this.onChange}
                            />
                        </div>
                        <div className = { styles.buttons }>
                            <button className = { styles.cancelButton }>Cancel</button>
                            <button className = { styles.confirmButton } onClick={this.handleConfirm}>Confirm</button>
                        </div>
                    </div>
                    <div className = { styles.paymentSystem}>
                        <select 
                            className = { styles.paymentSelector } 
                            onChange={this.onChange}
                            name= 'paymentOption'
                        >   
                            <option default hidden>Select payment option</option>
                            <option>Debit card</option>
                        </select>
                        <div>
                            {paymentOptionField}
                        </div>
                    </div>  
                </div>
                <Footer/>
            </>
        );
    }
}

export default AccountInfo;