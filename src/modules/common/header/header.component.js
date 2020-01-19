import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './header.component.scss';

/** Renders header component */
export default function HeaderComponent() {
	return (
		<header className="header-main">
			<div className="container">
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
							<NavLink to="/ask" exact activeClassName="mod-active">
								Ask
							</NavLink>
						</li>
						<li className="item-nav">
							<NavLink to="/show" exact activeClassName="mod-active">
								Show
							</NavLink>
						</li>
						<li className="item-nav">
							<NavLink to="/jobs" exact activeClassName="mod-active">
								Jobs
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
