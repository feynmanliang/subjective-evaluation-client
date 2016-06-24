#!/usr/bin/env zsh

container='client'

for fp in ./dist/*[js,html]; do
    azure storage blob upload $fp $container ${fp:t}
done
