// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Pool.sol";

contract PoolTest is Test {
    Pool pool;

    function setUp() external {
        vm.createSelectFork(vm.envString("RPC_URL"));

        pool = new Pool();
    }

    function testPool() external view {
        address tokenA = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
        address tokenB = 0x4f1F70c19ECB09248d3791F2404c35A0C187C2B4;
        address router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

        pool.fetchPair(tokenA, tokenB, router);
    }
}
