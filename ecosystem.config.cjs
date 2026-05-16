module.exports = {
  apps: [
    {
      name: "99blog",
      cwd: "/var/www/apps/99blog/current",
      script: "npm",
      args: "run start -- --hostname 127.0.0.1 --port 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        BLOG_DB_PATH: "/var/www/data/99blog/99blog.sqlite",
        ADMIN_BASIC_AUTH_USER: "admin",
        ADMIN_BASIC_AUTH_PASSWORD: "CHANGE_ME_BEFORE_DEPLOY",
      },
      error_file: "/var/log/pm2/99blog-error.log",
      out_file: "/var/log/pm2/99blog-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
