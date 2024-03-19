module.exports = {
    apps: [
        {
            name: 'redis-server',
            script: 'redis-server',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            pre_restart: 'pm2 stop redis-server || true', // Stop redis-server before restart
            pre_delete: 'pm2 stop redis-server || true',  // Stop redis-server before delete
            pre_setup: 'pm2 stop redis-server || true',   // Stop redis-server before setup
        },


        {
            name: 'node-app',
            script: 'node src/app.js', // Path to your Node.js application entry file
            autorestart: true,
            "watch": true,
            "ignore_watch": ["node_modules"],
            "watch_options": {
                "usePolling": true,
                "interval": 1000
            },
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
        }
    ]
};
