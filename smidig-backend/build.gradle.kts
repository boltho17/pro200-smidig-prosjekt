import org.jetbrains.kotlin.gradle.tasks.KotlinCompile


buildscript {
	repositories {
		mavenCentral()
	}
	dependencies {
		classpath("org.springframework.boot:spring-boot-gradle-plugin:2.1.4.RELEASE")
	}
}


apply {
	plugin("java")
	plugin("eclipse")
	plugin("idea")
	plugin("org.springframework.boot")
	plugin("io.spring.dependency-management")
}


plugins {
	val kotlinVersion = "1.3.31"
	id("org.springframework.boot") version "2.1.4.RELEASE"
	id("org.jetbrains.kotlin.jvm") version kotlinVersion
	id("org.jetbrains.kotlin.plugin.spring") version kotlinVersion
	id("org.jetbrains.kotlin.plugin.jpa") version kotlinVersion
}

version = "1.0.0-SNAPSHOT"

/*springBoot {
	mainClassName = "smidig/Application.kt"
}*/

tasks.withType<KotlinCompile> {
	kotlinOptions {
		jvmTarget = "1.8"
		freeCompilerArgs = listOf("-Xjsr305=strict")
	}
}


tasks.withType<Test> {
	useJUnitPlatform()
}

repositories {
	mavenCentral()
}

dependencies {
	compile("org.springframework.boot:spring-boot-starter-web")
	compile("org.springframework.boot", "spring-boot-starter-security", "2.1.5.RELEASE")
	compile("org.springframework.boot", "spring-boot-starter-websocket", "2.1.5.RELEASE")
	compile("org.springframework", "spring-messaging", "5.1.5.RELEASE")
	compile( "com.fasterxml.jackson.module", "jackson-module-kotlin", "2.9.9")
	compile("org.springframework.security", "spring-security-messaging", "5.1.5.RELEASE")
	compile("com.squareup.okhttp3", "okhttp", "3.4.2")
	compile("io.jsonwebtoken", "jjwt", "0.9.0")
	compile("org.springframework.boot:spring-boot-starter-data-jpa")
	compile("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	compile("org.jetbrains.kotlin:kotlin-reflect")
	testCompile("org.springframework.boot:spring-boot-starter-test") {
		exclude(module = "junit")
	}
	testImplementation("org.junit.jupiter:junit-jupiter-api")
	testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
	compile("org.postgresql","postgresql", "42.0.0")
	testCompile("com.h2database:h2")
	compile( "com.google.code.gson:gson:2.8.5")
	compile("com.auth0:java-jwt:3.8.1")
}

