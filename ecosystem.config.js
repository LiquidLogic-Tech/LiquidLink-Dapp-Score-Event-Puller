module.exports = {
  apps: [
    {
      name: "test",
      script: "src/index.ts",
      interpreter: "ts-node",
      env: {
        NODE_ENV: "development",
        KV_URL:
          "redis://default:5ae91a60fcb344f5a7bb145f08c4dc1b@concrete-mule-45127.upstash.io:45127",
        KV_REST_API_URL: "https://concrete-mule-45127.upstash.io",
        KV_REST_API_TOKEN:
          "AbBHASQgOTZmNzMyZWMtM2VhZC00YTc5LTlhZWEtNjQxNjBjMGIyOTQ1NWFlOTFhNjBmY2IzNDRmNWE3YmIxNDVmMDhjNGRjMWI=",
        KV_REST_API_READ_ONLY_TOKEN:
          "ArBHASQgOTZmNzMyZWMtM2VhZC00YTc5LTlhZWEtNjQxNjBjMGIyOTQ1pvvqpWZGMc-ZcCJUS2fvb4EQ1AbzYSnKhhqZL7CJxnE=",
        NETWORK: "testnet",
        EVENT_TYPE:
          "0xc1f90f25c4f3e9c6196e15856f77e8e8e3928482d48e49605a60f9198d5ebdf7::dapp_score::UpdateRequestCreatedEvent",
      },
    },
  ],
};
