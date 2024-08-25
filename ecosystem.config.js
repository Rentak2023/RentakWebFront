/* eslint-disable unicorn/prefer-module */

module.exports = {
  apps: [
    {
      name: "rentak-app",
      script: ".next/standalone/server.js",
      // args: "start -p " + (process.env.PORT || 3000),
      watch: false,
      autorestart: true,
    },
  ],
};
