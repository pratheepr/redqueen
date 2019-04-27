import React from 'react';
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
//import { debounce } from 'throttle-debounce'


class Searchbar extends React.Component {

  state = {term: '', value:'' , suggestions: [] } ;

  renderHelp()  {
    console.log(this.state.term);
  }

  componentWillMount() {
        //this.onSuggestionsFetchRequested = debounce(
        //  500,
        //  this.onSuggestionsFetchRequested
        //  )
  }

  onFormSubmit = (event) =>  {
    event.preventDefault();

    console.log(this.state.value.city);
    this.props.onSubmit(this.state.value);
    this.setState ({value:''});
  }

  renderSuggestion = suggestion => {
//          <div className="street">{suggestion.street}</div> console.log(event.target)
        return (
          <div className="result" onSelect={ (event) => this.onFormSubmit }>
            <div>{ suggestion.POSTOFFICE_CODE + '  , ' + suggestion.POSTOFFICE_NAME + ' \n ' + suggestion.STREET_NAME + ' ' + suggestion.BUILDING_NUMBER }</div>
          </div>
        );
  }

  onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = ({ value }) => {

      if (value.length > 3 ) {
                  axios
                    .post('http://localhost:9200/swissch/_search', {
                      query: {
                        multi_match: {
                          query: value,
                          type: 'cross_fields', //'cross_fields',
                          analyzer: "whitespace" ,
                      //    fields: ['POSTOFFICE_CODE^4', 'STREET_NAME^2', 'BUILDING_NUMBER' , 'POSTOFFICE_NAME^4']
                              fields: ['ADDRESS' , 'POSTOFFICE_CODE^2', 'STREET_NAME^4', 'BUILDING_ID']
                        //  operator: 'or'
                        }
                      },
                      sort: ['_score']
                    })
                    .then(res => {
                      const results = res.data.hits.hits.map(h => h._source)
                      this.setState({ suggestions: results })
                      console.log(res)

                    })

            }
    }

  onSuggestionsClearRequested = () => {
      this.setState({ suggestions: [] })
    }

  onClickHandler =(event) => {
    console.log(event.target.value);
    console.log(this.state.value);
  }


  render() {

    const { value, suggestions } = this.state;

    const inputProps = {
                        placeholder: 'Address Here',
                        value,
                        onChange: this.onChange
                      };

//               type="text"
//  value={this.state.term}
//  onChange={ (txt) => this.setState({term: txt.target.value}) }
//                     onClick={ (event) => this.onClickHandler}


  //  this.renderHelp();
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
            />
          </div>
        </form>
      </div>
    );
  }



}

export default Searchbar;
