FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
# Resolve dependencies to speed up subsequent builds
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw package -DskipTests

# Define the run command
CMD ["java", "-Xmx256m", "-jar", "target/license_management-0.0.1-SNAPSHOT.jar"]
