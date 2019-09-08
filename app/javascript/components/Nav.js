// =============================
// DEPENDENCIES
// =============================
// packages

import React, { Component } from 'react';
import USAMap from "react-usa-map";

// =============================
// COMPONENT CLASS
// =============================
class Nav extends React.Component {
    mapHandler = (event) => {
        console.log(event.target.dataset.name);
        alert(event.target.dataset.name);
    };
  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <nav>
        <ul>
          <li className="view-trends" onClick={() => {this.props.handleView('viewTrends')}}>View Trends By State  <span className="arrow"> > </span></li>
          <li className="add-trend" onClick={() => {this.props.handleView('addTrend')}}>Add A Trend  <span className="arrow"> > </span></li>
        </ul>
		{ this.props.view.page === 'viewTrends'?
        <div className="App">
            <USAMap onClick={this.mapHandler} />
        </div>
		: null}
      </nav>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Nav
