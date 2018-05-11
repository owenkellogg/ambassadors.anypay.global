const assert = require("assert");
const models = require("../../models");
const DashAmbassador = require("../../lib/dash_ambassador");
const DashActivation = require("../../lib/dash_activation");
const Chance = require('chance');
const chance = new Chance();

describe("Activations", () => {

  var ambassador;

  before(async () => {
    ambassador = await DashAmbassador.create(
      chance.word(),
      chance.email(),
      'Xm9mxWHSYW7mYEw1rDi5DTtQc6LKuFiegT'
    )
  })

  describe("Activating a Dash Account", () => {

    it("should not activate an account that has funds");

    it("should send 0.01 DASH to the address provided", async () => {

      let activation = await DashActivation.create(
        ambassador.id,
        'Xm9mxWHSYW7mYEw1rDi5DTtQc6LKuFiegT',
        0.001
      );

      console.log('ACTIVATION', activation);

      assert(activation.id)
      assert(activation.txid)
      assert(activation.address)
      assert.strictEqual(activation.ambassador_id, ambassador.id)
    });

  })

});

