// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Post extends React.Component {
  // ==============
  // RENDER
  // ==============
  render () {
	  return (
		<article>
		<div className="post-options">
		  <ul className="vote">
			<li className="upvote" onClick={() => {this.props.handleUpvote(this.props.postData.id)}}>&#9650;</li>
			{this.props.postData.rank > 0 ?
				<li className="upvote">{this.props.postData.rank}
				</li>
				:<li className="downvote">{this.props.postData.rank}
				</li>}
			<li className="downvote" onClick={() => {this.props.handleDownvote(this.props.postData.id)}}>&#9660;</li>
		  </ul>
		</div>
		<div className="post-info">
			<div className="post-name">
			<h1>{this.props.postData.name}</h1>
			</div>
			<div className="post-image">
			  <img src={this.props.postData.image} alt="{this.props.postData.name}" />
			</div>
			<button onClick={() => {this.props.handleDelete(this.props.postData.id)}}>Delete post</button>
		</div>
		</article>
	  )
    }
  }

// =============================
// EXPORT
// =============================
export default Post
