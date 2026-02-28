#!/usr/bin/env bash

set -e

IMAGE="ghcr.io/imjustnon/comcamp37-staff-x"
PLATFORMS="linux/amd64,linux/arm64"

# Create/use buildx builder for multi-arch
docker buildx create --name multiarch --use 2>/dev/null || docker buildx use multiarch

docker buildx build \
  -f Dockerfile \
  --platform "$PLATFORMS" \
  -t "$IMAGE:latest" \
  -t "$IMAGE:$(git rev-parse --short HEAD)" \
  --push \
  .

echo "Build and push complete: $IMAGE"