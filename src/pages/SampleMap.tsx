import React, { useRef } from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
export const SampleMap = () => {
  const addressInput = useRef();
  const handlePlaceCange = () => {
    const [place] = addressInput.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };
  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyDpHg3LVjzq6G4umO823CglwYYblYN-MiI"
        libraries={['places']}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (addressInput.current = ref)}
          onPlacesChanged={handlePlaceCange}
        >
          <input
            // id="locationname"
            type="text"
            placeholder="Enter address"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </StandaloneSearchBox>
      </LoadScript>
    </div>
  );
};
