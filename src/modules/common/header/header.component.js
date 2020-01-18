import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './header.component.scss';

/** Renders header component */
export default function HeaderComponent() {
	return (
		<header className="header-main">
			<a href="/" className="logo">
				<div className="text">
					<span className="brackets">[</span>HN
					<span className="brackets">]</span>
				</div>
			</a>
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
					<li className="item-nav">
						<NavLink to="/saved" exact activeClassName="mod-active">
							Saved
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
