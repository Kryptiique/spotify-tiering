import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';

// import * as profileActions from '../actions'
import { app_name } from '../../../shared/constants';

class ProfileView extends Component {
  // constructor(props){
  //   super(props)
  // }

  render(){
    console.debug(this.props)
    return (
      <div className="page">
        <Helmet>
          <title>{ `${ app_name } - ${ this.props.user.name }'s Profile` }</title>
        </Helmet>

        <div>
          
        </div>
      </div>
    )
  }
}

const mapState = state => {
  var { user } = state
  
  return {
    user: user
  }
}

// const mapDispatch = dispatch => ({
//   actions: bindActionCreators(profileActions, dispatch)
// })

export default connect(
  mapState,
  // mapDispatch
)(ProfileView)