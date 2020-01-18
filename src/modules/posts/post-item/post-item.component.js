import React from 'react';
import Moment from 'react-moment';
import './post-item.component.scss';
import { ReactComponent as IconBookmark } from '../../../assets/icons/bookmark.svg';
import { ReactComponent as IconComments } from '../../../assets/icons/comments.svg';

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
						Posted by{' '}
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
					{post.domain && (
						<li className="item-meta mod-domain">{post.domain}</li>
					)}
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
					</a>
					<div className="count">{post.descendants || 0}</div>
				</li>
				<li className="item-action">
					<div className="icon-bookmark">
						<IconBookmark />
					</div>
				</li>
			</ul>
		</li>
	);
}
