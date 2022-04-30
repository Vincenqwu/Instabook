import Banner from "../components/Banner";
import Leftbar from "../components/Leftbar";
import { React, useState, useEffect } from 'react'
import useUserAuth from "../hooks/useUserAuth";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import "../style/page.css" 
import "../style/nearby.css"

const containerStyle = {
  width: '600px',
  height: '600px'
  // width: '50%',
  // height: '50%'
}

const center = {
  lat: 49.2806781,
  lng: -123.115747
}

export default function Nearby() {

  const [ authInfo, isLoggedIn ] = useUserAuth();
  const [ location, setLocation ] = useState(undefined);
  const [ markers, setMarkers] = useState([]);

  useEffect( () => {
    console.log("getting location");
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    }, (err) => {
      console.log("Getting location error", err);
    });
  }, [])

  useEffect( () => {
    async function updateLocation() {
      const _ = await fetch(`${process.env.REACT_APP_API_URL}/location/update`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include",
          body: JSON.stringify(location),
      }).then(data => data.json());
      // console.log("update response", _);
    }

    if(location !== undefined) {
      updateLocation();
    }
  }, [location]);

  useEffect( () => {
    async function getNearbyUsers() {
      const users = await fetch(`${process.env.REACT_APP_API_URL}/location/nearby`, {
          method: "GET",
          credentials: "include",
      }).then(data => data.json());
      const _ = users.map( (e) => {
        return {
          position: {
            lat: e.location.latitude,
            lng: e.location.longitude
          },
          picture: e.picture,
          username: e.username
        }
      });
      // console.log("__", _);
      setMarkers(_)
      console.log("nearbyUsers response", users);
    }

    if(location !== undefined) {
      getNearbyUsers(); 
    }
  }, [location])

  return (
    <>
      <Banner/>
      <div className="homeContainer">
        <Leftbar />
        {/* <LoadScript googleMapsApiKey="YOUR_API_KEY"> */}
        <LoadScript googleMapsApiKey="AIzaSyBU28lPHmJFt6RivHjR7_p3554hWe__v0o">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            // options={{
            //   zoomControl: false,
            //   disableDefaultUI: true
            // }}
          >
            {/* <Marker 
              position={center}
              icon={{
                url: "https://s.gravatar.com/avatar/173c5b90fa206be4fabc7aed7661cabc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsj.png",
                // scaledSize: new this.props.google.maps.Size(100, 100),
                // size: {width: 10, height: 10},
                scaledSize: {width: 20, height: 20},
              }}
            /> */}
            {
              (markers.length !== 0)?
              markers.map((e) => (
                  <Marker key={e.auth0Id} onClick={() => {window.location.href=`profile/${e.username}`}} position={e.position} icon={{url: e.picture, scaledSize:{width: 20, height: 20}}} />
              )): <></>
            }
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
  // return (
  //   <>
  //     <Banner/>
  //     <div className="homeContainer">
  //       <Leftbar />
  //     </div>
  //   </>
  // );
}