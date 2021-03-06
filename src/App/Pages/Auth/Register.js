import React from 'react'
import translate from 'App/i18n/translate'
import Translate from 'App/i18n'
import { Form, Field } from 'simple-react-form'
import Text from './Text'
import Button from 'orionsoft-parts/lib/components/Button'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import { createUser } from 'meteor-apollo-accounts'
import TOS from './TOS'
// import Social from './Social'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

@withApollo
export default class Register extends React.Component {
  state = {}

  static propTypes = {
    setLoading: PropTypes.func,
    setError: PropTypes.func,
    onSuccess: PropTypes.func,
    isLoading: PropTypes.bool,
    client: PropTypes.object
  }

  @autobind
  async login () {
    if (this.state.password !== this.state.confirm) {
      return this.props.setError(
        <Translate tr="auth.pages.passwordDoesntMatch" />
      )
    }
    this.props.setLoading(true)
    this.props.setError(null)
    try {
      await createUser(this.state, this.props.client)
      this.props.onSuccess()
    } catch (e) {
      this.props.setError(e.message)
      this.props.setLoading(false)
    }
  }

  canRegister () {
    return this.state.email && this.state.password && this.state.confirm
  }

  renderButtons () {
    return (
      <div className={styles.buttonsContainer}>
        <Button
          disabled={!this.canRegister()}
          primary
          onClick={this.login}
          fullWidth
          loading={this.props.isLoading}
        >
          <Translate tr="auth.pages.register" />
        </Button>
      </div>
    )
  }

  render () {
    return (
      <div>
        {/* <Social {...this.props} /> */}
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field
            fieldName="email"
            type={Text}
            fieldType="email"
            placeholder={translate('auth.pages.email')}
          />
          <br />
          <br />
          <Field
            fieldName="password"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.pages.password')}
          />
          <br />
          <br />
          <Field
            fieldName="confirm"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.pages.confirmPassword')}
          />
        </Form>
        {this.renderButtons()}
        <br />
        <Translate tr="auth.pages.otherLinksInRegister" />
        <br />
        <TOS />
      </div>
    )
  }
}
