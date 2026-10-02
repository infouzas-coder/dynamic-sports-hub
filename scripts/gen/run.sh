#!/usr/bin/env bash
# Temporary: download Canva exports of the homepage product scenes into generated/
set -u
mkdir -p generated
while read -r name url; do
  curl -sSL --max-time 120 -o "generated/$name.jpg" "$url" && echo "ok $name"
done <<'LIST'
canva-apparel https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0003-1217615479410184401.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T213548Z&X-Amz-Expires=24664&X-Amz-Signature=ac9d19121913e88f8aee0a65f42b0364bc02b929592d0333fc2bfb8a11c8c250&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A26%3A52%20GMT
canva-sublimation https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0007-1217615479410184401.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T041847Z&X-Amz-Expires=87203&X-Amz-Signature=0881e9f005f47b1a5cdbad41d4e1354aa13c8e5b3fd34119e5324fdb759172c8&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A32%3A10%20GMT
LIST
ls -la generated
