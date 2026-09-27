@echo off
setlocal

rem Verifica se o opencode esta no PATH antes de tentar iniciar o servidor.
where opencode >nul 2>&1
if errorlevel 1 echo ERROR: opencode not found in PATH. && endlocal && exit /b 1

rem Libera a porta 4096 encerrando o processo que ja estiver ocupando-a.
rem O filtro LISTENING e obrigatorio: sem ele o findstr tambem casa a porta
rem 4096 como endereco remoto e o taskkill derrubaria o navegador junto.
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":4096"') do taskkill /f /pid %%a >nul 2>&1

rem Hostname 127.0.0.1: sem senha, escutar em todas as interfaces de rede
rem exporia o servico sem autenticacao a toda a rede local. Com 127.0.0.1 o
rem servidor escuta somente nesta maquina.
rem A porta 4096 vai escrita direto no comando, sem variavel de ambiente.
rem opencode web ja abre o navegador sozinho, nao ha start manual.
opencode web --hostname 127.0.0.1 --port 4096

endlocal
