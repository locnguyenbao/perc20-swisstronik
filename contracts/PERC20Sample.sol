// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./PERC20.sol";

/**
 * @dev Sample implementation of the {PERC20} contract.
 */
contract PERC20Sample is PERC20 {
    constructor() PERC20("Sample PERC20", "pSWTR") {}

    /// @dev Wraps SWTR to PSWTR.
    receive() external payable {
        _mint(_msgSender(), msg.value);
    }

    /**
     * @dev Regular `balanceOf` function marked as internal, so we override it to extend visibility  
     */ 
    function balanceOf(address account) public view override returns (uint256) {
        // This function should be called by EOA using signed `eth_call` to make EVM able to
        // extract original sender of this request. In case of regular (non-signed) `eth_call`
        // msg.sender will be empty address (0x0000000000000000000000000000000000000000).
        require(msg.sender == account, "PERC20Sample: msg.sender != account");

        // If msg.sender is correct we return the balance
        return _balances[account];
    }

    function mint(address to, uint256 amount) public {
        require(to != address(0), "PERC20Sample: mint to the zero address");
        require(amount > 0, "PERC20Sample: mint amount must be greater than zero");
        _mint(to, amount);
    }


    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev Regular `allowance` function marked as internal, so we override it to extend visibility  
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        // This function should be called by EOA using signed `eth_call` to make EVM able to
        // extract original sender of this request. In case of regular (non-signed) `eth_call`
        // msg.sender will be empty address (0x0000000000000000000000000000000000000000)
        require(msg.sender == spender, "PERC20Sample: msg.sender != account");
        
        // If msg.sender is correct we return the allowance
        return _allowances[owner][spender];
    }
}