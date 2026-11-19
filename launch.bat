@echo off
title SIPSTATION
echo ========================================================
echo       SIPSTATION - Premium Beverage Storefront
echo ========================================================
echo Starting SIPSTATION...
cd /d "D:\beverages"

netstat -ano | findstr :3000 | findstr LISTENING >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting SIPSTATION server...
    start "SIPSTATION Server" /min cmd /c "node server.js"
    ping 127.0.0.1 -n 3 >nul
) else (
    echo SIPSTATION server is already active on port 3000.
)

echo Opening SIPSTATION in your browser...
start http://localhost:3000
exit
