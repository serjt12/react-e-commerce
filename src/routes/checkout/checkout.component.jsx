import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";
import Button from "../../components/button/button.component";

const CartEmpty = () => {
  const navigate = useNavigate();
  const goToShopHandler = () => {
    navigate("/shop");
  };
    return (
        <div className="cart-empty-container">
            <div className="cart-empty-image">
                <img
                    src="https://i.ibb.co/qMQ75QZ/empty-cart.png"
                    alt="empty-cart"
                />
            </div>
            <div className="cart-empty-message">
                <span>Your cart is empty</span>
                <Button buttonType="inverted" onClick={goToShopHandler}>Go to the Shop</Button>
            </div>
        </div>
    );
}

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            { cartItems.length === 0 ? <span className="empty-cart-message"><CartEmpty /></span> : null }
            {
            cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
        <span className="total">TOTAL: $ {cartTotal}</span>
        </div>
    );
};

export default Checkout;
