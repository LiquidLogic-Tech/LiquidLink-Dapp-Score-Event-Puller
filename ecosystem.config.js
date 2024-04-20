module.exports = {
  apps: [
    {
      name: "app-mainnet",
      script: "node",
      args: "-r ts-node/register/transpile-only src/index.ts",
      watch: true,
      env: {
        NETWORK: "mainnet",
      },
    },
    {
      name: "app-testnet",
      script: "node",
      args: "-r ts-node/register/transpile-only src/index.ts",
      watch: true,
      env: {
        NETWORK: "testnet",
      },
    },
  ],
};
