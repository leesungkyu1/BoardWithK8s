pipeline{
    agent any
    stages{
        stage('git pull'){
            steps{
                git url: 'https://github.com/leesungkyu1/BoardWithK8s.git', branch: 'main'
            }
        }
        // stage('define tag'){
        //     steps{
        //         // 젠킨스 스크립트
        //         script {
        //             if(env.BUILD_NUMBER.toInteger() % 2 == 1){
        //                 env.tag = "blue"
        //             }else{
        //                 env.tag = "green"
        //             }
        //         }
        //     }
        // }
        stage('build'){
            steps{
                sh '''
                ls
                cd ./server
                echo 'start bootJar'
                ./gradlew clean bootJar

                cd ../front/simple_board_with_k8s
                echo 'start npm build'
                npm install
                npm run build
                '''
            }
        }
        stage('docker build and push'){
            steps {
                sh '''
                cd ./server/docker
                docker build -t leesungkyu/simpleboardwithk8s .
                docker push leesungkyu/simpleboardwithk8s

                cd ./front
                docker build -t akm4545/simpleboard-front .
                docker push akm4545/simpleboard-front
                '''
            }
        }
        stage('k8s deploy'){
            steps{
                kubernetesDeploy(kubeconfigId: 'kubeconfig', configs: 'back.yaml')
                kubernetesDeploy(kubeconfigId: 'kubeconfig', configs: 'front.yaml')
            }
        }
    }

    // 무중단 배포 스크립트 추가 작성 필요
}