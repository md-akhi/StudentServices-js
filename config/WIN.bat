@ECHO OFF

set DB_Start=%1
set DB_Connect=%2
set DB_path=%3

ECHO "Start MongoDB."
 start CMD /c %DB_Start% --dbpath %DB_path%

timeout 2

ECHO "Connect to MongoDB."
 start CMD /c %DB_Connect%

 exit

