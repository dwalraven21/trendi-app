// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Form extends React.Component {
	// ==============
    // STATE
    // ==============
	constructor() {
		super()
		this.state = {
			id: null,
	   		name: '',
	   		age: '',
	   		location: '',
	   		image: '',
	   		rank: ''
		}
	}

	// ==============
	// HANDLERS
	// ==============
	// handles form change
	handleChange = (e) => {
		this.setState({[e.target.id] : e.target.value})
	}
	// handles submit
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.handleCreate(this.state)
	}

	// ==============
	// LIFE CYCLES
	// ==============
	componentDidMount() {
    this.setState({
	id: this.props.formInputs.id,
	name: this.props.formInputs.name,
	age: this.props.formInputs.age,
	location: this.props.formInputs.location,
	image: this.props.formInputs.image,
	rank: this.props.formInputs.rank
    })
  }

	// ==============
    // RENDER
    // ==============
	render () {
	    return (
			<form onSubmit={this.handleSubmit}>
				<label>
		          Trend
		          <input type="text" placeholder="trend name" id="name" value={this.state.name} onChange={this.handleChange}/>
		        </label>
				<label>
		          Your Age
		          <input type="text" placeholder="your age" id="age" value={this.state.age} onChange={this.handleChange}/>
		        </label>
				<label>
		          Your State
		          <input type="text" placeholder="your state" id="location" value={this.state.location} onChange={this.handleChange}/>
		        </label>
				<label>
		          Image of Trend
		          <input type="text" placeholder="URL for trend image" id="image" value={this.state.image} onChange={this.handleChange}/>
		        </label>
				<input type="submit" value="submit"/>
			</form>
	   )
	}
}

// =============================
// EXPORT
// =============================
export default Form
