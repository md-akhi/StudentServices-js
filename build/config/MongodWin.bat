setlocal

FOR /F "tokens=*" %%i in ('type .env') do SET %%i

start CMD /c %DB_Start% --dbpath %DB_path%
timeout 2
start CMD /c %DB_Connect%

endlocal
 exit

