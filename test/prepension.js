var PrePension = artifacts.require("./PrePension.sol");

contract('PrePension', function(accounts) {
  it("addPensionAndParticipant", function() {

    let meta;

    return PrePension.deployed().then(function(instance) {
      meta = instance;
      return meta.version();
    }).then(function(version) {
      assert.equal(web3.toUtf8(version), "PrePension v1.0.0", "Version is correct");
      return meta.addPension(accounts[1], "APG");
    }).then(function (transaction) {
        var args = transaction.logs[0].args
        assert.equal(web3.toUtf8(args.id), "APG");
        return meta.getPension('APG');
    }).then(function (pension) {
        assert.equal(web3.toUtf8(pension[0]), 'APG');
        assert.equal(pension[1], true);
        return meta.addParticipant(accounts[2], "Terence", { from : accounts[1] });
    }).then(function (transaction) {
        var args = transaction.logs[0].args;
        assert.equal(web3.toUtf8(args.id), "Terence");
        return meta.getParticipant("Terence");
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

    let meta;

    return PrePension.deployed().then(function(instance) {
      meta = instance;
      return meta.mint("APG", "Terence", 40000, { from : accounts[1] });
    }).then(function (transaction) {
      var args = transaction.logs[0].args;
      assert.equal(web3.toUtf8(args.participant), "Terence");
      assert.equal(web3.toUtf8(args.pension), "APG");
      assert.equal(args.coins.toNumber(), 4000);
      assert.equal(args.balance.toNumber(), 40000);
      return meta.getMintedForParticipant("APG", "Terence");
    }).then(function (minted) {
      assert.equal(minted.toNumber(), 4000);
      return meta.getPensionBalance("Terence", "APG");
    }).then(function (balance) {
      assert.equal(balance.toNumber(), 40000);
      return meta.getParticipantBalance('Terence');
    }).then(function (balance) {
      assert.equal(balance.toNumber(), 4000);
      return meta.addPension(accounts[4], "TKP");
    }).then(function (){
      return meta.mint("TKP", "Terence", 60000, { from : accounts[4] });
    }).then(function (transaction) {
      var args = transaction.logs[0].args;
      assert.equal(web3.toUtf8(args.participant), "Terence");
      assert.equal(web3.toUtf8(args.pension), "TKP");
      assert.equal(args.coins.toNumber(), 6000);
      assert.equal(args.balance.toNumber(), 60000);
      return meta.getMintedForParticipant("TKP", "Terence");
   }).then(function (minted) {
      assert.equal(minted.toNumber(), 6000);
      return meta.getParticipantBalance('Terence');
    }).then(function (balance) {
      assert.equal(balance.toNumber(), 10000);
      return meta.getNumberOfPensions("Terence");
    }).then(function (no) {
      assert.equal(no.toNumber(), 2);
      return meta.getParticipantPension("Terence", 2);
    }).then(function (pension) {
      assert.equal(web3.toUtf8(pension[0]), "TKP");
      assert.equal(pension[1].toNumber(), 60000);
    });
  });

});
