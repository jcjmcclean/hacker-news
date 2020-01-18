import React from 'react';
import axios from 'axios';
import './posts-list.component.scss';
import PostItemComponent from './post-item/post-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

/** Renders posts list component */
export default function PostsListComponent() {
	// Set number of items per page
	const itemsPerPage = 10;

	// Create state for pagination
	const [offset, setOffset] = React.useState(0);

	// Create state for array of post objects
	const [posts, setPosts] = React.useState([]);

	// Create state for end of posts
	const [more, setMore] = React.useState(true);

	/** Get posts data */
	const fetchData = React.useCallback(async () => {
		// Get post ids
		const postIds = await axios.get(
			'https://hacker-news.firebaseio.com/v0/topstories.json'
		);

		// Cut posts array down to 20 items
		// postIds.data.splice(20); // TODO - Remove!

		// Paginate
		postIds.data = postIds.data.slice(offset, offset + itemsPerPage);

		// If we don't have any more posts
		if (!postIds.data.length) {
			// Set this to the end of the list, so we don't try to load more
			setMore(false);
			return;
		}

		// Loop through each post id
		postIds.data.map(async postId => {
			// Get data for post
			const postResponse = await axios.get(
				'https://hacker-news.firebaseio.com/v0/item/' + postId + '.json'
			);

			// If we have a response
			if (postResponse && postResponse.data) {
				// Set post from response data
				const post = postResponse.data;

				// If this is a link post
				if (post.url) {
					// Get domain and add to post
					const matches = post.url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
					post.domain = matches && matches[1];
				}

				// Push to posts array
				posts.push(post);
				// Set posts state
				setPosts([...posts]);
			}
		});
	}, [offset, posts]);

	/** Handle load more on scroll */
	const handleScroll = () => {
		// Increment pagination offset
		setOffset(offset + itemsPerPage);
	};

	// On component mount
	React.useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [offset]);

	return (
		<InfiniteScroll
			dataLength={posts.length}
			next={handleScroll}
			hasMore={more}
			loader={<p className="loading">Loading...</p>}
			endMessage={<p className="end">That's all folks!</p>}
		>
			{posts.map(function(post, index) {
				return <PostItemComponent key={post.id} post={post} index={index} />;
			})}
		</InfiniteScroll>
	);
}
