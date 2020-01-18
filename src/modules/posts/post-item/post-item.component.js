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
				<h3>{post.title}</h3>
				<ul className="list-meta">
					{/* TODO - dynamic domain */}
					<li className="item-meta mod-domain">www.domain.com</li>
					{/* TODO - dynamic posted time */}
					<li className="item-meta">Posted by {post.by} 5 hours ago</li>
				</ul>
			</div>
			<ul className="list-actions">
				<li className="item-action">
					{/* TODO - Comment count */}
					<img src={iconComments} className="icon-comments" alt="comments" />
				</li>
				<li className="item-action">
					<img src={iconBookmark} className="icon-bookmark" alt="bookmark" />
				</li>
			</ul>
		</li>
	);
}
