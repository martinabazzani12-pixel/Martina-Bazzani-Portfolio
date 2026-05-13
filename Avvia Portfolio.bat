@echo off
cd /d "%~dp0"
echo.
echo  Avvio server locale per il portfolio...
echo  Apri il browser e vai su: http://localhost:8080
echo  Premi CTRL+C per fermare il server.
echo.
python -m http.server 8080
