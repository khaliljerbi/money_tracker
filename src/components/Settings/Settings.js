import React, { Component } from "react";
import {
  Segment,
  Grid,
  Form,
  Label,
  Icon,
  Button,
  Loader,
  Dropdown
} from "semantic-ui-react";
import FormContainer from "../SharedComponents/FormContainer/FormContainer";

class Settings extends Component {
  state = {
    convertion: [],
    currencyTags: [],
    baseCurrency: "USD , United States Dollar"
  };
  componentDidMount() {
    const allCurrencies = [...this.state.convertion];
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(data =>{
          data.map(country =>
            allCurrencies.push({
              countryCode: country.alpha2Code,
              currency: country.currencies
            })
          )
          this.setState({ convertion: allCurrencies });
        }
      );
   
  }
  onResetAppHandler = () => {
    //later Content
  };
  render() {
    let form = null;
    const currencyOptions = [];
    
    
    if (this.state.convertion.length !== 0) {
      this.state.convertion.map(currency =>
        currencyOptions.push({
          key: currency.countryCode,
          text: currency.currency[0].code + ', ' + currency.currency[0].name  ,
          value:currency.currency[0].code 
        })
      );
      form = (
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Base Currency</label>
                  <select
                    value={this.state.baseCurrency}
                    onChange={e =>
                      this.setState({ baseCurrency: e.target.value })
                    }
                  >
                    {this.state.convertion.map(currency => (
                      <option key={currency.countryCode}>
                       
                        {currency.currency[0].code} ,{" "}
                        {currency.currency[0].name}
                      </option>
                    ))}
                  </select>
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Additional Currencies (optional) </label>
                  <Dropdown
                  placeholder="Choose additional currencies"
                  fluid
                  multiple
                  selection
                  search
                  value = {this.state.currencyTags}
                  onChange={(e,{name,value}) => this.setState({ currencyTags: value })}
                  options={currencyOptions}
                />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      );
    } else {
      form = (
        <Loader inline active >
          Loading currency ....
        </Loader>
      );
    }
    
    return (
      <Segment>
        <FormContainer title="Currency">
          {form}
          <br />
        </FormContainer>
        <FormContainer title="Data Import">
          <Label
            width="4"
            as="label"
            htmlFor="file"
            size="big"
            style={{ cursor: "pointer" }}
          >
            <Icon name="file alternate" />
            Open file
          </Label>
          <input id="file" hidden type="file" />
        </FormContainer>
        <br />
        <FormContainer title="User">
          <Button content="Reset App" icon="refresh" labelPosition="right" />
        </FormContainer>
      </Segment>
    );
  }
}

export default Settings;
