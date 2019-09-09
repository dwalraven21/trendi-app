// =============================
// DEPENDENCIES
// =============================
// packages
import React, { Component } from 'react';

// =============================
// COMPONENT CLASS
// =============================
class Nav extends React.Component {

  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <nav>
        <ul>
          <li className="view-trends" onClick={() => {window.location.reload()}}>View Top Trend By State  <span className="arrow"> > </span></li>
          <li className="add-trend" onClick={() => {this.props.handleView('addTrend')}}>Add A Trend
		  <span className="arrow"> > </span></li>
        </ul>
      </nav>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Nav
