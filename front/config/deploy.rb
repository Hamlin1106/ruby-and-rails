# config valid for current version and patch releases of Capistrano
lock "~> 3.19.1"

set :application, "toho"
set :repo_url, "git@github.com:ekusos/manufacturing-management-system.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"
set :deploy_to, "/var/www/front"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", 'config/master.key'
# set :linked_files, fetch(:linked_files, []).push('tmpfile')

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor", "storage"
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

set :repo_tree, 'front'
set :branch, ask(:branch, 'main')

namespace :suitz do
  task :build do
    on roles :all do
      within release_path do
        execute :cp, '../../shared/.env', './'
        execute :yarn, 'install'
        execute :yarn, 'run build'
      end
    end
  end

  task :deploy do
    on roles :all do
      within release_path do
        execute :yarn, 'run', 'deploy:prod'
      end
    end
  end
end
after 'deploy:updated', 'suitz:build'
after 'deploy:published', 'suitz:deploy'
