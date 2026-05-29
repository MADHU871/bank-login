pipeline {

    agent any

    environment {

        IMAGE = "mad0008271/bank-login"

    }

    stages {

        stage('Git Clone') {

            steps {
                git 'https://github.com/MADHU871/bank-login.git'
            }
        }

        stage('Docker Build') {

            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {

            steps {
                sh 'docker push $IMAGE'
            }
        }

        stage('Docker Deploy') {

            steps {

                sh '''
                docker stop bank-container || true
                docker rm bank-container || true

                docker run -d \
                --name bank-container \
                -p 8080:80 \
                $IMAGE
                '''
            }
        }
    }
}