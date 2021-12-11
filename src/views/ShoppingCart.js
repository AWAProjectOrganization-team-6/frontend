import styles from '../styles/ShoppingCartView.module.scss';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';
import { APIAddress } from '../config.json';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import CheckBox from '../components/CheckBox';

const ShoppingCart = (props) => {
    /** @type {{cart: [], restaurantId: number: user: {}, token: string}} */
    const { cart, restaurantId, user, token } = props;
    const [restaurant, setRestaurant] = useState(undefined);
    const [userAddresses, setUserAddresses] = useState([]);
    const [userPaymentInfos, setUserPaymentInfos] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const fields = {
        fname: useRef(null),
        lname: useRef(null),
        address: useRef(null),
        city: useRef(null),
        postcode: useRef(null),
        cardNum: useRef(null),
        expirationDate: useRef(null),
        cvc: useRef(null),
        save: useRef(false),
    };

    let total = 0;
    cart.forEach((val) => {
        total += val.price * val.count;
    });

    /** @type {EventListener} */
    const sendData = (e) => {
        e.preventDefault();
        if (selectedAddress === null) return false;

        console.log(fields);
    };

    useEffect(async () => {
        try {
            const res = await axios.get(APIAddress + 'restaurant');
            setRestaurant(res.data.find((val) => val.restaurant_id === restaurantId));
        } catch (err) {
            if (err) console.log(err);
        }
    }, [restaurantId]);

    useEffect(async () => {
        try {
            const addressRes = await axios.get(APIAddress + 'users/@me/address', { headers: { authorization: `bearer ${token}` } });
            const paymentRes = await axios.get(APIAddress + 'users/@me/payment-info', { headers: { authorization: `bearer ${token}` } });
            setUserAddresses(addressRes.data);
            setUserPaymentInfos(paymentRes.data);
        } catch (err) {
            if (err) console.log(err);
        }
    }, [token]);

    const GridHeader = (props) => {
        return (
            <>
                <div className={props.className}>Product</div>
                <div className={props.className}>Count</div>
                <div className={props.className}>Price</div>
            </>
        );
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Shopping cart</div>
            <div className={styles.cart}>
                <div className={styles.title}>Restaurant: {restaurant?.name}</div>
                <div className={styles.productList}>
                    <GridHeader className={styles.header} />
                    {cart.map((item) => {
                        return <CartItem key={item.id} item={item} />;
                    })}
                </div>
                <div className={styles.total}>Total: {total}€</div>
                <select className={styles.deliveryAddress} defaultValue="NULL" name="addressSelection" onChange={(e) => setSelectedAddress(e.target.value)}>
                    <option value="NULL" hidden disabled>
                        Select delivery address
                    </option>
                    {userAddresses.map((val) => {
                        return (
                            <option value={val.address_id} key={val.address_id}>
                                {val.street_address}, {val.postcode}, {val.city}
                            </option>
                        );
                    })}
                    <option>Add address</option>
                </select>
                <button className={styles.button}>Delete order</button>
            </div>

            <div className={styles.paymentInfo}>
                <select className={styles.paymentSelection} defaultValue="NULL" name="paymentSelection" onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="NULL" hidden disabled>
                        Select payment method
                    </option>
                    <option value="CARD">Debit card</option>
                    <option value="PayPal">PayPal</option>
                    {userPaymentInfos.map((val) => {
                        return (
                            <option value={val.payment_information_id} key={val.payment_information_id}>
                                Card {val.card_num.substr(val.card_num.length - 4, 4).padStart(val.card_num.length, '*')}
                            </option>
                        );
                    })}
                </select>

                {paymentMethod === 'CARD' ? (
                    <form onSubmit={sendData} className={styles.infoGrid}>
                        <div className={styles.rows1to3}>
                            <input ref={fields.fname} name="firstName" placeholder="First name" autoComplete="given-name" required />
                            <input ref={fields.lname} name="lastName" placeholder="Last name" autoComplete="family-name" required />
                        </div>
                        <input ref={fields.address} name="address" placeholder="Street address" className={styles.span2to4} required />
                        <input ref={fields.city} name="city" placeholder="City" required />
                        <input ref={fields.postcode} name="zip" maxLength={5} placeholder="Postcode" required />
                        <input ref={fields.cardNum} maxLength={16} pattern="\d+" name="cardNumber" placeholder="Card number" className={styles.span1to3} required />
                        <div className={styles.inline}>
                            <input ref={fields.expirationDate} maxLength={5} pattern="\d{2}/\d{2}" name="expirationDate" placeholder="xx/xx" className={styles.inlineItem} required />
                            <input ref={fields.cvc} type="password" maxLength={3} name="cc-csc" placeholder="cvc" className={styles.inlineItem} required />
                        </div>
                        <button className={styles.button}>Confirm</button>
                        <div className={cx(styles.span2to4, styles.alignCenter)}>
                            <CheckBox getValue={(val) => (fields.save = val)} />
                        </div>
                    </form>
                ) : null}

                {paymentMethod === 'PayPal' ? <button className={styles.button}>Continue with PayPal</button> : null}

                {parseInt(paymentMethod) == paymentMethod ? <button className={styles.button}>Confirm</button> : null}
            </div>
        </div>
    );
};

ShoppingCart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            count: PropTypes.number,
            price: PropTypes.number,
        })
    ).isRequired,
    user: PropTypes.shape({
        user_id: PropTypes.number,
        type: PropTypes.oneOf(['ADMIN', 'USER', 'SUPER']),
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    restaurantId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
};

export default ShoppingCart;
