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
		  <ul>
			<li onClick={() => {this.props.handleUpvote(this.props.postData.id)}}>Upvote</li>
			<li>{this.props.postData.rank}</li>
			<li onClick={() => {this.props.handleDownvote(this.props.postData.id)}}>Downvote</li>

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
