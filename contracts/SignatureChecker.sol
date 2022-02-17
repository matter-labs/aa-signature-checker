pragma solidity ^0.8.0;

import "./openzeppelin/ECDSA.sol";

library SignatureChecker {
    /** 
     * @dev Checks the signature of an account using ecrecover.
     * In the future, it will use EIP-1271 to validate signatures of AA contracts.
     */
    function checkSignature(
        address _address,
        bytes32 _hash,
        bytes memory _signature
    ) pure internal returns (bool) {
        (address recoveredAddress, ECDSA.RecoverError recoverError) = ECDSA.tryRecover(_hash, _signature);
        return recoverError == ECDSA.RecoverError.NoError && recoveredAddress == _address;
    }
}
