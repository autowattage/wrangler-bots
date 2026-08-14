!# /bin/zsh

cd drip && pm2 start "bun run index.ts" --name "drip-hb402a" && pm2 startup && pm2 save
cd ../ruby && pm2 start "bun run index.ts" --name "ruby-hb402b" && pm2 startup && pm2 save
cd ../yuri && pm2 start "bun run index.ts" --name "yuri-hb402c" && pm2 startup && pm2 save

cd ..
echo "all slack bots started successfully"
