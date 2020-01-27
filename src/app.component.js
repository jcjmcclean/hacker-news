import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.component.scss';
import HeaderComponent from './modules/common/header/header.component';
import FeedPage from './modules/feed/feed.page';

export default function AppComponent() {
	return (
		<Router>
			<HeaderComponent />
			<div className="wrapper">
				<Switch>
					<Route exact path="/">
						<FeedPage mode="new" />
					</Route>
					<Route exact path="/top">
						<FeedPage mode="top" />
					</Route>
					<Route exact path="/ask">
						<FeedPage mode="ask" />
					</Route>
					<Route exact path="/show">
						<FeedPage mode="show" />
					</Route>
					<Route exact path="/jobs">
						<FeedPage mode="job" />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
