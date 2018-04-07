var PrePension = artifacts.require("./PrePension.sol");

contract('PrePension', function(accounts) {
  it("addPensionAndParticipant", function() {

    let meta;

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
        assert.equal(pension[1], true);
        return meta.addParticipant(accounts[2], 'Terence', { from : accounts[1] });
    }).then(function (transaction) {
        var args = transaction.logs[0].args;
        assert.equal(web3.toUtf8(args.id), "Terence");
        return meta.getParticipant('Terence');
    }).then(function (participant) {
        assert.equal(web3.toUtf8(participant[0]), 'Terence');
        assert.equal(participant[1].toNumber(), 0);
        assert.equal(participant[2], true);
    });
  });

  it("addSupplier", function () {

    let meta;

    return PrePension.deployed().then(function(instance) {
      meta = instance;
      return meta.addSupplier(accounts[3], 'Hanze', { from : accounts[1] });
    }).then(function (transaction) {
      var args = transaction.logs[0].args;
      assert.equal(web3.toUtf8(args.id), "Hanze");
      return meta.getSupplier("Hanze");
    }).then(function (supplier) {
      assert.equal(web3.toUtf8(supplier[0]), 'Hanze');
      assert.equal(supplier[1].toNumber(), 0);
      assert.equal(supplier[2].toNumber(), 0);
      assert.equal(supplier[3], true);
    });
  });

  it("Mint", function () {

  });

});
