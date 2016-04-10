import React, { PropTypes } from 'react';
import styles from './headercontent';

const HeaderContent = () =>
	<ul className={styles.navigation}>
		<li>Sarah + Steph</li>
		<li>RSVP</li>
		<li>Gallery</li>
		<li>Our Story</li>
		<li>Festivities</li>
		<li>Wedding Party</li>
		<li>Hotel</li>
		<li>Registry</li>
	</ul>;

HeaderContent.propTypes = {
	children: PropTypes.node
};

export default HeaderContent;
