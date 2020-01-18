import * as React from 'react';
import './header.component.scss';
import iconUser from '../../../assets/icons/user.svg';

/** Renders header component */
export default function HeaderComponent() {
	return (
		<header className="header-main">
			<a href="/" className="logo">
				<div className="text">HN</div>
			</a>
			<h1>New Stories</h1>
			<img src={iconUser} className="icon-user" alt="login" />
		</header>
	);
}
