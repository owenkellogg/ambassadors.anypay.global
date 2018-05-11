require('dotenv').config();

var RpcClient = require('bitcoind-rpc-dash');

var config = {
  protocol: 'https',
  user: process.env.DASH_RPC_USER,
  pass: process.env.DASH_RPC_PASSWORD,
  host: process.env.DASH_RPC_HOST,
  port: process.env.DASH_RPC_PORT
};

var rpc = new RpcClient(config);

module.exports = rpc;

