import react from 'react';
import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import { Component } from 'react';
import DebitCard from '../components/DebitCard';
import { APIAddress } from '../config.json';
import axios from 'axios';
import { Link } from 'react-router-dom';


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

    componentDidMount() {
        axios.get(APIAddress + 'account').then((res) => {
            console.log(res);
        });
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
        let paymentOptionField = null;

        switch (this.state.accountData.paymentOption) {
            case 1:
                paymentOptionField = (<DebitCard ref={this.paymentDetails} hideSaveInfo={true}/>);
                break;
            default:
                break;
            }

        return (
            <>
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
                            <Link to="/" className = { styles.cancelButton }>Cancel</Link>
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
            </>
        );
    }
}

export default AccountInfo;