import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Grid } from 'semantic-ui-react';
import axios from 'axios';

import Searchbar from './components/Searchbar';
import ConnectCard from './components/ConnectCard';
import ConnectCardSalt from './components/ConnectCardSalt';
import ConnectCardSwisscom from './components/ConnectCardSwisscom';
import ConnectCardSunrise from './components/ConnectCardSunrise';
import ConnectCardUPC from './components/ConnectCardUPC';



class App extends React.Component {

  state = { searchAddress:'' ,
            SwisscomResponse:'' ,
            SwissComLoaded:0 ,
            SaltResponse:'' ,
            SaltLoaded:0 ,
            SunriseResponse:'' ,
            SunriseLoaded:0,
            SunriseTech:'',
            UPCResponse:'' ,
            UPCLoaded:0
          };

  onSearchSubmit = async (term) => {

    console.log('inside onsearch submit of index.js');
    console.log(term);
    console.log('end of inside onsearch submit of index.js');


    let SwisscomReqData = {
                              address:
                              { zipCode4:'',
                                city:'',
                                street:'',
                                houseNumber:''}
                              , language:''
                            };

    let SaltReqData = {
                        zip_code: '',
                        city: '',
                        street: '',
                        house_number: ''
                      } ;

    let SunriseReqData = {
                          town: '',
                          postalCode: '',
                          streetName: '',
                          streetNumber: ''
                         } ;

    let UPCReqData = {
                        qs:
                        {
                          rfsStreetName:'',
                          rfsStreetNo:'',
                          rfsCityZip:''
                        }
                     }  ;

    console.log('Render index');

// Swisscom Address below //
    SwisscomReqData.language ='en' ;
    SwisscomReqData.address.zipCode4 = term.POSTOFFICE_CODE //'8152';
    SwisscomReqData.address.city = term.POSTOFFICE_NAME//'Glattpark (Opfikon)';
    SwisscomReqData.address.street = term.STREET_NAME//'Dufaux-Str.';
    SwisscomReqData.address.houseNumber = term.BUILDING_NUMBER //'2';

// Salt address below //
    SaltReqData.zip_code =  term.POSTOFFICE_CODE//'5400';
    SaltReqData.city = term.POSTOFFICE_NAME//'Baden';
    SaltReqData.street= term.STREET_NAME//'Sonnmattstrasse';
    SaltReqData.house_number = term.BUILDING_NUMBER//'3';
    SaltReqData.language = 'EN';
    SaltReqData.new_order ='false';

// Sunrise Address below //
    SunriseReqData.town = term.POSTOFFICE_NAME;
    SunriseReqData.postalCode = term.POSTOFFICE_CODE;
    SunriseReqData.streetName = term.STREET_NAME;
    SunriseReqData.streetNumber = term.BUILDING_NUMBER;

// UPC Address below //
    UPCReqData.qs.rfsStreetName = term.STREET_NAME;
    UPCReqData.qs.rfsStreetNo   = term.BUILDING_NUMBER;
    UPCReqData.qs.rfsCityZip = term.POSTOFFICE_CODE;

//    UPCReqData.qs.rfsStreetName = 'im hurdli';
//    UPCReqData.qs.rfsStreetNo   = '2';
//    UPCReqData.qs.rfsCityZip = '8152';

    console.log(this.state.searchAddress);

    this.setState({
      SwissComLoaded: 0,
      SaltResponse: 0,
      SunriseResponse: 0,
      UPCResponse: 0
    });

    this.setState({searchAddress: term});

    this.swisscomAPI(SwisscomReqData);

    this.SaltAPI(SaltReqData);

    this.SunriseAPI(SunriseReqData);

    this.UPCAPI(UPCReqData);

    }

  componentDidMount() {

  }

  swisscomAPI = async (SwisscomReqData) =>  {

    console.log('before try SwissComLoaded :' + this.state.SwissComLoaded);

    try {

//  console.log(swisscom); https://crossorigin.me/  https://cors-anywhere.herokuapp.com/
      if (SwisscomReqData != null | typeof(SwisscomReqData) !== 'undefined') {
          const response = await axios.post('https://cors-anywhere.herokuapp.com/https://www.swisscom.ch/map-api/onlinenslg/lineinfo/',
            SwisscomReqData,
            { headers: {
              'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
              'Access-Control-Allow-Origin':'http://localhost:3000',
              'Access-Control-Allow-Credentials':'true'
            }
          }
        );

        if (response.data.broadbandInfo.available === true) {

            this.setState({
              SwisscomResponse: response.data ,
              SwissComLoaded: 1
            });
        } else {
          this.setState({
            SwisscomResponse: response.data ,
            SwissComLoaded: -1
          });
        }

      }
    }
    catch (e) {

    this.setState({
      SwissComLoaded: -1
    });
   }

  console.log('SwissComLoaded :' + this.state.SwissComLoaded);
  console.log(this.state);

//    this.setState({ images: response.data.results });

  }


