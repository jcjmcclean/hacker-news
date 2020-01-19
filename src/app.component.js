import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.component.scss';
import HeaderComponent from './modules/common/header/header.component';
import PostsListComponent from './modules/posts/posts-list.component';

export default function AppComponent() {
	return (
		<Router>
			<HeaderComponent />
			<div className="wrapper">
				<Switch>
					<Route exact path="/">
						<PostsListComponent mode="new" />
					</Route>
					<Route exact path="/top">
						<PostsListComponent mode="top" />
					</Route>
					<Route exact path="/ask">
						<PostsListComponent mode="ask" />
					</Route>
					<Route exact path="/show">
						<PostsListComponent mode="show" />
					</Route>
					<Route exact path="/jobs">
						<PostsListComponent mode="job" />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
