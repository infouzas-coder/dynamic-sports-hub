#!/usr/bin/env bash
# Temporary: check that www.uzassports.com pages are served from Vercel's edge cache
mkdir -p generated
{
for path in /gloves /about /; do
  for n in 1 2 3; do
    echo "== $path try $n"
    curl -s -o /dev/null -D - "https://www.uzassports.com$path" | grep -i -E "^(x-vercel-cache|age|x-vercel-id):"
    sleep 2
  done
done
} | tee generated/cache-check.txt
