@echo off
setlocal

rem Verifica se o opencode esta no PATH antes de tentar iniciar o servidor.
where opencode >nul 2>&1
if errorlevel 1 echo ERROR: opencode not found in PATH. && endlocal && exit /b 1

rem Verifica se o cloudflared esta no PATH para criar o tunel temporario.
where cloudflared >nul 2>&1
if errorlevel 1 echo ERROR: cloudflared not found in PATH. && endlocal && exit /b 1

rem Libera a porta 4096 encerrando o processo que ja estiver ocupando-a.
rem O filtro LISTENING e obrigatorio: sem ele o findstr tambem casa a porta
rem 4096 como endereco remoto e o taskkill derrubaria o navegador junto.
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":4096"') do taskkill /f /pid %%a >nul 2>&1

rem O servidor continua em 127.0.0.1 para nao ficar exposto diretamente na rede.
rem O cloudflared cria um Quick Tunnel e imprime uma URL temporaria publica.
start "OpenCode Web" /b opencode web --hostname 127.0.0.1 --port 4096

rem Aguarda o servidor ficar disponivel antes de iniciar o tunel.
set /a tentativas=0
:aguardar_servidor
netstat -ano | findstr "LISTENING" | findstr ":4096" >nul
if not errorlevel 1 goto iniciar_tunel
set /a tentativas+=1
if %tentativas% geq 30 goto servidor_indisponivel
timeout /t 1 /nobreak >nul
goto aguardar_servidor

:iniciar_tunel
echo.
echo O OpenCode esta disponivel. A URL publica sera exibida abaixo.
echo Pressione Ctrl+C para encerrar o tunel e o servidor.
cloudflared tunnel --url http://127.0.0.1:4096
goto encerrar

:servidor_indisponivel
echo ERROR: opencode did not start listening on port 4096.

:encerrar
rem Encerra o processo que escuta a porta quando o tunel termina.
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":4096"') do taskkill /f /pid %%a >nul 2>&1

endlocal
