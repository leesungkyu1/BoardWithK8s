pipline{
    agent any
    stages{
        stage('git pull'){
            steps{
                git url: 'https://github.com/leesungkyu1/BoardWithK8s.git', branch: 'main'
            }
        }
        stage('docker build and push'){
            steps {
                // dockerfile 추가시 front, back dockerfile 작성 스크립트 추가
                sh '''
                docker build -t 192.168.1.10:8443/echo-ip .
                docker push 192.168.1.10:8443/echo-ip
                '''
            }
        }
        stage('k8s deploy'){
            steps{
                kubernetesDeploy(kubeconfigId: 'kubeconfig', configs: 'back.yaml')
            }
            steps{
                kubernetesDeploy(kubeconfigId: 'kubeconfig', configs: 'front.yaml')
            }
        }
    }

    // 무중단 배포 스크립트 추가 작성 필요
}