# Account abstraction signature checker

A library for convenient, universal signature checking for zkSync 2.0.

Currently, it is a copy of the OpenZeppelin's [SignatureChecker](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/74738721dc9cfa820687f6b700d2583b16a21c0d/contracts/utils/cryptography/SignatureChecker.sol#L17) library. In the future, it will be slightly edited to avoid emitting warnings about `ecrecover` during compilation.
