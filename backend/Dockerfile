# Render has no native Java runtime, so the backend ships as a container.
# Multi-stage: build the jar with Maven, then run it on a slim JRE.

# ---------- build ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build

# Copy the POM first so the dependency layer is cached between code-only pushes.
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q clean package -DskipTests

# ---------- run ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Run as a non-root user.
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /build/target/localfix-backend-1.0.0.jar app.jar
USER app

# Render injects PORT and expects the service to bind to it.
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -XX:MaxRAMPercentage=75 -Dserver.port=${PORT} -jar app.jar"]
