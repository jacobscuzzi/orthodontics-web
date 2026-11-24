#!/usr/bin/env bash
# Mirror the built site to the IONOS webspace over SFTP.
# Usage: SFTP_HOST=... SFTP_USER=... SFTP_PASSWORD=... [SFTP_TARGET_DIR=...] scripts/deploy.sh [dist]
set -euo pipefail

src=${1:-dist}
dir=${SFTP_TARGET_DIR:-.}
marker=.inselpraxis

: "${SFTP_HOST:?SFTP_HOST is not set}"
: "${SFTP_USER:?SFTP_USER is not set}"
: "${SFTP_PASSWORD:?SFTP_PASSWORD is not set}"

if [[ ! -f $src/$marker ]]; then
  echo "$src/$marker not found, run the build first" >&2
  exit 1
fi

export LFTP_PASSWORD=$SFTP_PASSWORD

remote() {
  lftp -c "set sftp:auto-confirm yes; set net:max-retries 3; set net:timeout 30; open --env-password -u '$SFTP_USER' 'sftp://$SFTP_HOST'; $1"
}

# --delete below would wipe whatever sits in the target, so never touch a
# directory that has content but was not created by this script.
err=$(mktemp)
trap 'rm -f "$err"' EXIT
if raw=$(remote "cd '$dir' && cls -1 -a" 2>"$err"); then
  existing=$(sed 's#/$##' <<<"$raw" | grep -vxE '\.\.?|' || true)
elif grep -qi 'no such file' "$err"; then
  existing=
else
  echo "could not list '$dir' on $SFTP_HOST:" >&2
  cat "$err" >&2
  exit 1
fi
if [[ -n $existing ]] && ! grep -qxF "$marker" <<<"$existing"; then
  echo "refusing to deploy: '$dir' on $SFTP_HOST is not empty and has no $marker" >&2
  head -n 15 <<<"$existing" >&2
  exit 1
fi

mirror="mirror -R --parallel=4 --verbose=1"

# Uploads are only ever added or replaced under a new name, so size is enough
# to compare them and saves re-sending every photo on each run.
if [[ -d $src/uploads ]]; then
  remote "$mirror --delete --ignore-time '$src/uploads' '$dir/uploads'"
fi

# Assets before pages, so no page goes live pointing at a stylesheet that is not there yet.
remote "$mirror --exclude '^uploads/' --exclude '\\.html\$' '$src' '$dir'"
remote "$mirror --delete --exclude '^uploads/' '$src' '$dir'"
