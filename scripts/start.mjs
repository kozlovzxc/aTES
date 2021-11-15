#!/usr/bin/env zx

const commonServices = [
    "message-broker"
]

if (argv._.length !== 2 || argv.help || argv.h) {
    console.log(`./start.mjs [--h] [--help] target`)
    process.exit()
}

const target = argv._[1]

for (let service of commonServices) {
    await $`docker-compose -f apps/${service}/docker-compose.yml up --build -d`
}
await $`docker-compose -f apps/${target}/docker-compose.yml -f apps/${target}/docker-compose.dev.yml up --build`