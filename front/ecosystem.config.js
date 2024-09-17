module.exports = {
  apps: [
    {
      name: "toho",
      exec_mode: "cluster",
      instances: "max",
      script: "node_modules/next/dist/bin/next",
      cwd: "/var/www/front/current",
      args: "start",
      env_local: {
        APP_ENV: "local",
      },
      env_dev: {
        APP_ENV: "dev",
      },
      env_prod: {
        APP_ENV: "prod",
      },
    },
  ],
};
