!#/bin/zsh

pm2 start "bun run drip/index.ts" --name "drip-hb402a" && pm2 startup && pm2 save
pm2 start "bun run ruby/index.ts" --name "ruby-hb402b" && pm2 startup && pm2 save
pm2 start "bun run yuri/index.ts" --name "yuri-hb402c" && pm2 startup && pm2 save

echo "all slack bots started successfully"
