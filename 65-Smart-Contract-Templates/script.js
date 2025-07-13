document.addEventListener('DOMContentLoaded', () => {
    const templateSelectEl = document.getElementById('template-select');
    const showCodeBtn = document.getElementById('show-code-btn');
    const contractCodeEl = document.getElementById('contract-code');
    const copyBtn = document.getElementById('copy-btn');

    const templates = {
        erc20: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}`,
        erc721: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    constructor() ERC721("MyNFT", "MNFT") {
        // Mint your first NFT here
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}`,
        ownable: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    // Only the owner can call this function
    function doSomethingOnlyOwnerCan() public onlyOwner {
        // ...
    }
}`,
        pausable: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyPausableContract is Pausable, Ownable {
    // Only the owner can pause/unpause
    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() public onlyOwner whenPaused {
        _unpause();
    }

    // This function can only be called when not paused
    function doSomething() public whenNotPaused {
        // ...
    }
}`,
    };

    function displayTemplate() {
        const selectedTemplate = templateSelectEl.value;
        contractCodeEl.value = templates[selectedTemplate] || '';
    }

    showCodeBtn.addEventListener('click', displayTemplate);
    templateSelectEl.addEventListener('change', displayTemplate);

    copyBtn.addEventListener('click', () => {
        contractCodeEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コードをコピー';
        }, 2000);
    });

    displayTemplate(); // Initial display
});