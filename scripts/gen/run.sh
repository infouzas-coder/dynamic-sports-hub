#!/usr/bin/env bash
# Calls the image-gen preview route for each prompt and saves the results into generated/
set -u
BASE="https://dynamic-sports-j27j8zhsh-uzas.vercel.app"
SHARE="$BASE/?_vercel_share=hrpiRoA2IDupmyYDIHqrWa7gV8AxrP6C"
mkdir -p generated
curl -sS -c jar -b jar -L -o /dev/null "$SHARE"
python3 - <<'PY' > urls.txt
import json, urllib.parse
for k, v in json.load(open("scripts/gen/prompts.json")).items():
    print(k, "/api/gen-image?name=" + k + "&w=768&h=960&prompt=" + urllib.parse.quote(v))
PY
while read -r name path; do
  [ -f "generated/$name.jpg" ] && continue
  for try in 1 2; do
    out=$(curl -sS -b jar -c jar --max-time 290 "$BASE$path")
    echo "$name: $out"
    url=$(echo "$out" | python3 -c "import json,sys;print(json.load(sys.stdin).get('url',''))" 2>/dev/null)
    if [ -n "$url" ]; then curl -sS -o "generated/$name.jpg" "$url" && break; fi
  done
done < urls.txt
ls -la generated
