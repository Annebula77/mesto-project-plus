module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: 'npm',
    args: 'start',
    watch: true,
    env: {
      NODE_ENV: 'development',
      JWT_SECRET: 'IAs6ALe54fznSABb/oSz3jT5YIz2zcYmFA/CgdUhGe4=',
      MESTO_MONGOD: 'mongodb://127.0.0.1:27017/mestodb',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      JWT_SECRET: 'IAs6ALe54fznSABb/oSz3jT5YIz2zcYmFA/CgdUhGe4=',  // Замените на ваш секрет JWT
      MESTO_MONGOD: 'mongodb://127.0.0.1:27017/mestodb',
      PORT: 3000
    }
  }]
};
