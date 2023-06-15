// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IRouter {
    function factory() external view returns (address);
}

interface IFactory {
    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address);
}

contract Pool {
    function fetchPair(
        address tokenA,
        address tokenB,
        address router
    ) external view returns (address) {
        IRouter(router).factory();
        IFactory factory = IFactory(IRouter(router).factory());
        return factory.getPair(tokenA, tokenB);
    }
}
