const Client = require('./sparcsssov2-node.js');

const client = new Client(
  process.env.SSO_CLIENT_ID,
  process.env.SSO_SECRET_KEY,
  false,
);

export default client;
