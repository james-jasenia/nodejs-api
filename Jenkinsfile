pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'echo "Building..."'
                echo 'mvn clean install'
            }
        }
        stage('Test') {
            steps {
                echo 'echo "Testing..."'
                echo 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'echo "Deploying..."'
                echo 'mvn deploy'
            }
        }
    }
}
