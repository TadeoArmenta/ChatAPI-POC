module.exports = {
    apps: [
        {
            name            : 'VAYYUP:DEVICES:API',
            script          : 'server.js',
            ignore_watch    : ['node_modules','logs'],
            exec_mode       : 'cluster_mode',
            instances       : 2,
            watch           : true,
            merge_logs      : true,
            env             : {
                'NODE_ENV'              : 'production',
                'UV_THREADPOOL_SIZE'    : '10'
            }
        }
    ],
    deploy: {
        production: {
            key         : '~/.ssh/id_rsa',
            user        : 'ubuntu',
            host        : 'vayyup.tadeoarmenta.com',
            ref         : 'origin/master',
            repo        : 'git@github.com:TadeoArmenta/Vayyup.git',
            path        : '/home/ubuntu/Vayyup',
            'pre-deploy': `export NVM_DIR="$HOME/.nvm" \
             [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
             [ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion" `,
            'post-deploy': `source ~/.profile && \
             yarn && \
             pm2 reload ecosystem.config.js --env production && \
             pm2 save && \
             sudo cp nginx-deploy.conf /etc/nginx/sites-available/vayyup.conf \
             sudo ln -s /etc/nginx/sites-available/vayyup.conf /etc/nginx/sites-enable/vayyup.tadeoarmenta.com \
             sudo nginx restart`
        }
    }
};
