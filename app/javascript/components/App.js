// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// components
import Header from './Header.js'
import Nav from './Nav.js'
import Main from './Main.js'

// =============================
// COMPONENT CLASS
// =============================
class App extends React.Component {

	// ==============
	// STATE
	// ==============
	constructor(props) {
		super(props)
		this.state = {
		  view: {
		    page: 'viewTrends',
		    pageTitle: 'View Trends By State'
		  },
		  formInputs: {
			id: null,
		    name: null,
		    location: null,
		    image: null,
		    rank: null
		  }
		}
	}

	// ==============
	// HANDLERS
	// ==============
	handleView = (view, postData) => {
		let pageTitle = ''
	    let formInputs = {
			id: null,
		    name: '',
		    location: '',
			image: '',
			rank: ''
	    }
	// decide the pageTitle based on the view
	switch (view) {
	  case 'addTrend':
		pageTitle = 'Add A New Trend'
		break
	  case 'viewTrends':
		pageTitle = 'View Trends By State'
		break
	  default:
		break
	}
	// update the state
    this.setState({
      view: {
        page: view,
        pageTitle: pageTitle
      },
      formInputs: formInputs
    })
  }

  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <div className="large-container">
        <Header/>
		<div className="main-container">
			<Nav
			view={this.state.view}
			handleView={this.handleView}
			/>
			<Main
				view={this.state.view}
		        handleView={this.handleView}
		        formInputs={this.state.formInputs}
			/>
		</div>
      </div>
    )
  }
}

// =============================
// EXPORT
// =============================
export default App
