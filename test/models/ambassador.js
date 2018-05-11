const assert = require("assert");
const models = require("../../models");
const DashAmbassador = require("../../lib/dash_ambassador");
const Chance = require('chance');
const chance = new Chance();

describe("Ambassador Model", () => {

  it("should require an email address and dash address", async () => {
    var email = chance.email();
    var name = chance.word();
    var dashAddress = 'Xm9mxWHSYW7mYEw1rDi5DTtQc6LKuFiegT';

    let ambassador = await models.Ambassador.create({
      email,
      name,
    })

    await models.Address.create({
      ambassador_id: ambassador.id,
      currency: 'DASH',
      pubkey: dashAddress
    });

    let addresses = await models.Address.findAll({
      where: { ambassador_id: ambassador.id }
    })

    assert(ambassador.uid);

    assert.strictEqual(addresses[0].pubkey, dashAddress);

  });

  describe("Dash Ambassador", () => {

    it("create should create an ambassador with address", async () => {
      var email = chance.email();
      var name = chance.word();
      var dashAddress = 'Xm9mxWHSYW7mYEw1rDi5DTtQc6LKuFiegT';

      let ambassador = await DashAmbassador.create(name, email, dashAddress);

      let addresses = await models.Address.findAll({
        where: { ambassador_id: ambassador.id }
      })

      assert.strictEqual(addresses[0].pubkey, dashAddress);

    });

  })

});

