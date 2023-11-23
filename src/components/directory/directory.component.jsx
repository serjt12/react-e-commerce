import PropTypes from 'prop-types';

import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss';

const Directory = ({ categories }) => { 
  return (
    <div className="directory-container">
        { categories.map(({id, title, imageUrl}) => (
          <CategoryItem key={id} title={title} imageUrl={imageUrl} />
        ))}
      </div>
  )
};

export default Directory;

Directory.propTypes = {
  categories: PropTypes.array.isRequired,
};
