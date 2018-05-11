const http = require('superagent')

var dashDollarPrice;

const dashPriceUrl = 'https://api.coinmarketcap.com/v1/ticker/dash/';

async function loadDashDollarPrice() {

  let response = await http.get(dashPriceUrl);

  dashDollarPrice = parseFloat(response.body[0].price_usd)

  return;
}

module.exports.getDashDollarPrice = async function() {

  if (!dashDollarPrice) {
    await loadDashDollarPrice()
  }

  return dashDollarPrice
}

setInterval(loadDashDollarPrice, 1000 * 60) // reload price every minute
