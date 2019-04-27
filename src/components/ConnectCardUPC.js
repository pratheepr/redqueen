import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
//import swisscom from '../apis/swisscom.js';
import axios from 'axios';

class ConnectCardUPC extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dummy:0 } ;
  }


renderUPC() {

  return (
      <div className="card">
          <div className="content">
            <div className="header">
                UPC CH
            </div>
            <div className="description">
                <div> <h3>Availability    : </h3>  {(this.props.UPCResponse).status}</div>
            </div>
            <div className="extra content">
              <div> <h3>Available Products  :</h3> {(this.props.UPCResponse).availableServices}</div>
            </div>
          </div>
      </div>
  );
}


  render() {

    console.log(this.props.UPCResponse);

    console.log('Inside UPC render');
    console.log(this.props.UPCLoaded);

    if ( this.props.UPCLoaded === 1 ) {
            return (
              <div>
                    <Grid.Column width={15}>
                      <div className="ui cards">

                         { this.renderUPC() }

                       </div>
                      </Grid.Column>

              </div>
            );
      }
      else if (this.props.UPCLoaded === -1) {
              return (
                <div>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={15}>
                        <div className="ui cards">
                          <div className="card">
                            <div className="header">
                                  No UPC Availability in this building
                            </div>
                          </div>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              );
      }
      else if (this.props.UPCLoaded === 0)
      {
        return (<div> UPC Data Loading </div>);
      }

    }

}

export default ConnectCardUPC;
