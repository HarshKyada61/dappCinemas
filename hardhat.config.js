require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      accounts: [
        "0x21acee38f23c56c9b7320dba38e95106a4a0c729c9aff197816c154ce2f4964b", // Paste private key from Ganache (1st account)
        "0x7483323c7eb98a69ce41ec508038ffd7ba460e96c08d1a6501767c762d39427a", // (Optional) More accounts if needed
        "0xd0cec475b5117c6145cbabac5869a4c76ec52f9d0bc8aacb8dcbb408710083b2"
      ],
    },
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis",
  },
  mocha: {
    timeout: 40000,
  },
};
