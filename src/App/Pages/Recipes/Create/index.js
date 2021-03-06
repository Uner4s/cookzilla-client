import React from 'react'
import styles from './styles.css'
import { Form, Field } from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import Button from 'orionsoft-parts/lib/components/Button'
import gql from 'graphql-tag'
import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import autobind from 'autobind-decorator'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'
import PropTypes from 'prop-types'

@requireRole(['colaborator'])
@withMessage
@withMutation(gql`
  mutation addRecipe($recipe: RecipeInput) {
    addRecipe(recipe: $recipe) {
      title
      dificult
      time
      gloss
    }
  }
`)
export default class Create extends React.Component {
  static propTypes = {
    addRecipe: PropTypes.func
  }

  state = {}
  @autobind
  async renderCreate() {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.addRecipe({ recipe: this.state })
      window.location.href = '../recipes'
      window.alert('Recipe sended')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Create recipe</h2>
        <Form
          errorMessages={this.state.errorMessages}
          state={this.state}
          onChange={changes => this.setState(changes)}
        >
          <label>Title</label>
          <Field fieldName="title" label="title" type={Text} />
          <label>Dificult</label>
          <Field fieldName="dificult" label="dificult" type={Text} />
          <label>Time</label>
          <Field fieldName="time" label="time" type={Text} />
          <label>Gloss</label>
          <Field fieldName="gloss" label="gloss" type={Text} />
          <Field
            fieldName="ingredient"
            label="Ingredient"
            type={ArrayComponent}
          >
            <Field fieldName="name" label="name" type={Text} />
          </Field>
          <Field fieldName="tool" label="Tool" type={ArrayComponent}>
            <Field fieldName="name" label="name" type={Text} />
          </Field>
        </Form>
        <Button label="Send" onClick={() => this.renderCreate()} />
      </div>
    )
  }
}
