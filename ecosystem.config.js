module.exports = {
  apps: [
    {
      name: "liquidlink-event-puller-mainnet",
      script: "node",
      args: "-r ts-node/register/transpile-only src/index.ts",
      watch: true,
      env: {
        NETWORK: "mainnet",
      },
    },
    {
      name: "liquidlink-event-puller-testnet",
      script: "node",
      args: "-r ts-node/register/transpile-only src/index.ts",
      watch: true,
      env: {
        NETWORK: "testnet",
      },
    },
  ],
};
