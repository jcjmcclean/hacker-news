import React from 'react';
import axios from 'axios';
import './posts-list.component.scss';
import PostItemComponent from './post-item/post-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

/** Renders posts list component */
export default function PostsListComponent({ mode }) {
	// Set number of items per page
	const itemsPerPage = 10;

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
			// Set loading state to true
			setLoading(true);
			// Fetch posts
			fetchData(mode);
		}
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
	}, [mode]);

	return (
		<>
			{loading && (
				<div className="loader">
					<div className="la-square-jelly-box la-dark la-3x">
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			<InfiniteScroll
				dataLength={posts.length}
				next={handleScroll}
				hasMore={more}
				loader={<p className="loading">Loading...</p>}
				endMessage={<p className="end">End of {mode} posts.</p>}
			>
				{posts.map(function(post, index) {
					return <PostItemComponent key={index} post={post} />;
				})}
			</InfiniteScroll>
		</>
	);
}
