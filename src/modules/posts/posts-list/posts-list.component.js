import React from 'react';
import './posts-list.component.scss';
import PostItemComponent from '../post-item/post-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

/** Renders posts list component */
export default function PostsListComponent({ mode, posts, handleScroll, more }) {
	return (
		<InfiniteScroll
			dataLength={posts.length}
			next={handleScroll}
			hasMore={more}
			loader={<p className="loading">Loading...</p>}
			endMessage={<p className="end">End of {mode} posts.</p>}
		>
			{posts.map(function (post, index) {
				return <PostItemComponent key={index} post={post} />;
			})}
		</InfiniteScroll>
	);
}