  UPCAPI = async (UPCReqData) =>  {

    console.log('before try UPCLoaded :' + this.state.UPCLoaded);
    console.log(UPCReqData);

    let UPCAddressQuery = '?rfsStreetName=' + UPCReqData.qs.rfsStreetName  + '&rfsStreetNo=' + UPCReqData.qs.rfsStreetNo + '&rfsCityZip=' + UPCReqData.qs.rfsCityZip ;

    try {

  //  console.log(swisscom); https://crossorigin.me/  https://cors-anywhere.herokuapp.com/
  //?rfsStreetName=Im%20H%C3%BCrdli&rfsStreetNo=2&rfsCityZip=8152
      if (UPCReqData != null | typeof(UPCReqData) !== 'undefined') {
          const response = await axios.get('https://cors-anywhere.herokuapp.com/https://www.upc.ch/services/commerce-services.checkServiceAbility'+UPCAddressQuery,
            { headers: {
              'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
              'Access-Control-Allow-Origin':'http://localhost:3000',
              'Access-Control-Allow-Credentials':'true',
              'Referer': 'https://www.upc.ch/en/',
              'Accept': 'application/json, text/javascript, */*; q=0.01'
            }
          }
        );

        console.log(response);

        if (response.data.status === 'SERVICES_AVAILABLE') {

            this.setState({
              UPCResponse: response.data ,
              UPCLoaded: 1
            });
        } else {
          this.setState({
            UPCResponse: response.data ,
            UPCLoaded: -1
          });
        }

      }
    }
    catch (e) {

    this.setState({
      UPCLoaded: -1
    });
   }

  console.log('UPC Loaded :' + this.state.UPCLoaded);
  console.log(this.state);

  //    this.setState({ images: response.data.results });

  }


  SunriseAPI = async ( SunriseReqData ) => {

      console.log('Before Try Sunrise API :' + this.state.SunriseLoaded);

      let tokenKey ='';

      console.log('SunriseAPI');

      let SunriseTech = '';

      if (SunriseReqData != null && typeof(SunriseReqData) !== 'undefined') {

          const response = await axios.get('https://cors-anywhere.herokuapp.com/https://www.sunrise.ch/csrf-secure','',
                {
                  headers:
                   {
                    'Postman-Token': '26ee1c60-0fb7-44ed-89f5-3cf555cb6f47',
                    'cache-control': 'no-cache',
                    'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
                    'Access-Control-Allow-Origin' :'http://localhost:3000'

                   }
                }
              ).then( response => { tokenKey = response.data.token }); // response.data.token);

             //console.log(response.data.token) ;

          if ( tokenKey !== '') {
                const response = await axios.post('https://cors-anywhere.herokuapp.com/https://www.sunrise.ch/sunrisecommercewebservices/v2/web/addresses/linecheck?'+'lang=en&token='+tokenKey,
                                {
                                  'segmentCode': 'RC',
                                  'swcDBResult': 'true',
                                  'productCodes': [ 'Basis Paket Home Bundle',
                                                    'Familien Paket Home Bundle',
                                                    'Sunrise Home Unlimited',
                                                    'Premium Paket Home Bundle'
                                                  ],
                                 'lookupPredecessor': 'false',
                                 'interactionNote': 'PostPexmanLineCheck',
                                 'address':
                                  { town: SunriseReqData.town,
                                    postalCode: SunriseReqData.postalCode,
                                    streetName: SunriseReqData.streetName ,
                                    streetNumber: SunriseReqData.streetNumber }
                                 }
                              ,
                              {
                                headers:
                                 { 'Postman-Token': '1f79ae1f-7149-4df1-80ca-5b05e3181915',
                                   'cache-control': 'no-cache',
                                   'Content-Type': 'application/json',
                                   'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
                                   'Origin': 'https://www.sunrise.ch',
                                   'Access-Control-Allow-Origin' :'http://localhost:3000'
                                 }
                             }
                            );

                if ('availableproducts' in response.data) {

                    console.log(response.data.availableproducts.map( d => (d.entitlements)).flatMap(q => q).filter(w=> w.entitlementName ==='internet speed'));

                    const InternetSpeeds = response.data.availableproducts.map( d => (d.entitlements)).flatMap(q => q).filter(w=> w.entitlementName ==='internet speed').map(w => w.value).join(' ');

                    console.log(InternetSpeeds);

                    if (InternetSpeeds.search('1 Gbits')) {
                      SunriseTech = 'Fibre'
                      }
                    else {
                      SunriseTech = 'HFC'
                    }

                    this.setState({
                      SunriseResponse: InternetSpeeds ,
                      SunriseLoaded: 1,
                      SunriseTech: SunriseTech
                    });
                }
                else {
                    this.setState({
                      SunriseResponse: '' ,
                      SunriseLoaded: -1
                    });
                }

                //console.log(arr1);
          }
      }

  }


