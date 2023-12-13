import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ imageUrl, title, route }) => {
    const imageurl = imageUrl;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        navigate(route);
    }

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageurl={imageurl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;

DirectoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};
