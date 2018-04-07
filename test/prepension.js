var PrePension = artifacts.require("./PrePension.sol");
var meta;

contract('PrePension', function(accounts) {
  it("addParticipant", function() {
    return PrePension.deployed().then(function(instance) {
      meta = instance;
      return meta.version();
    }).then(function(version) {
      assert.equal(web3.toUtf8(version), "PrePension v1.0.0", "Version is correct");
      return meta.addPension(accounts[1], "TKP");
    }).then(function (transaction) {
        var args = transaction.logs[0].args
        assert.equal(web3.toUtf8(args.id), "TKP");
        return meta.getPension('TKP');
    }).then(function (pension) {
        assert.equal(web3.toUtf8(pension[0]), 'TKP');
        assert.equal(pension[1].toNumber(), 0);
        assert.equal(pension[2], true);
    }).then(function () {

    });
  });

});
