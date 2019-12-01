const IdentityProxy = artifacts.require("./IdentityProxy.sol")

module.exports = function (deployer) {
    deployer.deploy(IdentityProxy)
}