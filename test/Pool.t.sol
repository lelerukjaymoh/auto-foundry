// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdJson.sol";
import "src/Pool.sol";

contract PoolTest is DSTest, Test {
    using stdJson for string;
    Pool pool;
    address tokenIn;
    address tokenOut;
    address router;
    address POOL_ADDRESS = 0x5Cce125E25A73bcF32c839F7EFc8c3D9e367A926;

    struct Data {
        uint a;
        string b;
    }

    function setUp() external {
        vm.createSelectFork(vm.envString("RPC_URL"));
        bytes32 transactionHash = vm.envBytes32("TXN_HASH");
        tokenIn = vm.envAddress("TOKEN_IN");
        tokenOut = vm.envAddress("TOKEN_OUT");
        router = vm.envAddress("ROUTER");

        vm.rollFork(transactionHash);

        pool = new Pool();
    }

    function testPool() external {
        address poolAddress = pool.fetchPair(tokenIn, tokenOut, router);

        assertEq(poolAddress, POOL_ADDRESS);
    }
}
