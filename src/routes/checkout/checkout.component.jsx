import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    selectCartItems,
    selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
    CartEmptyContainer,
    EmptyMessage,
} from "./checkout.styles";
import Button, {
    BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";

const CartEmpty = () => {
    const navigate = useNavigate();
    const goToShopHandler = () => {
        navigate("/shop");
    };
    return (
        <CartEmptyContainer>
            <div className="cart-empty-image">
                <img
                    src="https://i.ibb.co/qMQ75QZ/empty-cart.png"
                    alt="empty-cart"
                />
            </div>
            <div className="cart-empty-message">
                <EmptyMessage>Your cart is empty</EmptyMessage>
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    onClick={goToShopHandler}
                >
                    Go to the Shop
                </Button>
            </div>
        </CartEmptyContainer>
    );
};

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.length ? (
                cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))
            ) : (
                <CartEmpty />
            )}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;
