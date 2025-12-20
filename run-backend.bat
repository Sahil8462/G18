@echo off
echo Checking for processes on port 8084...

for /f "tokens=5" %%a in ('netstat -aon ^| find ":8084" ^| find "LISTENING"') do (
    echo Killing process %%a on port 8084...
    taskkill /f /pid %%a >nul 2>&1
)

echo Loading environment variables...
if exist backend\.env (
    echo Found .env file - using secure configuration
) else (
    echo WARNING: .env file not found! Please create one with your email credentials
    echo Continuing with default values...
)

echo Starting SmartHire Backend on port 8084...
cd backend
mvn spring-boot:run