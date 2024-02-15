// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.2;

// contract ErcToken {
//      string public  name;
//      string public symbol;
//      uint public decimal;
//      uint public _totalSupply;
//      address public TokenOwner;

//      mapping(address=>uint) balances;
//      mapping (address=>mapping(address=>uint)) allowedBy;
//      event Transfer(address indexed from, address indexed to, uint256 value);
//      event Approval(address indexed owner, address indexed spender, uint256 amount);

//      constructor() {
//         name="CaveDev";
//         symbol="CVD";
//         decimal=8;
//         TokenOwner=msg.sender;
//        _totalSupply=100000000;
//          balances[TokenOwner]= _totalSupply;
//      }

//      function gettotalSupply() public view returns (uint256) {
//         return _totalSupply;
//      }

//      function balanceOf(address _owner)public view returns (uint256) {
//         return balances[_owner];
//      }

//      function transfer(address _to, uint256 _amount)public returns(bool success) {
//         require(_amount > 0, "Amount must be greater than zero");
//           // Calculate the amount to deduct (10% of the _amount)
//     uint256 deduction = _amount * 10 / 100;

//     uint256 transferAmount = _amount - deduction;

//         balances[msg.sender]=balances[msg.sender]-_amount;

//         balances[_to]=balances[_to] + transferAmount;

//         _totalSupply -= deduction;

//        emit Transfer(msg.sender, _to, transferAmount);

//         return true;
//      }

//       function approve(address spender, uint256 amount) public returns (bool success) {
//           require(balances[msg.sender] >= amount);
//            require(amount > 0);
//           allowedBy[msg.sender][spender]= amount;

//             emit Approval(msg.sender, spender, amount);
//           return true;
//      }

//      function transferFrom(address _from, address _to, uint256 amount)public returns(bool success) {
//        require(allowedBy[_from][msg.sender] >= amount, "Not enough allowance");

//       require(balances[_from] >= amount, "Insufficient balance");

//            balances[_from] = balances[_from] - amount;

//            balances[_to] =balances[_to] + amount;

//             // Deduct the amount from the allowance
//            allowedBy[_from][msg.sender] -= amount;

//            return true;
//      }

//      function allowance(address _owner, address spender)public view returns (uint remains) {
        
//         uint accountBalanace= allowedBy[_owner][spender];

//         return accountBalanace;
//      }

// }