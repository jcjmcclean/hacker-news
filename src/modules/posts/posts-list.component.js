import * as React from 'react';
import './posts-list.component.scss';
import PostItemComponent from './post-item/post-item.component';

/** Renders posts list component */
export default function PostsListComponent() {
	// Set initial posts state
	const [posts, setPosts] = React.useState([
		{
			by: 'dhouston',
			descendants: 71,
			id: 8863,
			kids: [
				8952,
				9224,
				8917,
				8884,
				8887,
				8943,
				8869,
				8958,
				9005,
				9671,
				8940,
				9067,
				8908,
				9055,
				8865,
				8881,
				8872,
				8873,
				8955,
				10403,
				8903,
				8928,
				9125,
				8998,
				8901,
				8902,
				8907,
				8894,
				8878,
				8870,
				8980,
				8934,
				8952,
				9224,
				8917,
				8884,
				8887,
				8943,
				8869,
				8958,
				9005,
				9671,
				8940,
				9067,
				8908,
				9055,
				8865,
				8881,
				8872,
				8873,
				8955,
				10403,
				8903,
				8928,
				9125,
				8998,
				8901,
				8902,
				8907,
				8894,
				8878,
				8870,
				8980,
				8934,
				8876
			],
			score: 111,
			time: 1175714200,
			title: 'My YC app: Dropbox - Throw away your USB drive',
			type: 'story',
			url: 'http://www.getdropbox.com/u/2/screencast.html'
		}
	]);

	return (
		<ul className="list-posts">
			{posts.map(function(post, index) {
				return <PostItemComponent key={post.id} post={post} index={index} />;
			})}
		</ul>
	);
}
