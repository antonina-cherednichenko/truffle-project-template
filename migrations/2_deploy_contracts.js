var TestContract = artifacts.require('./Test.sol')


module.exports = function(deployer) {
  deployer.deploy(TestContract)
}
