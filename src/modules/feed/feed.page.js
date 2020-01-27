import React from 'react';
import axios from 'axios';
import PostsListComponent from '../posts/posts-list/posts-list.component';
import PostsLoaderComponent from '../posts/posts-loader/posts-loader.component';

/** Renders feed page component */
export default function FeedPage({ mode }) {
	// Set number of items per page
	const itemsPerPage = 20;

	// Create state for loading
	const [loading, setLoading] = React.useState(true);

	// Create ref to store previous mode
	const prevModeRef = React.useRef();
	// Set prevmode
	const prevMode = prevModeRef.current;

	// Create state for pagination
	const [offset, setOffset] = React.useState(0);

	// Create state for array of post objects
	const [posts, setPosts] = React.useState([]);

	// Create state for end of posts
	const [more, setMore] = React.useState(true);

	/** Get posts data */
	const fetchData = React.useCallback(
		async type => {
			// Get post ids from hn
			const postIds = await axios.get(
				'https://hacker-news.firebaseio.com/v0/' + type + 'stories.json'
			);

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

					// Set loading state to false
					setLoading(false);
				}
			});
		},
		// eslint-disable-next-line
		[offset, posts]
	);

	/** Handle load more on scroll */
	const handleScroll = () => {
		// Increment pagination offset
		setOffset(offset + itemsPerPage);
	};

	/** Handle resetting posts */
	const handleReset = () => {
		console.log('handleReset');

		// Set loading state to true
		setLoading(true);

		// Reset posts array
		posts.length = 0;
		setPosts(posts);

		// Reset offset
		setOffset(0);

		// Fetch data again
		fetchData(mode);
	};

	// On component mount
	React.useEffect(() => {
		// If offset change isn't due to a mode change
		if (!prevMode || prevMode === mode) {
			// Fetch posts
			fetchData(mode);
		}
		// eslint-disable-next-line
	}, [offset]);

	// On component mount
	React.useEffect(() => {
		// Set loading state to true
		setLoading(true);

		// Update prev mode
		prevModeRef.current = mode;

		// If mode has changed from previous
		if (prevMode && prevMode !== mode) {
			handleReset();
		}
		// eslint-disable-next-line
	}, [mode]);

	return (
		<>
			{loading && (
				<PostsLoaderComponent />
			)}
			<PostsListComponent mode={mode} posts={posts} handleScroll={handleScroll} more={more} />
		</>
	);
}
