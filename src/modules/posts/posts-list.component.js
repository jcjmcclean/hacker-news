import React from 'react';
import axios from 'axios';
import createPersistedState from 'use-persisted-state';
import './posts-list.component.scss';
import PostItemComponent from './post-item/post-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

// Persist bookmarks state to local storage
const BookmarksState = createPersistedState('bookmarks');

/** Renders posts list component */
export default function PostsListComponent({ mode }) {
	// Set number of items per page
	const itemsPerPage = 10;

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

	// Create bookmarks state
	const [bookmarks, setBookmarks] = BookmarksState([]);

	/** Get posts data */
	const fetchData = React.useCallback(
		async type => {
			// Store for ids of posts
			let postIds;

			// If we need to show saved posts
			if (type == 'saved') {
				postIds = {
					data: bookmarks
				};
			} else {
				// Get post ids from hn
				postIds = await axios.get(
					'https://hacker-news.firebaseio.com/v0/' + type + 'stories.json'
				);
			}

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

					// Push to posts array
					posts.push(post);
					// Set posts state
					setPosts([...posts]);
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

	// On component mount
	React.useEffect(() => {
		// If offset change isn't due to a mode change
		if (!prevMode || prevMode === mode) {
			fetchData(mode);
		}
	}, [offset]);

	// On component mount
	React.useEffect(() => {
		// Update prev mode
		prevModeRef.current = mode;

		// If mode has changed from previous
		if (prevMode && prevMode !== mode) {
			// Reset posts array
			posts.length = 0;
			setPosts(posts);

			// Reset offset
			setOffset(0);

			// Fetch data again
			fetchData(mode);
		}
	}, [mode]);

	return (
		<InfiniteScroll
			dataLength={posts.length}
			next={handleScroll}
			hasMore={more}
			loader={<p className="loading">Loading...</p>}
			endMessage={<p className="end">End of {mode} posts.</p>}
		>
			{posts.map(function(post, index) {
				return <PostItemComponent key={index} post={post} index={index} />;
			})}
		</InfiniteScroll>
	);
}
