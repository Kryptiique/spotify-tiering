import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Tabs, { TabPane }  from 'rc-tabs'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent'
// import { bindActionCreators } from 'redux';

// import * as profileActions from '../actions'
import { app_name } from '../../../shared/constants';
import '../styles/ProfileView.css'
import banner from '../styles/banner.png'

class ProfileView extends Component {
  // constructor(props){
  //   super(props)
  // }

  render(){
    const { user } = this.props
    console.debug(this.props)
    return (
      <div className="profile">
        <Helmet>
          <title>{ `${ app_name } - ${ user.displayname }'s Profile` }</title>
        </Helmet>

        <img className='banner' src={ banner } alt='banner'/>

        <div className='main'>
          <div className='prof'>
            <div className='pic' style={{backgroundImage: `url(${ user.profilePic })`}}></div>
            <div className='info'>
              <p>Reputation:  <span>{ user.reputation }</span></p>
              <p>Spotify Username: 
                  <span>
                      { user.username }
                <a href={ user.spotifyLink }>
                  <i className='fas fa-sign-out-alt'></i>
                </a>
                  </span>
              </p>
            </div>
          </div>

          <div className='body'>
            <div className='name'>{ user.displayname }</div>
            <Tabs
              defaultActiveKey="1"
              onChange={ this.tabChangeCallback  }
              renderTabBar={ () => <ScrollableInkTabBar /> }
              renderTabContent={ () => <TabContent /> }
            >
              
              {/* Area displays recent activity across all circles */}
              <TabPane tab='Feed' key="1">
                <Fragment>
                  { user.feed.length === 0
                    ? <div className='jumbo'>
                        Nothing here!
                      </div>
                    : <Fragment>
                        { user.feed.map(_ => (
                          <div>
                            Action
                          </div>
                        ))}
                      </Fragment>
                  }
                </Fragment>
              </TabPane>

              {/* List of circles the user is participating in */}
              <TabPane tab='Circles' key='2'>
                <div className='btn wide negative'>Join</div>
                <div className='btn wide'>Create</div>
              </TabPane>

            </Tabs>
          </div>
          
          {/* Subsection to display ads. Because why not. */}
          <div className='ads'>

          </div>
        </div>
        

        <div></div>
      </div>
    )
  }
}

const mapState = state => {
  var { user } = state
  if(user.feed === undefined) user.feed = []
  if(user.circles === undefined) user.circles = []
  
  return {
    user: user,
  }
}

// const mapDispatch = dispatch => ({
//   actions: bindActionCreators(profileActions, dispatch)
// })

export default connect(
  mapState,
  // mapDispatch
)(ProfileView)