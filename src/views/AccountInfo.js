import react from 'react';
import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import { Component } from 'react';
import DebitCard from '../components/DebitCard';
import { APIAddress } from '../config.json';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useState } from 'react';

// const {id} = useParams();
// const userId = id;
// const [user, setUser] = useState({});

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountData: {
                userName: '',
                firstName: '',
                lastName: '',
                address: {
                    
                },
                phoneNumber: '',
                email: '',
                password: '',
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
        axios.get(APIAddress + 'users/@me', {
                    headers: { authorization: 'bearer ' + this.props.token },
                }).then((res) => {
                    // console.log(res);
                    this.setState({
                        userName: res.data.username,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        phoneNumber: res.data.phone,
                        email: res.data.email
                    })
                });

        axios.get(APIAddress + 'users/@me/address', {
            headers: { authorization: 'bearer ' + this.props.token },
        }).then((res) => {
            console.log(res);
            this.setState({
                ...this.state.address,
                street_address: res.data[0].street_address,
                city: res.data[0].city,
                postcode: res.data[0].postcode
            })
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
        console.log(this.props.token);
        axios.put(APIAddress + 'users/@me', {
            headers: { authorization: 'bearer ' + this.props.token },
        }).then((res) => {
            // console.log(res);
            this.setState({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                phoneNumber: res.data.phone,
                email: res.data.email,
                password: res.data.password
            })
        });
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
                                name='userName' 
                                placeholder='Username' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.userName}
                                readOnly
                            />
                            <input 
                                className = { styles.inputs } 
                                name='firstName' 
                                placeholder='First name' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.firstName}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='lastName' 
                                placeholder='Last name' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.lastName}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='street' 
                                placeholder='Street' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.street_address}
                                readOnly
                            />
                            <input 
                                className = { styles.inputs } 
                                name='city' 
                                placeholder='City' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.city}
                                readOnly
                            />
                            <input 
                                className = { styles.inputs } 
                                name='postcode' 
                                placeholder='Postcode' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.postcode}
                                readOnly
                            />
                            <input 
                                className = { styles.inputs } 
                                name='phoneNumber' 
                                placeholder='Phone number' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.phoneNumber}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='email' 
                                placeholder='Email' 
                                type='email' 
                                onChange={this.onChange}
                                defaultValue={this.state.email}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='password' 
                                placeholder='New password' 
                                type='text' 
                                onChange={this.onChange}
                                defaultValue={this.state.password}
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