import * as React from 'react';
import './post-item.component.scss';
import iconBookmark from '../../../assets/icons/bookmark.svg';
import iconComments from '../../../assets/icons/comments.svg';

/** Renders post item component */
export default function PostItemComponent({ post, index }) {
	return (
		<li className={'item-post ' + ((index % 2 !== 0 && 'mod-alt') || '')}>
			<div className="meta">
				<div className="position">{index + 1}</div>
				<div className="score">{post.score}p</div>
			</div>
			<div className="title">
				<h3>
					{/* TODO - link to comments if post.url not set */}
					<a href={post.url} target="_blank" rel="noopener noreferrer">
						{post.title}
					</a>
				</h3>
				<ul className="list-meta">
					{/* TODO - pretty domain */}
					<li className="item-meta mod-domain">{post.url}</li>
					{/* TODO - format posted time */}
					<li className="item-meta">
						Posted by {post.by} {post.time}
					</li>
				</ul>
			</div>
			<ul className="list-actions">
				<li className="item-action">
					<img src={iconComments} className="icon-comments" alt="comments" />
					{/* TODO - Comment count */}
					{/* {post.descendants} */}
				</li>
				<li className="item-action">
					<img src={iconBookmark} className="icon-bookmark" alt="bookmark" />
				</li>
			</ul>
		</li>
	);
}
