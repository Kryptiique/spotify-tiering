import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { app_name } from '../../../shared/constants'
import * as duplicatesActions from '../reducers/actions'

class ProcessingView extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="page">
        <Helmet>
          <title>{ app_name }</title>
        </Helmet>

        <h1>Image Processing</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    images: state.browser.images
  }
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(duplicatesActions, dispatch)
})

export default connect(
  mapState,
  mapDispatch
)(ProcessingView)