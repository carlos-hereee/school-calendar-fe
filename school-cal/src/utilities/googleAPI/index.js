/* eslint-disable */

class GoogleAPI {
  constructor() {
    this.initClient();
  }
  initClient = () => {
    const gapi = window.gapi;
    gapi.load("client", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_CLIENT_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        ],
        scope: "https://www.googleapis.com/auth/calendar"
      });

      gapi.client.load("calendar", "v3", () => {
        console.log("loaded calendar");
      });
    });
  };
}

export default GoogleAPI;
