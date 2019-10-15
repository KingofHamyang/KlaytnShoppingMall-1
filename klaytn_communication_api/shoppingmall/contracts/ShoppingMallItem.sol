pragma solidity >=0.4.0 <0.6.0;

contract ShoppingMallItem{
    address serviceProvider;
    uint distribution;
    uint totalPrice;
    address ownerAddress;
    mapping(uint=>address)list;
    uint public index = 0;
    bool ok = true;
    uint public winNum;
    uint public price;
    
    modifier provider() {
        require(msg.sender == serviceProvider, "This function can be used by service provider!");
        _;
    }
    modifier Ok() {
        require(ok, "Staking is over!");
        _;
    }
    
    constructor (uint _distribution, uint _totalPrice, address _ownerAddress) public {
        require(_distribution > 0 && _ownerAddress != 0x0, "Please check the input!");
        serviceProvider = msg.sender;
        distribution = _distribution;
        totalPrice = _totalPrice;
        ownerAddress = _ownerAddress;
        price = totalPrice / distribution;
        winNum = _distribution;
    }
    
    function Staking(address _buyer) Ok provider payable public {
        require(index + 1 <= distribution, "distribution is max");
        require(msg.value >= price, "You have to pay more klay");
        if (msg.value > price) {
            address(_buyer).transfer(msg.value - price);
        }
        list[index++] = _buyer;
    }
    
    function remainStaking() public view returns(uint) {
        return distribution - index;
    }
    
    function lottery() public provider Ok returns(uint){
        require(index != 0, "There is no stake in this item");
        ok = false;
        winNum = uint(blockhash(block.number - 1)) % index;
    }
    
    function getWinner() public view returns(address) {
        return list[winNum];
    }
}