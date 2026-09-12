@echo off
cd /d "%~dp0"
set "PATH=C:\Users\23277\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
node node_modules/vite/bin/vite.js --host 127.0.0.1
pause
