import PropTypes from 'prop-types';

export const burgerDataPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

 export const orderDataPropsTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    number: PropTypes.number.isRequired
  }),
})

