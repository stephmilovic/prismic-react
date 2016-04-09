import React, { PropTypes } from 'react';
import styles from './button.scss';

export const Button = (props) =>
  <button type={props.type} className={styles[props.cbStyle]}>{props.label}</button>;

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  label: PropTypes.string,
  cbStyle: PropTypes.oneOf(['major', 'minor', 'submit']).isRequired,
  children: PropTypes.node
};