  SaltAPI = async (SaltReqData) =>  {
    console.log('before try SaltLoaded :' +this.state.SaltLoaded);

  //  console.log(swisscom); https://crossorigin.me/
  try {

    console.log('SALT request');

    const response = await axios.post('https://cors-anywhere.herokuapp.com/https://fiber.salt.ch/fix-prospect-ui-service/eligibility_check',
           SaltReqData,
          {
            headers: {
            'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin' :'http://localhost:3000',
            'Access-Control-Allow-Credentials'  :'true',
            'Origin':'https://fiber.salt.ch',
            'Referer':'https://fiber.salt.ch/eshop/'
          }
        }
    );

    console.log('Salt Respone is : ');
    console.log(response.data);
    console.log('Salt Respone Completed : ');

    if ( response.data.valid) {
        console.log('SALT RESPONSE');
        console.log(response.data.valid);

        this.setState({
          SaltResponse: response.data ,
          SaltLoaded: 1
        });
    }
    else {
      console.log('SALT ELSE RESPONSE');

      this.setState({
        SaltResponse: response.data ,
        SaltLoaded: -1
      });
    }

  } catch (e) {
    this.setState({
      SaltResponse: '' ,
      SaltLoaded: -1
    });
  }

    console.log('SaltLoaded :' +this.state.SaltLoaded);
    console.log(this.state);
    }


  render() {

    console.log('Index render ');
    return (

      <div className="ui container" style={{ marginTop: '10px' }}>
        <Searchbar onSubmit={this.onSearchSubmit}/>
        {/* <ConnectCard SwisscomReqData={SwisscomReqData} dummy='0' searchTerm ={this.state.searchAddress}/> */}
        {/*  <ConnectCardSalt SaltReqData={SaltReqData} dummy='0'/> */ }

          <div>
            <div className="ui segment">
              {this.state.searchAddress.STREET_NAME ?
                <div className="field" style={{ textAlign: 'center' , fontWeight:'bold'}}>
                    {this.state.searchAddress.STREET_NAME + ' ' + this.state.searchAddress.BUILDING_NUMBER +
                      this.state.searchAddress.BUILDING_NUMBER_ANNEX + ', ' +
                      this.state.searchAddress.POSTOFFICE_CODE + ' ' + this.state.searchAddress.POSTOFFICE_NAME}
                </div> :
                <div></div>
              }
            </div>
          </div>

          <Grid columns='two' divided>
            <Grid.Row>
                 {this.state.SwissComLoaded ? <ConnectCard SwisscomResponse={this.state.SwisscomResponse} SwissComLoaded={this.state.SwissComLoaded} />: <div></div>}
                 {this.state.SaltLoaded ? <ConnectCardSalt SaltResponse={this.state.SaltResponse} SaltLoaded={this.state.SaltLoaded} />: <div></div>}
            </Grid.Row>
            <Grid.Row>
                 {this.state.SunriseLoaded ? <ConnectCardSunrise SunriseResponse={this.state.SunriseResponse} SunriseLoaded={this.state.SunriseLoaded} SunriseTech={this.state.SunriseTech} />: <div></div>}
                 {this.state.UPCLoaded ? <ConnectCardUPC UPCResponse={this.state.UPCResponse} UPCLoaded={this.state.UPCLoaded} />: <div></div>}
            </Grid.Row>

         </Grid>
      {/*   {this.state.searchAddress ? <ConnectCardSwisscom SwisscomReqData={SwisscomReqData} dummy='0' searchTerm ={this.state.searchAddress} />: <div> Loading Salt Data </div>} */}
      </div>
    );

  }
}

ReactDOM.render((
        <div>
            <App />
        </div>
),  document.getElementById('root'))


//ReactDOM.render(<App />, document.querySelector('#root'));
