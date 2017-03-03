worker_processes 2

$app_dir = "/var/www/html/jample.otakumesi.io"

working_directory $app_dir

listen File.expand_path "tmp/sockets/.unicorn.sock", $app_dir

timeout 30

pid File.expand_path "tmp/pids/unicorn.pid", $app_dir

stderr_path File.expand_path "log/unicorn.stderr.log", $app_dir
stdout_path File.expand_path "log/unicorn.stdout.log", $app_dir

preload_app true
check_client_connection false
run_once = true

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
  if run_once
    run_once = false
  end
  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end
