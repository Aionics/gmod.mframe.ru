module.exports = {
  apps : [{
    name: 'gmod.mframe.ru',
    script: 'app.js',
    autorestart: true,
    watch: ["api.js", "app.js", "chat.js", "www"],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
