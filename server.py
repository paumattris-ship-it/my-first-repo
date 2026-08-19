#!/usr/bin/env python3
"""
🖥️ server.py — isang napakaliit na web server para ma-preview ang repo.

Ginagawa nito:
  1. Hinahatid ang mga file ng repo (index.html, style.css, atbp.)
  2. Nagbibigay ng /api/gitlog — ang TUNAY na git history ng repo,
     para maipakita ng website ang sarili nitong kasaysayan. 😄
"""

import json
import os
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        if self.path == "/api/gitlog":
            try:
                output = subprocess.check_output(
                    [
                        "git",
                        "log",
                        "--pretty=format:%h|%ad|%s",
                        "--date=format:%b %d, %Y",
                    ],
                    cwd=ROOT,
                    text=True,
                )
                data = []
                for line in output.strip().split("\n"):
                    if "|" in line:
                        h, d, m = line.split("|", 2)
                        data.append({"hash": h, "date": d, "message": m})
                payload = json.dumps(data).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except Exception as exc:  # noqa: BLE001
                body = json.dumps({"error": str(exc)}).encode("utf-8")
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
        else:
            super().do_GET()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"🖥️  Nagse-serve ang repo sa http://0.0.0.0:{port}")
    HTTPServer(("0.0.0.0", port), Handler).serve_forever()
