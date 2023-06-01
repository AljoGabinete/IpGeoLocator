const token = '058f6218db35b7';
const BASE_URL = 'https://ipinfo.io';

export const getIpDetails = async ip => {
  try {
    if (!ip) {
      const response = await fetch(`${BASE_URL}?token=${token}`);
      return response.json();
    } else {
      const response = await fetch(`${BASE_URL}/${ip}?token=${token}`);
      return response.json();
    }
  } catch (error) {
    return 'Failed to Fetch Ip Details';
  }
};
