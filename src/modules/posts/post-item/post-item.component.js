import React from 'react';
import createPersistedState from 'use-persisted-state';
import Moment from 'react-moment';
import './post-item.component.scss';
import { ReactComponent as IconBookmark } from '../../../assets/icons/bookmark.svg';
import { ReactComponent as IconBookmarkActive } from '../../../assets/icons/bookmark-active.svg';
import { ReactComponent as IconComments } from '../../../assets/icons/comments.svg';

// Persist bookmarks state to local storage
const BookmarksState = createPersistedState('bookmarks');

/** Renders post item component */
export default function PostItemComponent({ post, index }) {
	// Create bookmarks state
	const [bookmarks, setBookmarks] = BookmarksState([]);

	/** Adds or removes bookmark for post */
	const handleBookmark = postId => {
		// If post exists in bookmarks
		if (bookmarks.includes(postId)) {
			// If we only have 1 bookmark
			if (bookmarks.length === 1) {
				bookmarks.length = 0;
				setBookmarks(bookmarks.filter(id => id !== postId));
				return;
			}
			// Remove from bookmarks
			setBookmarks(bookmarks.filter(id => id !== postId));

			return;
		}
		// Add post to bookmarks
		setBookmarks([postId, ...bookmarks]);
	};

	return (
		<li className={'item-post ' + ((index % 2 !== 0 && 'mod-alt') || '')}>
			<div className="title">
				<h3>
					<a
						href={post.url || 'https://news.ycombinator.com/item?id=' + post.id}
						target="_blank"
						rel="noopener noreferrer"
					>
						{post.title}
					</a>
				</h3>
				<ul className="list-meta">
					<li className="item-meta">
						<strong>+{post.score}</strong>
					</li>
					<li className="item-meta">
						by{' '}
						<a
							href={'https://news.ycombinator.com/user?id=' + post.by}
							target="_blank"
							rel="noopener noreferrer"
						>
							{post.by}
						</a>
					</li>
					<li className="item-meta">
						<Moment unix fromNow>
							{post.time}
						</Moment>
					</li>
				</ul>
			</div>
			<ul className="list-actions">
				<li className="item-action">
					<a
						href={'https://news.ycombinator.com/item?id=' + post.id}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="icon-comments">
							<IconComments />
						</div>
						<div className="count">{post.descendants || 0}</div>
					</a>
				</li>
				<li className="item-action">
					<div
						className="icon-bookmark"
						onClick={() => {
							handleBookmark(post.id);
						}}
					>
						{bookmarks.includes(post.id) ? (
							<IconBookmarkActive />
						) : (
							<IconBookmark />
						)}
					</div>
				</li>
			</ul>
		</li>
	);
}
