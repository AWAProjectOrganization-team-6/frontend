import PropTypes from 'prop-types';

const CartItem = (props) => {
    return (
        <>
            <div>{props.item.name}</div>
            <div>{props.item.count}x</div>
            <div>{props.item.count * props.item.price}€</div>
        </>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
    }),
};

export default CartItem;
