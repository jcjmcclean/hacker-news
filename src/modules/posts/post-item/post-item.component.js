import React from 'react';
import Moment from 'react-moment';
import './post-item.component.scss';
import { ReactComponent as IconComments } from '../../../assets/icons/comments.svg';

/** Renders post item component */
export default function PostItemComponent({ post }) {
	return (
		<li className="item-post">
			<div className="points" title="Post score">
				{post.score}
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
					{post.domain && (
						<li className="item-meta mod-domain">
							<a
								href={'https://news.ycombinator.com/from?site=' + post.domain}
								target="_blank"
								rel="noopener noreferrer"
							>
								{post.domain}
							</a>
						</li>
					)}
					<li className="item-meta mod-score">
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
						title="Post comments"
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
			</ul>
		</li>
	);
}
