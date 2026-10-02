#!/usr/bin/env bash
# Temporary: download Canva exports of the homepage product scenes into generated/
set -u
mkdir -p generated
while read -r name url; do
  curl -sSL --max-time 120 -o "generated/$name.jpg" "$url" && echo "ok $name"
done <<'LIST'
canva-gloves https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0002-8209453896972231575.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T185932Z&X-Amz-Expires=32902&X-Amz-Signature=d0666b3534ee116cae6d5384abb0c126a3f6781659b36e963750e230530ff6d6&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A07%3A54%20GMT
canva-apparel https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0003-8209453896972231575.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T083601Z&X-Amz-Expires=71848&X-Amz-Signature=228d81d576e455a0480238092030186ab7a73a2799843b047264a037262d752b&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A33%3A29%20GMT
canva-paintball https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0004-8209453896972231575.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261002%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261002T011917Z&X-Amz-Expires=11216&X-Amz-Signature=4a82e1ec8e24f4fb749adde1229508e38d8696d61c643d74b4b3f1d57a3eaf1d&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A26%3A13%20GMT
canva-martial https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0005-8209453896972231575.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T181209Z&X-Amz-Expires=37520&X-Amz-Signature=b10e789a44fc4830d3257400f9c2510f7ccb8cf837083d6bcb04dd3924721d7b&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A37%3A29%20GMT
canva-patches https://export-download.canva.com/fQtRg/DAHW0jfQtRg/-1/0/0006-8209453896972231575.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20261001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261001T121912Z&X-Amz-Expires=59452&X-Amz-Signature=0008718414e3a132be3c104a47089695667a2279deb2c5280d9b1c22853410c0&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2002%20Oct%202026%2004%3A50%3A04%20GMT
LIST
ls -la generated
