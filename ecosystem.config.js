{

}
module.exports = {
    apps: [
        {
            "name":               "VAYYUP:DEVICES:API",
            "script":             "server.js",
            "ignore_watch":       ["node_modules","logs"],
            "exec_mode":          "cluster_mode",
            "instances":          2,
            "watch":              true,
            "merge_logs":         true,
            "env": {
                "NODE_ENV":         "production",
                "UV_THREADPOOL_SIZE":"10"
            }
        }
    ],
    deploy: {
        production: {
            key: '~/.ssh/id_rsa',
            user: 'ubuntu',
            host: 'vayyup.tadeoarmenta.com',
            ref: 'origin/master',
            repo: 'git@github.com:TadeoArmenta/Vayyup.git',
            path: '/home/ubuntu/Vayyup',
            /// Source the user's .zshrc file first!!
            'post-deploy': `source ~/.bashrc && \
             yarn install --ignore-engines && \
             pm2 reload ecosystem.config.js --env production && \
             pm2 save && \
             sudo cp nginx-deploy.conf /etc/nginx/sites-available/vayyup.conf`
        }
    }
};
