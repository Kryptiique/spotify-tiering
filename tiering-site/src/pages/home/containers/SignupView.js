import React, { Component } from "react"
import Helmet from 'react-helmet'
import Tabs, { TabPane }  from 'rc-tabs'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent'
import logo from '../styles/spoofy logo.svg'
import { 
  Col,
  Row,
  Form,
  FormGroup, 
  FormControl, 
} from "react-bootstrap"

import LoaderButton from "../../../shared/components/generic/LoaderButton"
import { app_name } from '../../../shared/constants'
import "../styles/Credentials.css"

/**
 * Page for handling user login
 */
export default class SignupView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      tab: '1',
      email: "",
      password: "",
      showPass: false,

      spotify: '',
      regPassword: '',
      showRegPass: false,
    }

    this.togglePass = this.togglePass.bind(this)
  }

  /**
   * This will make sure a password gets entered before the user trys to login
   */
  validateForm() {
    if(this.state.tab === '1')
      return this.state.email.length > 0 
        && this.state.password.length > 0
    else
      return this.state.spotify.length > 0
        && this.state.regPassword.length > 0
  }

  /**
   * This will update the state when the user types something into these fields.
   */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  tabChangeCallback = event => {
    this.setState({ tab: event })
  }

  togglePass = event => {
    this.setState({
      [event.target.id]: !this.state[event.target.id]
    })
  }

  /**
   * This will handle auth when the form has been submitted
   */
  handleSubmit = async event => {
    event.preventDefault()
  
    this.setState({ isLoading: true })
  
    try {
      // await Auth.signIn(this.state.email, this.state.password)
      // this.props.userHasAuthenticated(true)
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Login">
        <Helmet>
          <title>{ app_name } | Login</title>
        </Helmet>
        <div className='body'>
          <div className='logo'>
            
            <img src={ logo } className="App-logo" alt="logo" />
            <span>{ app_name.toUpperCase() }</span>
          </div>
          <Form onSubmit={ this.handleSubmit }>
            <Tabs
              defaultActiveKey="1"
              onChange={ this.tabChangeCallback  }
              renderTabBar={ () => <ScrollableInkTabBar /> }
              renderTabContent={ () => <TabContent /> }
            >
              
              <TabPane tab='Login' key="1">
                <FormGroup controlId="email" bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder='Email'
                    value={ this.state.email }
                    onChange={ this.handleChange }
                  />
                </FormGroup>

                <Row>
                  <Col sm={ 10 }>
                    <FormGroup controlId="password" bsSize="large">
                      {/* <FormControl
                        value={ this.state.password}
                        onChange={ this.handleChange }
                        placeholder='Password'
                        type={ this.showPass ? 'text' : 'password' }
                      >
                      </FormControl> */}
                      <input className='form-control'
                        autoComplete="on"
                        id='password'
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        placeholder='Password'
                        type={ this.state.showPass ? 'text' : 'password' }
                      />
                    </FormGroup>
                  </Col>
                    
                  <Col sm={ 1 }>
                    <i id='showPass' onClick={ this.togglePass } 
                    className={ `fas fa-eye${ !this.state.showPass ? '-slash' : '' }` }></i>
                  </Col>
                </Row>
                
                <LoaderButton
                  block
                  bsSize="large"
                  disabled={ !this.validateForm() }
                  type="submit"
                  isLoading={ this.state.isLoading }
                  text="OK"
                  loadingText="Logging in…"
                />
              </TabPane>

              <TabPane tab='Register' key='2'>
                <FormGroup controlId='spotify'>
                  <FormControl
                    value={ this.state.spotify }
                    autoComplete="on"
                    onChange={ this.handleChange }
                    placeholder='Spotify Username'
                    type="password"
                  />
                </FormGroup>
                <Row>
                  <Col sm={ 10 }>
                    <FormGroup controlId='regPassword'>
                      <FormControl
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        autoComplete="on"
                        placeholder='Password'
                        type={ this.state.showRegPass ? 'text' : 'password' }
                      />
                    </FormGroup>
                  </Col>
                    
                  <Col sm={ 1 }>
                    <i id='showRegPass' onClick={ this.togglePass } 
                    className={ `fas fa-eye${ !this.state.showPass ? '-slash' : '' }` }></i>
                  </Col>
                </Row>
                
                <LoaderButton
                  block
                  bsSize="large"
                  disabled={ !this.validateForm() }
                  type="submit"
                  isLoading={ this.state.isLoading }
                  text="OK"
                  loadingText="Logging in…"
                />
              </TabPane>
            </Tabs>
            

          </Form>
        </div>
      </div>
        
    )
  }
}