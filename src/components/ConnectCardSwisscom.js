import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import swisscom from '../apis/swisscom.js';
import axios from 'axios';

const swisscomAPI =  (SwisscomReqData) => {

  console.log(' Inside SwisscomAPI ');

//  console.log(swisscom); https://crossorigin.me/  https://cors-anywhere.herokuapp.com/
    if (SwisscomReqData != null | typeof(SwisscomReqData) !== 'undefined') {

        const response =  axios.post('https://cors-anywhere.herokuapp.com/https://www.swisscom.ch/map-api/onlinenslg/lineinfo/',
          SwisscomReqData,
          { headers: {
            'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'Access-Control-Allow-Credentials':'true'
          }
        }
      ).then( (response) =>  { return (response.data) })
       .catch(function(error) {
                   console.error ( error )
                   return error.response;
                });
    }
}

const  renderSwisscom = (swisscomData) => {

    return (
        <div className="card">
            <div className="content">
              <div className="header">
                  Swisscom
              </div>
              <div className="description">
                  <div> <h3>Technology    : </h3>  {(swisscomData).broadbandInfo.technology}</div>
                  <div> <h3>Max Down Speed: </h3> {(swisscomData).broadbandInfo.maxDownSpeed}</div>
                  <div> <h3>Max Up Speed  : </h3>  {(swisscomData).broadbandInfo.maxUpSpeed}</div>
              </div>
              <div className="extra content">
                <div> <h3>TV tvAvailabilityInfo :</h3> {(swisscomData).broadbandInfo.tvAvailabilityInfo.tvStreamsText}</div>
              </div>
            </div>
        </div>
    );
}

const RenderInit = (swisscomData) => {

  return (
    <div>
      <h3>Connection Speeds & Details </h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={15}>
            <div className="ui cards">

               { renderSwisscom(swisscomData) }

             </div>
              </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}


const SwisscomCard = (props) => {

    console.log(props.SwisscomReqData.city);
    const SwisscomReqData = props.SwisscomReqData;

    const swisscomData = swisscomAPI(SwisscomReqData);

    console.log(swisscomData);

    if ( typeof(swisscomData) === 'undefined' ) {
      return (<div> Loading </div>);
    }
    else {
      RenderInit(swisscomData);
    }

    console.log(swisscomData);

  return swisscomAPI(SwisscomReqData);

};

export default SwisscomCard;
