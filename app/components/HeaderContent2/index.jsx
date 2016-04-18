import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styles from './headercontent';

export default class HeaderContent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.scrollTop();
	}

	scrollTop() {
		const targetElement = document.querySelector('.nav');
		let scrollTop;
		const targetOffsetTop = targetElement.getBoundingClientRect().top;
		window.addEventListener('scroll', () => {
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop >= targetOffsetTop) {
				const content = document.querySelector('#main');
				//content.style['margin-top'] = (content.offsetTop + 1) - window.pageYOffset + 'px';
				Object.assign(targetElement.style, {
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%'
				});
			} else {
				const content = document.querySelector('#main');
				content.style['margin-top'] = '';
				Object.assign(targetElement.style, {
					position: 'static'
				});
			}


			const sections = document.querySelectorAll('.wedSection');
			Array.from(sections).forEach((section) => {
				if (scrollTop > section.getBoundingClientRect().top && scrollTop <= section.getBoundingClientRect().top + section.clientHeight) {
					console.log('yes ', section);
					Array.from(section.classList).forEach((sectionClass) => {		
						if (!sectionClass === 'wedSection') {
							console.log(sectionClass);
						}
					});
					// const id = $(this).attr('id');
					// $('a[href="#' + id + '"]').addClass('active');
				} else {
					console.log('no ', section);
					// const id = $(this).attr('id');
					// $('a[href="#' + id + '"]').removeClass('active');
				}
			});

			// $(section).each(function() {
			// 	if (st > $(this).offset().top && st <= $(this).offset().top + $(this).height()) {           
			// 		const id = $(this).attr('id');
			// 		$('a[href="#' + id + '"]').addClass('active');
			// 	} else {
			// 		const id = $(this).attr('id');
			// 		$('a[href="#' + id + '"]').removeClass('active');
			// 	}
			// });

		}, false);
	}
	render() {
		return (
			<div className="nav">
				<Col xs={12} className={styles.bordered}>
					<Row center="xs">
						<Col xs={6} className={styles.navContainer}>
							<ul className={styles.navigation}>
								<li><a href="intro">SHE & SHE</a></li>
								<li><a href="proposal">PROPOSAL</a></li>
								<li><a>RSVP</a></li>
								<li><a>WEDDING DETAILS</a></li>
								<li><a>REGISTRY</a></li>
							</ul>
						</Col>
					</Row>
				</Col>
			</div>
		);
	}
}

HeaderContent.propTypes = {
	children: PropTypes.node
};

