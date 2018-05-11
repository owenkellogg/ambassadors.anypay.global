const dashRpc = require('./dash_rpc');
const models = require('../models');

const DASHCORE_FROM_ACCOUNT = 4;

function sendDash(address, amount) {
  return new Promise((resolve, reject) => {

    dashRpc.sendFrom(DASHCORE_FROM_ACCOUNT, address, amount, function(err, resp) {
      if (err) { return reject(err) };
      resolve(resp);
    });

  });
};

module.exports.create = async function(ambassador_id, address, amount) {
  var amountToSend = amount || 0.01;

  let response = await sendDash(address, amountToSend);

  let activation = await models.Activation.create({
    ambassador_id: ambassador_id,
    currency: 'DASH',
    address: address,
    amount: amountToSend,
    txid: response.result
  })

  return activation;
}

