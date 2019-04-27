import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import swisscom from '../apis/swisscom.js';
import axios from 'axios';

class ConnectCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  SwisscomResponse:null } ;

    console.log('constructor is called ');
  }

  renderSwisscom() {

    return (
        <div className="card">
            <div className="content">
              <div className="header">
                  Swisscom
              </div>
              <div className="description">
                  <div> <h3>Technology    : </h3>  {(this.props.SwisscomResponse).broadbandInfo.technology}</div>
                  <div> <h3>Max Down Speed: </h3> {(this.props.SwisscomResponse).broadbandInfo.maxDownSpeed}</div>
                  <div> <h3>Max Up Speed  : </h3>  {(this.props.SwisscomResponse).broadbandInfo.maxUpSpeed}</div>
              </div>
              <div className="extra content">
              </div>
            </div>
        </div>
    );
  }

//              {("tvStreamsText" in (this.props.SwisscomResponse).broadbandInfo.tvAvailabilityInfo) ?  <div> <h3>TV tvAvailabilityInfo :</h3> {(this.props.SwisscomResponse).broadbandInfo.tvAvailabilityInfo.tvStreamsText}</div> : <div></div>}

  render() {
    console.log('Inside Swisscom render ');
    console.log(this.props.SwissComLoaded);

    if (this.props.SwissComLoaded === 1)  {
          console.log('Inside Render ');

            return (
              <div>
                    <Grid.Column width={15}>
                      <div className="ui cards">

                         { this.renderSwisscom() }

                       </div>
                        </Grid.Column>

              </div>
            );
          }
    else if (this.props.SwissComLoaded === -1) {
                  return (
                    <div>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={15}>
                            <div className="ui cards">
                              <div className="card">
                                <div className="header">
                                      No Swisscom Availability in this building
                                </div>
                              </div>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  );
          }
    else if (this.props.SwissComLoaded === 0) {
          return (
              <div>Loading</div>
              );
    }

  }

}

export default ConnectCard;
