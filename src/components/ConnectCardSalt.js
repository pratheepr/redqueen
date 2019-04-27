import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
//import swisscom from '../apis/swisscom.js';
import axios from 'axios';

class ConnectCardSalt extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dummy:0 } ;
  }


renderSalt() {

    if ((this.props.SaltResponse).valid)  {
    //if ('otoInfo' in (this.props.SaltResponse).results[0].infos)  {

          return (
              <div className="card">
                  <div className="content">
                    <div className="header">
                        <h3>Salt</h3>
                    </div>
                    <div className="description">
                        <div> <h3>Technology    : </h3>  {(this.props.SaltResponse).results[0].infos.otoInfo.otoId}</div>
                        <div> <h3>Max Down Speed: </h3> {(this.props.SaltResponse).results[0].infos.bep.maxAccessSpeedKbps}</div>
                        <div> <h3>Bep Builder  : </h3>  {(this.props.SaltResponse).results[0].infos.bep.bepBuilder}</div>
                    </div>
                    <div className="extra content">
                      <div> <h3>OTO Info  :</h3> {(this.props.SaltResponse).results[0].infos.otoInfo.otoId}</div>
                    </div>
                  </div>
              </div>
          );
      }
    else if ('access_construction_status' in (this.props.SaltResponse).results[0].infos) {
            return (
                <div className="card">
                    <div className="content">
                      <div className="header">
                          <h3>Salt</h3>
                      </div>
                      <div className="description">
                          <div> <h3>Status     : </h3>  {(this.props.SaltResponse).results[0].infos.access_construction_status}</div>
                          <div> <h3>Bep Builder  : </h3>  {(this.props.SaltResponse).results[0].ordering}</div>
                      </div>

                    </div>
                </div>
            );
      }
}


renderSaltNew() {

    if ((this.props.SaltResponse).valid)  {
    //if ('otoInfo' in (this.props.SaltResponse).results[0].infos)  {

          return (
              <div className="card">
                  <div className="content">
                    <div className="header">
                        <h3>Salt</h3>
                    </div>
                    <div className="description">
                        <div> <h3>Technology    : </h3>  Fibre </div>
                    </div>
                    <div className="extra content">
                      <div> Salt Available in this location </div>
                    </div>
                  </div>
              </div>
          );
      }
}


  render() {

    console.log(this.props.SaltResponse);

    console.log('Inside salt render');
    console.log(this.props.SaltLoaded);

    if ( this.props.SaltLoaded === 1 ) {
            return (
              <div>
                    <Grid.Column width={15}>
                      <div className="ui cards">

                         { this.renderSaltNew() }

                       </div>
                      </Grid.Column>

              </div>
            );
      }
      else if (this.props.SaltLoaded === -1) {
              return (
                <div>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={15}>
                        <div className="ui cards">
                          <div className="card">
                            <div className="header">
                                  No Salt Availability in this building
                            </div>
                          </div>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              );
      }
      else if (this.props.SaltLoaded === 0)
      {
        return (<div> Salt Data Loading </div>);
      }

    }

}

export default ConnectCardSalt;
