FROM openjdk:11
ARG JAR_FILE=*.jar
COPY ../build/lib/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]