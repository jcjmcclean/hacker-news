import * as React from 'react';
import './header.component.scss';
import { ReactComponent as IconUser } from '../../../assets/icons/user.svg';

/** Renders header component */
export default function HeaderComponent() {
	return (
		<header className="header-main">
			<a href="/" className="logo">
				<div className="text">HN</div>
			</a>
			<h1>New Stories</h1>
			<div className="icon-user">
				<IconUser />
			</div>
		</header>
	);
}
