pipeline {
  agent {
    docker {
      image 'node:10.14-alpine'
      args '-p 3000:3000'
    }
  }

  environment {
    CI = 'true'

  }
  stages {

    stage('Load Config') {
      steps {
        load "$JENKINS_HOME/config/web.groovy"
      }
    }

    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh './jenkins/scripts/test.sh'
      }
    }

    stage('Deliver') {
      steps {
        sh './jenkins/scripts/deliver.sh'
        input message: 'Finished using the web site? (Click "Proceed" to continue)'
        sh './jenkins/scripts/kill.sh'
      }
    }

    stage('Deploy') {
      parallel {
        stage('Dev') {
          when {
            branch 'dev'
          }
          steps {
            withAWS(region: 'us-east-1', credentials: 'tgalske-AWS-creds') {
              s3Upload(bucket: 'dev.thegc.cf', workingDir: '/var/jenkins_home/workspace/web/build', includePathPattern:'**/*');
            }
          }
        }
        stage('Production') {
          when {
            branch 'master'
          }
          steps {
            withAWS(region: 'us-east-1', credentials: 'tgalske-AWS-creds') {
              s3Upload(bucket: 'thegc.cf', workingDir: '/var/jenkins_home/workspace/web/build', includePathPattern:'**/*');
            }
          }
        }
      }
    }
  }
}
