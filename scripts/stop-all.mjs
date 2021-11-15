#!/usr/bin/env zx

const services = [
  'message-broker',
  'sso-api',
]

if (argv.help || argv.h) {
  console.log(`./start.mjs [--h] [--help] target`);
  process.exit();
}

for (let service of services) {
  await $`cd apps/${service}; docker-compose down`
}