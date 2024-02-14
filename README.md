1. 가상머신 세팅
   - 마스터, 워커 2대가 필요
   - 네트워크 세팅은 Vagrantfile을 메모장으로 열어서 확인
  
2. 서버 설정
   - config.sh 실행
   - config.sh에 레포지토리나 dns 설정등이 있으므로 필요시 확인
    * sh가 정상실행이 되지 않을경우
    sed -i -e 's/\r//g' <script file path> 실행

3. vim 에디터, 도커, 쿠버네티스 설치
   - install_pkg.sh를 실행하여 설치 및 데몬 실행
   - 사용하려는 쿠버네티스 버전에 호환되는 도커 버전을 사용해야 에러 없이 설치됨

4. 쿠버네티스 클러스터 초기화 / 마스터 노드 설정 / Pod 통신을 위한 calico 세팅
   - net_calico.yaml 오브젝트 파일과 master_node.sh 파일 작성 후 master_node.sh 실행
   - master_node.sh = 쿠버네티스 클러스터 초기화 / 마스터 노드 설정 / calico 실행
   - calico = Pod간의 네트워크 동신을 위한 네트워크 플러그인

5. 위의 1~3번 과정을 워커노드로 사용할 가상머신에 진행

6. 쿠버네티스 클러스터 조인
   - work_nodes.sh를 실행하여 쿠버네티스 클러스터 조인
   - kubectl get nodes로 클러스터가 잘 구성되었는지 확인

7. 헬름 설치
   - 헬름(helm) = 쿠버네티스에서 애플리케이션을 배포하기 위해 사용되는 패키징 툴
   - 헬름을 이용해 쿠버네티스에 원하는 애플리케이션을 간단하게 설치할 수 있다
   - 컨테이너 배포 뿐 아니라 애플리케이션을 배포하기 위해 필요한 쿠버네티스 리소스를 모두 패키지 형태로 배포하는 역할
   - 마스터 노드로 helm-install.sh 이동
   - helm-install.sh 를 export DESIRED_VERSION=v3.2.1; 헬름 쉘스크립트 ex) ./helm-install.sh 명령어와 같이 실행하여 버전을 정하면서 헬름 설치

8. MetalLB 설치
   - 마스터 노드에서 작업 진행
   - MetalLB = 온프레미스 환경에서 로드밸런서를 사용할 수 있게 해줌
   - 헬름 차트 저장소에서 metallb 검색 후 차트 저장소의 주소 확인
   - (실습 책의 저자의 repo를 사용해서 설치를 진행함)
   - helm repo add edu https://iac-source.github.io/helm-charts를 입력하여 헬름 차트 저장소 추가
   - helm repo list 를 사용하여 목록 확인
   - helm repo update를 사용하여 최신 차트 정보를 동기화
   - helm install metallb edu/metallb --namespace=metallb-system --create-namespace --set controller.tag=v0.8.3 --set speaker.tag=v0.8.3 --set configmap.ipRange=192.168.1.11-192.168.1.29 를 사용하여 metallb 설치
   - kubectl get pods -n metallb-system 명령어로 정상 배포되었는지 확인
 
9. DB 설치를 위한 PV, PVC 설정 (쿠버네티스 파드 위에 올린 DB 설정) - 다음 프로젝트때 쿠버네티스 오퍼레이터를 이용해서 DB 구성
   - PV = 클러스터가 관리하는 파일시스템을 저장하는 공간, 클러스터 내에 존재하는 볼륨
   - PVC = PV 자원의 사용방법을 정의한 요청서, PV에 접근하려면 PVC가 있어야 한다
