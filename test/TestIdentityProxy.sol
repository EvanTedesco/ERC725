pragma solidity >=0.4.21 <0.6.0;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol"; 
import "../contracts/IdentityProxy.sol";




contract TestIdentityProxy{
    function testSetOwner() public {
       IdentityProxy proxy = IdentityProxy(DeployedAddresses.IdentityProxy());
       Assert.equal(proxy.owner(), msg.sender, "Owner is not deployer");
    }

    // function testSetData() public {
    //     IdentityProxy proxy = IdentityProxy(DeployedAddresses.IdentityProxy());
    //     bytes32 key = bytes32("key");
    //     bytes32 value = bytes32("value");

    //     proxy.setData(key, value);
    //     bytes32 actual = proxy.getData(key);

    //     Assert.equal(actual, value, "unexpected value");
    // }
} 
    // let proxy;
    // const fundingAccount = accounts[0];
    // const bettingAccount = accounts[1];
    // const fundingSize = 100;

    // // build up and tear down a new Casino contract before each test
    // beforeEach(async () => {
    //     proxy = await IdentityProxy.new({ from: fundingAccount });
      
    // });

    // it("gets and sets data", async () => {
    // bytes32 key = bytes("key");
    // bytes32 value = bytes("value");
    // const transaction = await proxy.setData(key, value);





    // afterEach(async () => {
    //     await casino.kill({ from: fundingAccount });
    // });



