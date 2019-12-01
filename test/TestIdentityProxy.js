const IdentityProxy = artifacts.require('IdentityProxy');

contract("IdentityProxy", async accounts => {
    let instance;

    beforeEach(async () => {
        instance = await IdentityProxy.new();
    })

    it("should set Data", async () => {
        let key = web3.utils.fromAscii("key");
        let value = web3.utils.fromAscii("value");
        let expected = web3.utils.toAscii(value);

        await instance.setData(key, value, { from: accounts[0] });

        let contractData = await instance.getData(key);
        let actual = web3.utils.toUtf8(contractData);

        assert.equal(actual, expected);
    })

    it("should not set data for non-owner accounts", async () => {
        let key = web3.utils.fromAscii("key");
        let value = web3.utils.fromAscii("value");
        let expected = '';


        try {
            await instance.setData(key, value, { from: accounts[1] });
        } catch (e) {
            assert(e.toString().includes('VM Exception while processing transaction: revert'), e.toString());
        }
        let contractData = await instance.getData(key);
        let actual = web3.utils.toUtf8(contractData);

        assert.equal(actual, expected);
    });


    it("should set emit DataChanged event", async () => {
        let key = web3.utils.fromAscii("key");
        let value = web3.utils.fromAscii("value");

        let response = await instance.setData(key, value, { from: accounts[0] });
        const event = response.logs[0];

        assert.equal("DataChanged", event.event);
        assert.equal(web3.utils.toUtf8(value), web3.utils.toUtf8(event.args.value));
        assert.equal(web3.utils.toUtf8(key), web3.utils.toUtf8(event.args.key));
    })

    it("sets owner in constructor", async () => {
        let owner = await instance.owner();
        assert.equal(owner, accounts[0])
    })

    it("allows owner to change ownership", async () => {
        let initialOwner = await instance.owner();
        let newOwner = accounts[1];

        await instance.changeOwner(newOwner, { from: accounts[0] });
        let actual = await instance.owner();

        assert.equal(actual, newOwner);
        assert.notEqual(actual, initialOwner);
    })

    it("should not allow non-owner to change ownership", async () => {
        let initialOwner = await instance.owner();
        let newOwner = accounts[1];
        try {
            await instance.changeOwner(newOwner, { from: newOwner });
        } catch (e) {
            assert(e.toString().includes('VM Exception while processing transaction: revert'), e.toString());
        }
        let actual = await instance.owner();

        assert.notEqual(actual, newOwner);
        assert.equal(actual, initialOwner);
    });

    it("emits an ownerChanged events ", async () => {
        let newOwner = accounts[1];

        let response = await instance.changeOwner(newOwner, { from: accounts[0] });
        const event = response.logs[0];

        assert.equal("OwnerChanged", event.event);
        assert.equal(newOwner, event.args.ownerAddress);
    })
})