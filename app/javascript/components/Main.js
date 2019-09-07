// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

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
  // updates a post
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
			// switch back to the home view
			this.props.handleView('viewTrends')
			// call this.fetchPosts to show the updated post immediately
			this.fetchPosts()
		})
	.catch(err => console.log(err))
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
		alert(event.target.dataset.name);
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
			this.state.posts.map((postData) => (
			    <Post
			      key={postData.id}
			      postData={postData}
			      handleView={this.props.handleView}
			      handleDelete={this.handleDelete}
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
