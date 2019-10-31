import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { app_name } from '../../../shared/constants'
import * as actions from '../reducers/actions'

class PageView extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="pageName">
        <Helmet>
          <title>{ app_name }</title>
        </Helmet>

      </div>
    )
  }
}

const mapState = state => {
  return {
    state
  }
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapState,
  mapDispatch
)(PageView)