import React from 'react';
import HeaderComponent from './modules/common/header/header.component';
import PostsListComponent from './modules/posts/posts-list.component';

export default function AppComponent() {
	return (
		<>
			<HeaderComponent />
			<PostsListComponent />
		</>
	);
}
