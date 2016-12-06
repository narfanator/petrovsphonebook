import React from 'react'
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';
import Layout from '../../pages/_layout.js'
import axios from 'axios'
//Note: a lot of copypasta from https://github.com/geowarin/react-easy-form

export default class ProtestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //TODO: Fetch from "model"
      jurisdiction: ["1", "2"]
    };

    this.handleChange = this.handleChange.bind(this); //TODO: Better understand what .bind(this) does
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("handleChange")
    console.log(event.target)
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    console.log("handleSubmit")
    console.log(event)

    axios({
      method: 'POST',
      url: 'http://localhost:3001'+'/protests',
      data: [this.state]
    }).then(function(response) {
        console.log("success")
        console.log(response)
      })
      .catch(function(error) {
        console.log("error")
        console.log(error)
      });

    //event.preventDefault(); //TODO: What IS the default in this situation?
  }

  render() {

    const LabeledInput = (props) => (
  		<div className="pure-control-group">
  			<Label value={props.label} position="before">
  				<TextInput {...props}/>
  			</Label>
  		</div>);

    const LabeledSelect = (props) => (
  		<div className="pure-control-group">
  			<Label value={props.label} position="before">
  				<Select {...props}/>
  			</Label>
  		</div>);

    return (
      <div>

        <Layout />
        <Form ref="form" className="pure-form pure-form-aligned" initialData={this.state} onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <fieldset>
  					<LabeledInput label="Protest Name" name="name" required/>

  					<LabeledInput label="Website" name="website" type="url" required/>

  					<div className="pure-controls">
  						<button className="pure-button pure-button-primary" type="submit">Submit</button>
  					</div>
  				</fieldset>
        </Form>
      </div>
    );
  }
}
