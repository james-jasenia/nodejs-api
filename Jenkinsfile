pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building..."'
                sh 'mvn clean install'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Testing..."'
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying..."'
                sh 'mvn deploy'
            }
        }
    }
}
