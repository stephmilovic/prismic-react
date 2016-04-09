import React from 'react';
import styles from './styles.scss';

export default class Container extends React.Component {
	render() {
		return (
			<div className={styles.page}>
				hello world
				<button className={styles.hello}>Hello</button>
			</div>
		);
	}
}
