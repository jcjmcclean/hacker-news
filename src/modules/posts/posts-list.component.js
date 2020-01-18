import React from 'react';
import './posts-list.component.scss';
import axios from 'axios';
import PostItemComponent from './post-item/post-item.component';

/** Renders posts list component */
export default function PostsListComponent() {
	// Create state for array of post objects
	const [posts, setPosts] = React.useState([]);

	/** Get posts data */
	const fetchData = React.useCallback(async () => {
		// Get post ids
		const postIds = await axios.get(
			'https://hacker-news.firebaseio.com/v0/newstories.json'
		);

		// TODO - Replace with pagination
		postIds.data.splice(10);

		// Loop through each post id
		postIds.data.map(async postId => {
			// Get data for post
			const post = await axios.get(
				'https://hacker-news.firebaseio.com/v0/item/' + postId + '.json'
			);

			// Push to posts array
			posts.push(post.data);
			// Set posts state
			setPosts([...posts]);
		});
	}, []);

	// On component mount
	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<ul className="list-posts">
				{posts.map(function(post, index) {
					return <PostItemComponent key={post.id} post={post} index={index} />;
				})}
			</ul>
		</>
	);
}
