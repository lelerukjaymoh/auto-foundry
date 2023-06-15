// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdJson.sol";
import "src/Pool.sol";

contract PoolTest is DSTest, Test {
    using stdJson for string;
    Pool pool;
    address tokenA;
    address tokenB;
    address router;
    address POOL_ADDRESS = 0x5Cce125E25A73bcF32c839F7EFc8c3D9e367A926;

    struct Data {
        uint a;
        string b;
    }

    function setUp() external {
        vm.createSelectFork(vm.envString("RPC_URL"));
        uint blockNumber = vm.envUint("BLOCK_NUMBER");
        tokenA = vm.envAddress("TOKEN_A");
        tokenB = vm.envAddress("TOKEN_B");
        router = vm.envAddress("ROUTER");

        vm.rollFork(blockNumber);

        pool = new Pool();
    }

    function testPool() external {
        address poolAddress = pool.fetchPair(tokenA, tokenB, router);

        assertEq(poolAddress, POOL_ADDRESS);
    }
}
