var PrePensionLib = artifacts.require('./PrePensionLib.sol');
var PrePensionBase = artifacts.require('./PrePensionBase');
var PrePension = artifacts.require('./PrePension');

module.exports = function(deployer) {

  deployer.deploy(PrePensionLib);
  deployer.link(PrePensionLib, PrePensionBase);
  deployer.deploy(PrePensionBase);
  deployer.deploy(PrePension);


};
