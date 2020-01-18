import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './header.component.scss';

/** Renders header component */
export default function HeaderComponent() {
	return (
		<header className="header-main">
			<a href="/" className="logo">
				<div className="text">HN</div>
			</a>
			<h1>New Stories</h1>
			<nav className="nav-main">
				<ul className="list-nav">
					<li className="item-nav">
						<NavLink to="/" exact activeClassName="mod-active">
							New
						</NavLink>
					</li>
					<li className="item-nav">
						<NavLink to="/top" exact activeClassName="mod-active">
							Top
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
