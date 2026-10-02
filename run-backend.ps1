Write-Host "Starting LocalFix Spring Boot 3.3.4 (Java 21/26) Backend on port 8080..." -ForegroundColor Cyan
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-26.0.1', 'Process')
Set-Location -Path "$PSScriptRoot\backend"
& "C:\Users\suban\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
