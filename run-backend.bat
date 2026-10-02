@echo off
echo Starting LocalFix Java Spring Boot Backend...
set "JAVA_HOME=C:\Program Files\Java\jdk-26.0.1"
cd backend
"C:\Users\suban\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
