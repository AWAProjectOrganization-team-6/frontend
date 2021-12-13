import styles from '../styles/DebitCard.module.scss';
import { Component } from 'react';

class DebitCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            city: '',
            billingAddress: '',
            postcode: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            saveInfo: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        switch (event.target.name) {
            case 'dc_first_name':
                this.setState({ firstName: event.target.value });
                break;
            case 'dc_last_name':
                this.setState({ lastName: event.target.value });
                break;
            case 'dc_city':
                this.setState({ city: event.target.value });
                break;
            case 'dc_billing_address':
                this.setState({ billingAddress: event.target.value });
                break;
            case 'dc_postcode':
                this.setState({ postcode: event.target.value });
                break;
            case 'dc_card_number':
                this.setState({ cardNumber: event.target.value });
                break;
            case 'dc_expiration_date':
                this.setState({ expirationDate: event.target.value });
                break;
            case 'dc_cvv':
                this.setState({ cvv: event.target.value });
                break;
            case 'dc_save_info':
                this.setState({ saveInfo: event.target.checked });
                break;
        }
    }

    render() {
        return (
            <>
                <div className={styles.rows}>
                    <input type="text" className={styles.mediumPaymentInput} placeholder="First Name" name="dc_first_name" onChange={this.onChange} />
                    <input type="text" className={styles.mediumPaymentInput} placeholder="Last Name" name="dc_last_name" onChange={this.onChange} />
                    <input type="text" className={styles.mediumPaymentInput} placeholder="City" name="dc_city" onChange={this.onChange} />
                </div>
                <div className={styles.rows}>
                    <input type="text" className={styles.longPaymentInput} placeholder="Billing Address" name="dc_billing_address" onChange={this.onChange} />
                    <input type="text" className={styles.mediumPaymentInput} placeholder="Postcode" name="dc_postcode" onChange={this.onChange} />
                </div>
                <div className={styles.rows}>
                    <input
                        type="text"
                        className={styles.longPaymentInput}
                        placeholder="Card Number"
                        maxLength="16"
                        name="dc_card_number"
                        onChange={this.onChange}
                    />
                    <input type="text" className={styles.exDateCvv} placeholder="xx/xx" maxLength="5" name="dc_expiration_date" onChange={this.onChange} />
                    <input type="password" className={styles.exDateCvv} placeholder="CVV" maxLength="3" name="dc_cvv" onChange={this.onChange} />
                </div>
                <div className={styles.checkbox} hidden={this.props.hideSaveInfo | false}>
                    <input type="checkbox" name="dc_save_info" checked={this.state.saveInfo} onChange={this.onChange} /> Save billing information
                </div>
            </>
        );
    }
}

export default DebitCard;
