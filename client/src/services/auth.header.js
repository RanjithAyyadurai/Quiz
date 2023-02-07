export default function authHeader () {
  const token = localStorage.getItem ('userToken');
  // console.log (token);
  if (token) {
    // for Node.js Express back-end
    return {'x-access-token': token};
  } else {
    return {};
  }
}
