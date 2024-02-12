#!/bin/bash

# generate ts
npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=./src/api/proto \
    -I ./src/api/proto \
    src/api/proto/*.proto

# generate js
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./src/api/proto \
  -I ./src/api/proto \
  src/api/proto/*.proto
