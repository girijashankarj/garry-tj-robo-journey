#!/bin/bash
# Hook helper: check relative markdown links resolve to real files.
# Run standalone (bash .cursor/hooks/check-links.sh) or from pre-commit-check.sh.
# Skips templates (intentional placeholder links), temp/, node_modules/.
# Exit 1 if any broken links are found.

set -e

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

python3 - "$REPO_ROOT" <<'EOF'
import os, re, sys
from urllib.parse import unquote

root = sys.argv[1]
skip_dirs = {".git", "node_modules", "temp"}
# Placeholder links in these templates are filled in when the template is copied.
skip_prefixes = (
    os.path.join(root, "docs", "_templates"),
    os.path.join(root, ".cursor", "templates"),
)

checked, broken = 0, []
for dirpath, dirnames, filenames in os.walk(root):
    dirnames[:] = [d for d in dirnames if d not in skip_dirs]
    if dirpath.startswith(skip_prefixes):
        continue
    for name in filenames:
        if not name.endswith(".md"):
            continue
        path = os.path.join(dirpath, name)
        with open(path, encoding="utf-8", errors="ignore") as f:
            text = f.read()
        for m in re.finditer(r"\]\(([^)#\s]+)(#[^)]*)?\)", text):
            link = m.group(1)
            if link.startswith(("http://", "https://", "mailto:", "<")):
                continue
            target = os.path.normpath(os.path.join(dirpath, unquote(link)))
            checked += 1
            if not os.path.exists(target):
                broken.append(f"{os.path.relpath(path, root)} -> {link}")

print(f"Link check: {checked} relative links")
if broken:
    print(f"BROKEN ({len(broken)}):")
    for b in broken:
        print(f"  {b}")
    sys.exit(1)
print("All links resolve.")
EOF
