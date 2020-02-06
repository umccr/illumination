#!/usr/bin/env bash

folder_path="diakumis-dragen/test_tes_TN_align/"

(echo "["; \
    iap files list gds://${folder_path} -o json --page-size 100 | \
    jq -j '. | { path: .path, volume: .volumeName }' | \
    sed "s/}{/},{/g"; echo "]") | \
    jq -r '. | map([.volume, .path] | join(", ")) | join("\n")'
