import { Auth } from "aws-amplify"
import React, { Component } from "react"
import { 
  Form,
  FormGroup, 
  FormControl, 
} from "react-bootstrap"

import LoaderButton from "../../../shared/components/generic/LoaderButton"
import "../styles/Credentials.css"
import 'spoofy logo.svg'

/**
 * Page for handling user login
 */
export default class LoginView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    }
  }

  /**
   * This will make sure a password gets entered before the user trys to login
   */
  validateForm() {
    return this.state.email.length > 0 
      && this.state.password.length > 0
  }

  /**
   * This will update the state when the user types something into these fields.
   */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  /**
   * This will handle auth when the form has been submitted
   */
  handleSubmit = async event => {
    event.preventDefault()
  
    this.setState({ isLoading: true })
  
    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Login">
        <div className='splash'/> 

        <Form onSubmit={ this.handleSubmit }>

          <FormGroup controlId="email" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              placeholder='Password'
              type="password"
            />
          </FormGroup>

          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />

        </Form>
      </div>
    )
  }
}