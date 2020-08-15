import Axios from 'axios';

const RESOURCE = 'https://8x7idacyej.execute-api.us-east-1.amazonaws.com/prod';

export default {
  getPlayers() {
    return Axios.get(`${RESOURCE}/players`);
  },
};
