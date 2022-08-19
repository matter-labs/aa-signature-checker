pragma solidity ^0.8.0;

import { SignatureChecker } from "../SignatureChecker.sol";

contract TestSignatureChecker {
    using SignatureChecker for address;

    function isValidSignature(
        address _address,
        bytes32 _hash,
        bytes memory _signature
    ) public view returns (bool) {
        return _address.isValidSignatureNow(_hash, _signature);
    }
}
