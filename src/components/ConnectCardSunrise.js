import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import swisscom from '../apis/swisscom.js';
import axios from 'axios';

class ConnectCardSunrise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  SwisscomResponse:null } ;

    console.log('constructor is called ');
  }

  renderSunrise() {

    return (
        <div className="card">
            <div className="content">
              <div className="header">
                  Sunrise
              </div>
              <div className="description">
                  <div> <h3>Technology    : </h3>  {this.props.SunriseTech}</div>
                  <div> <h3>Max Down Speed: </h3> {(this.props.SunriseResponse)}</div>
              </div>
            </div>
        </div>
    );
  }



  render() {
    console.log('Inside Sunrise render ');

    if (this.props.SunriseLoaded === 1)  {
          console.log('Inside Render ');

            return (
              <div>
                    <Grid.Column width={15}>
                      <div className="ui cards">
                         { this.renderSunrise() }
                       </div>
                    </Grid.Column>

              </div>
            );
          }
    else if (this.props.SunriseLoaded === -1) {
                        return (
                          <div>
                            <Grid>
                              <Grid.Row>
                                <Grid.Column width={15}>
                                  <div className="ui cards">
                                    <div className="card">
                                      <div className="header">
                                            No Sunrise Availability in this building
                                      </div>
                                    </div>
                                  </div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </div>
                        );
                }
    else if (this.props.SaltLoaded === 0) {
          return (
              <div>Loading</div>
              );
    }

  }

}

export default ConnectCardSunrise;
