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
	   		location: '',
	   		image: '',
	   		rank: 0
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
		          Select Your State
		          <select name="state" id="location" value={this.state.location} onChange={this.handleChange}>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AK">Arkansas</option>
					<option value="CA">California</option>
					<option value="CO">Colorado</option>
					<option value="CT">Connecticut</option>
					<option value="DC">Washington D.C.</option>
					<option value="DE">Delaware</option>
					<option value="FL">Florida</option>
					<option value="GA">Georgia</option>
					<option value="HI">Hawaii</option>
					<option value="ID">Idaho</option>
					<option value="IL">Illinois</option>
					<option value="IN">Indiana</option>
					<option value="IA">Iowa</option>
					<option value="KS">Kansas</option>
					<option value="KY">Kentucky</option>
					<option value="LA">Louisiana</option>
					<option value="ME">Maine</option>
					<option value="MD">Maryland</option>
					<option value="MA">Massachusetts</option>
					<option value="MI">Michigan</option>
					<option value="MN">Minnesota</option>
					<option value="MS">Mississippi</option>
					<option value="MO">Missouri</option>
					<option value="MT">Montana</option>
					<option value="NE">Nebraska</option>
					<option value="NV">Nevada</option>
					<option value="NH">New Hampshire</option>
					<option value="NJ">New Jersey</option>
					<option value="NM">New Mexico</option>
					<option value="NY">New York</option>
					<option value="NC">North Carolina</option>
					<option value="ND">North Dakota</option>
					<option value="OH">Ohio</option>
					<option value="OK">Oklahoma</option>
					<option value="OR">Oregon</option>
					<option value="PA">Pennsylvania</option>
					<option value="RI">Rhode Island</option>
					<option value="SC">South Carolina</option>
					<option value="SD">South Dakota</option>
					<option value="TN">Tennessee</option>
					<option value="TX">Texas</option>
					<option value="UT">Utah</option>
					<option value="VT">Vermont</option>
					<option value="VA">Virginia</option>
					<option value="WA">Washington</option>
					<option value="WV">West Virginia</option>
					<option value="WI">Wisconsin</option>
					<option value="WY">Wyoming</option>
				  </select>
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
