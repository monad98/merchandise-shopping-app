import { GoogleMap, Marker, withGoogleMap} from "react-google-maps";
import React from "react";
import Geosuggest from "react-geosuggest";
import StoreSearchOptionComponent from "./StoreSearchOption";

const GoogleMapContainer = withGoogleMap(({markers, arrows, center}) => (
  <GoogleMap
    defaultZoom={10}
    center={center}>
    {markers.map((marker, index) => (
      <Marker
        {...marker}
      />
    ))}
    {arrows.map((arrow, index) => (
      <Marker
        {...arrow}
      />
    ))}
  </GoogleMap>
));

const SearchNearStoreComponent = ({markers, arrows, stores, center, distOption, locFormat, updateLocation, changeLocationFormat, changeDistance}) =>(
  <div style={{height: `100%`}}>
    <GoogleMapContainer
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `400px` }} />}
      center={center}
      arrows={arrows}
      markers={markers}
    />
    <br/>
    <StoreSearchOptionComponent changeDistance={changeDistance}
                                changeLocationFormat={changeLocationFormat}
    />
    <h5>Your Location</h5>
    <Geosuggest
      placeholder="Enter address"
      initialValue="San Diego, CA, United States"
      onSuggestSelect={updateLocation}
      queryDelay={150}
      country="us"
    />
  </div>

);

SearchNearStoreComponent.propTypes = {
};

export default SearchNearStoreComponent;