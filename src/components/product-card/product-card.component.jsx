import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector.js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action.js";
import {
    ProductCardContainer,
    Name,
    Price,
    Footer,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                onClick={addProductToCart}
                buttonType={BUTTON_TYPE_CLASSES.inverted}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
