// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'
import USAMap from "react-usa-map"

// components
import Post from './Post.js'
import Form from './Form.js'


// =============================
// COMPONENT CLASS
// =============================
class Main extends React.Component {

	// ==============
    // STATE
    // ==============
	constructor(props) {
		super(props)
		this.state = {
		 posts: []
		}
	}

	// ==============
	// HANDLERS
	// ==============
	// fetches all the data
	fetchPosts = () => {
		fetch('/api/posts')
		.then(data => data.json())
		.then(jData => {
			this.setState({ posts: jData })
		})
	}
	// create new post
  handleCreate = (createData) => {
    fetch('/api/posts', {
      body: JSON.stringify(createData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdPost => {
        return createdPost.json()
    })
    .then(jsonedPost => {
    // takes us back to the index page
        this.props.handleView('viewTrends')
        // update state with our new post
        this.setState(prevState => {
          prevState.posts.push(jsonedPost)
          return { posts: prevState.posts }
        })
    })
    .catch(err => console.log(err))
  }

  handleUpdate = (updateData) => {
	  fetch(`/api/posts/${updateData.id}`, {
		  body: JSON.stringify(updateData),
		  method: 'PUT',
		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		  }
	  })
	  .then(updatedPost => {
		// call this.fetchPosts to show the updated post immediately
		// this.fetchPosts()
	  })
	  .catch(err => console.log(err))
  }

  // updates a post's rank
	handleRankChange = (index, delta) => {
		this.setState( prevState => {
			// console.log(prevState);
			// new array - copy of previous posts array
			const updatedPosts = [ ...prevState.posts ];
			// a copy of the post we are targeting
			const updatedPost = updatedPosts[index];

			// Update the target post's rank
			updatedPost.rank += delta;

			// Update the posts array with the target post's new rank
			updatedPosts[index] = updatedPost;

			this.handleUpdate(updatedPost);

			// Update the new posts state without mutating the original state
			return {
				posts: updatedPosts

			}
		})
	}



	// deletes a post
	handleDelete = (id) => {
		fetch(`/api/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
		})
		.then(data => {
			this.setState(prevState => {
				const posts = prevState.posts.filter( post => post.id !== id)
				return { posts }
			})
		})
		.catch(err => console.log(err))
	}

	mapHandler = (event) => {
		// alert(event.target.dataset.name);
		let location = event.target.dataset.name
		console.log(location);
		fetch(`/api/posts/${location}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
		.then(data => data.json())
		.then(jData => {
			this.setState({ posts: [jData] })
			// console.log(jData);
		})

	};

	// ==============
	// LIFE CYCLES
	// ==============
	componentDidMount() {
		this.fetchPosts()
	}

	// ==============
	// RENDER
	// ==============
	render () {
		return (
			<main>
			<h1>{this.props.view.pageTitle}</h1>
			{ this.props.view.page === 'viewTrends'?
			<div className="App">
				<USAMap onClick={this.mapHandler}/>
			</div>
			: null}

			{ this.props.view.page === 'viewTrends'?
			this.state.posts.map((postData, index) => (

			    <Post
			      key={postData.id}
			      postData={postData}
			      handleView={this.props.handleView}
			      handleDelete={this.handleDelete}
				  index={index}
				  handleRankChange={this.handleRankChange}
				  handleUpdate={this.handleUpdate}
			    />
			  ))
			  : <Form
			      handleCreate={this.handleCreate}
			      formInputs={this.props.formInputs}
			      view={this.props.view}
			    />
			}
			</main>
		)
	}
}

// =============================
// EXPORT
// =============================
export default Main
