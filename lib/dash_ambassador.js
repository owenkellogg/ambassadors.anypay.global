
const models = require('../models');

module.exports.create = async (name, email, address) => {

  let ambassador = await models.Ambassador.create({ name, email })

  await models.Address.create({
    currency: 'DASH',
    pubkey: address,
    ambassador_id: ambassador.id
  });

  return ambassador;
}

