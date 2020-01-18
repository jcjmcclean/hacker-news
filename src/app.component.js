import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderComponent from './modules/common/header/header.component';
import PostsListComponent from './modules/posts/posts-list.component';

export default function AppComponent() {
	return (
		<Router>
			<HeaderComponent />
			<Switch>
				<Route exact path="/">
					<PostsListComponent mode="new" />
				</Route>
				<Route exact path="/top">
					<PostsListComponent mode="top" />
				</Route>
			</Switch>
		</Router>
	);
}
