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
   - sudo rm /etc/containerd/config.toml 입력
   - systemctl restart containerd 입력
   - master_node.sh 파일 작성 후 master_node.sh 실행
   - master_node.sh = 쿠버네티스 클러스터 초기화 / 마스터 노드 설정 / calico 실행
   - calico = Pod간의 네트워크 동신을 위한 네트워크 플러그인

6. 위의 1~3번 과정을 워커노드로 사용할 가상머신에 진행

7. 쿠버네티스 클러스터 조인
   - work_nodes.sh를 실행하여 쿠버네티스 클러스터 조인
   - kubectl get nodes로 클러스터가 잘 구성되었는지 확인

8. 헬름 설치
   - 헬름(helm) = 쿠버네티스에서 애플리케이션을 배포하기 위해 사용되는 패키징 툴
   - 헬름을 이용해 쿠버네티스에 원하는 애플리케이션을 간단하게 설치할 수 있다
   - 컨테이너 배포 뿐 아니라 애플리케이션을 배포하기 위해 필요한 쿠버네티스 리소스를 모두 패키지 형태로 배포하는 역할
   - 마스터 노드로 helm-install.sh 이동
   - helm-install.sh 를 export DESIRED_VERSION=v3.7.0; 헬름 쉘스크립트 ex) ./helm-install.sh 명령어와 같이 실행하여 버전을 정하면서 헬름 설치

9. MetalLB 설치
   - 마스터 노드에서 작업 진행
   - MetalLB = 온프레미스 환경에서 로드밸런서를 사용할 수 있게 해줌
   - 헬름 차트 저장소에서 metallb 검색 후 차트 저장소의 주소 확인
   - helm repo add metallb https://metallb.github.io/metallb
   - helm install metallb metallb/metallb --namespace=metallb-system --create-namespace (추후 옵션이 가능한지 파악 필요)
   - kubectl get validatingwebhookconfigurations 기존 설정을 확인한다
   - kubectl delete validatingwebhookconfigurations  metallb-webhook-configuration 기존 설정을 지운다
   - kubectl get validatingwebhookconfigurations 삭제 확인 
   - kubectl apply -f metallb-config.yaml 을 실행하여 설정을 배포한다
   - kubectl describe ipaddresspool.metallb.io --namespace metallb-system 잘 배포되었는지 확인
  
   - ------------------------------ 낮은 버전에서 사용 ------------------------------------------
   - helm repo add edu https://iac-source.github.io/helm-charts를 입력하여 헬름 차트 저장소 추가
   - helm repo list 를 사용하여 목록 확인
   - helm repo update를 사용하여 최신 차트 정보를 동기화
   - helm install metallb edu/metallb --namespace=metallb-system --create-namespace --set controller.tag=v0.8.3 --set speaker.tag=v0.8.3 --set configmap.ipRange=192.168.1.11-192.168.1.29 를 사용하여 metallb 설치
   - ------------------------------ 낮은 버전에서 사용 ------------------------------------------
   - kubectl get pods -n metallb-system 명령어로 정상 배포되었는지 확인
 
10. DB 설치를 위한 PV, PVC 설정 (쿠버네티스 파드 위에 올린 DB 설정) - 다음 프로젝트때 쿠버네티스 오퍼레이터를 이용해서 DB 구성
   - PV = 클러스터가 관리하는 파일시스템을 저장하는 공간, 클러스터 내에 존재하는 볼륨
   - PVC = PV 자원의 사용방법을 정의한 요청서, PV에 접근하려면 PVC가 있어야 한다
   - db 폴더에서 db-pv.yaml 파일과 db-pvc.yaml 파일을 마스터 노드에 옮긴다
   - 쿠버네티스 클러스터에서 PV를 공유하기 위해 nfs 서버를 활성화해야 한다
   - db-pv.yaml 파일을 열어 pv로 사용할 디렉토리를 mkdir명령으로 만든다 ex)mkdir /nfs_folder - 해당 프로젝트는 nfs 폴더명을 기준으로 되어있음
   - echo '/파일경로 192.168.1.0/24(rw,sync,no_root_squash)' >> /etc/exports 명령어를 사용해 NFS서버로 받아들일 IP를 기록한다
   - systemctl enable --now nfs 를 입력하여 NFS 서버를 활성화 시킨다
   - kubectl apply -f db-pv.yaml 명령어와 kubectl apply -f db-pvc.yaml 명령어를 입력하여 PV, PVC를 생성한다
   - kubectl get pv 와 kubectl get pvc를 입력하여 PV, PVC가 정상 생성되었는지 확인한다
   - PV의 status 는 bound 상태여야 정상작동
   - db 폴더의 mysql-db.yaml 파일과 mysql-secret.yaml 파일을 마스터 노드로 옮긴다
   - kubectl apply -f mysql-secret.yaml 을 실행하여 DB의 password가 담긴 secret을 배포한다 (secret 값들은 base64 인코딩이 되어있어야 한다)
   - kubectl apply -f mysql-db.yaml을 실행하여 DB를 배포한다
   - kubectl get secret 과 kubectl get pods를 입력하여 정상 배포되었는지 확인한다
   - kubectl expose deploy mysql-db --port 3306 --type LoadBalancer을 입력하여 db를 로드밸런서 타입으로 노출시킨다
   - kubectl get service를 입력하여 정상적으로 service로 노출되었는지 확인한다

11. backend 배포
   - backend 폴더의 back.yaml 파일을 마스터 노드로 옮긴다 (DB 연결정보는 yaml에 명시했지만 추후 시크릿으로 처리 필요)
   - 도커 hub에서 이미지를 가져오기 위해 kubectl create secret docker-registry docker-login --docker-username=<도커ID> --docker-password=<도커PW> 를 사용해서 secret 값을 만든다
   - 명령어 중에 특수문자가 포함되어 있다면 작은 따옴표를 사용하여 이스케이프 처리를 해줘야 한다
   - kubectl apply -f back.yaml을 실행하여 배포한다
   - 정상적으로 배포되었는지 kubectl get pods 로 파드 목록 출력 후 kubectl logs 파드name 을 넣어 로그를 확인한다
   - kubectl expose deploy simple-board --port 8070 --type LoadBalancer을 입력하여 backend를 로드밸런서 타입으로 노출시킨다
   - (해당 명령어는 yaml에 service로도 기술 가능)

11. frontend 배포
   - kubectl get service를 입력하여 백엔드가 어느 ip로 노출되었는지 파악한다
   - externa-ip로 frontend api 요청 주소를 교체한다
   - front.yaml 파일을 마스터 노드로 옮긴다
   - kubectl apply -f front.yaml을 실행하여 배포한다
   - 정상적으로 배포되었는지 kubectl get pods 로 파드 목록 출력 혹은 kubectl describe deployment react-app으로도 가능
   - kubectl expose deploy react-app --port 80 --type LoadBalancer을 입력하여 frontend를 로드밸런서 타입으로 노출시킨다
   - kubectl get service 명령어를 입력하여 external-ip와 포트번호를 확인하고 웹브라우저에 입력하여 정상배포되었는지 확인한다

12. CI/CD를 위한 jenkins 설치
   - 젠킨스의 설정과 구성 파일들이 파드가 사라져도 유지되도록 PV, PVC를 위한 설정이 필요하다
   - jenkins 폴더 내의 nfs-exporter.sh 파일을 마스터 노드로 옮긴다
   - nfs-exporter.sh 쉘 스크립트를 jenkins 매개변수와 같이 실행하여 PV, PVC를 생성하고 nfs 서버를 재시작한다
   - ./nfs-exporter.sh jenkins (nfs 폴더 기준으로 작성되어 있어 경로를 바꾸고 싶다면 sh 수정)
   - 젠킨스 컨트롤러에서 기본적으로 사용하는 유저ID와 그룹ID는 1000번이다 따라서 nfs 폴더에 권한을 부여해야한다
   - 해당 프로젝트 기준 chown 1000:1000 /nfs/jenkins 를 입력하여 소유자를 변경한다
   - ls -n /nfs 를 입력하여 반영이 되었는지 확인한다
   - jenkins 폴더에서 jenkins-volume.yaml 파일을 마스터 노드로 옮긴다
   - kubectl apply -f jenkins-volume.yaml를 실행하여 젠킨스용 PV, PVC를 생성한다
   - kubectl get pv 와 kubectl get pvc를 입력하여 정상적으로 생성되고 바운드가 되었는지 확인한다
   - jenkins 폴더 내의 jenkins-install.sh 파일을 마스터 노드로 옮긴다
   - sh 내부에 jenkins config 파일 정보와 설치 노드 정보가 있다 (해당 정보는 해당 프로젝트 및 공부한 책의 저자의 github에 연결되어 있으므로 필요시 수정)
   - jenkins-install.sh를 실행하여 젠키스를 설치한다
   - kubectl get deployment를 입력하여 정상 배포되었는지 확인한다
   - kubectl get serivce를 입력하여 젠킨스가 정상적으로 외부랑 통신할 수 있는 상태인지 확인한다
   - kubectl get serivce를 입력하였을때 jenkins의 external-ip와 port를 확인하고 해당 주소를 브라우저에 입력하여 젠킨스에 접속한다
   - 젠킨스의 ID, PW는 admin/admin으로 설정되어있으므로 로그인하여 정상 구동되는지 확인한다
   - 젠킨스 플러그인 업데이트를 위해 메뉴에서 젠킨스 관리 > 플러그인 관리 메뉴로 이동한다
   - 업데이트된 플러그인 목록에서 최하단의 Compatible를 클릭한다
   - 지금 다운로드하고 재시작 후 설치하기 버튼을 눌러서 플러그인을 업데이트 한다
   - 다운로드 화면에서 설치가 끝나고 실행중인 작업이 없으면 Jenkins 재시작. 을 체크한다
   - 젠킨스 관리 > 노드 관리 화면으로 들어간다
   - 왼쪽 메뉴에서 Configure Clouds로 들어서 Pod Templates 버튼을 누른다
   - 펼쳐진 포드 템플릿에서 Pod Template details 버튼을 누른다
   - 중간 환경변수에서 JENKINS_URL을 kubectl get service 시 나왔던 external-ip로 변경한다
   - Container Template 항목에서 고급... 버튼을 누른다
   - 에이전트용 파드 자원 부족시 클러스터 망가질 위험이 있음!!!
   - 하단에 Apply 후에 Save를 눌러 변경된 설정을 저장한다
   - kubectl get serviceaccounts로 jenkins 서비스 어카운트가 존재하는지 확인한다
   - 젠킨스의 파드에서 쿠버네티스 API 서버와의 통신을 위해 admin 권한을 부여한다
   - kubectl create clusterrolebinding jenkins-cluster-admin --clusterrole=cluster-amdin --serviceaccount=default:jenkins
   - kubectl get clusterrolebindings jenkins-cluster-admin -o yaml 을 입력하여 롤 바인딩이 정상적으로 진행됬는지 확인한다
     
13. jenkins로 CI/CD 구현 (작성중)
   - 젠킨스에 로그인하여 접속한다
   - 젠킨스 관리 > 플러그인 관리 > 설치 가능 으로이동한다
   - Kubernetes Continuous Deploy 플러그인을 검색하여 체크하고 지금 다운로드하고 재시작후 설치하기를 누른다
   - 넘어가는 화면에서 설치가 끝나고 재시작을 체크한다
   - 프론트 엔드 배포를 위해 NodeJS 플러그인을 설치해야 한다
   - ----------------------------- 젠킨스 버전 문제로 다른 방법 사용 ----------------------------------
   - Jenkins 관리 -> 플러그인 관리 -> 설치 가능 탭 -> NodeJs 검색 후 설치
   - Jenkins 관리 -> 플러그인 관리 -> 지금확인 버튼 클릭
   - Version에 NodeJS 15.6.0을 작성한다
   - - ----------------------------- 젠킨스 버전 문제로 다른 방법 사용 ----------------------------------
   - Jenkins 관리 -> Global Tool Configuration 메뉴로 이동한다
   - 하단에 NodeJS -> Add NodeJS 버튼을 누른다
   - Add Installer 에서 Extract *.zip... 을 누른다
   - Download URL for binary archive 항목에 https://nodejs.org/dist/v17.4.0/node-v17.4.0-linux-x64.tar.gz를 입력
   - Subdirectory of extracted archive 항목에 node-v17.4.0-linux-x64를 입력
   - Name 탭에 이름을 작성한다 ex)nodejs-15.6.0
   - 하단에 apply save 버튼을 누른다
   - 지속적 배포 플러그인은 자격 증명 정보를 따로 관리하여 등록해야 한다
   - 젠킨스 관리 > Manage Credentials로 이동한다
   - global 버튼을 누른다
   - 쿠버 설정파일이 있는 마스터 노드에 접속권한이 필요하므로 왼쪽 메뉴에서 Add Credentials를 눌러 추가한다
   - Username에 마스터 노드 리눅스 접속 계정 id를 기입한다
   - Password에 마스터 노드 리눅스 접속 계정 pw를 기입한다
   - ID에 자격 증명을 사용할때 식별할 값을 넣는다 ex)m-k8s-ssh
   - 하단에 OK 버튼을 눌러 저장한다
   - 다시 Add Credentials버튼을 눌러 쿠버설정 파일에 대한 자격 증명을 추가한다
   - kind 항목을 Kubernetes configuration (kubeconfig) 항목으로 바꾼다
   - ID에 자격 증명을 사용할때 식별할 값을 넣는다 ex)kubeconfig
   - Kubeconfig 항목에서 From a file on the Kubernetes master node를 체크한다
   - Server 항목에 마스터 노드가 존재하는 컴퓨터의 ip를 입력한다
   - SSH Credentials에는 아까 설정한 ssh 접근정보를 넣는다 ex)m-k8s-ssh
   - 하단에 OK 버튼을 눌러 저장한다
   - 젠킨스 메인화면으로 돌아와 새로운 Item 메뉴를 클릭한다
   - Enter an item name에 Item 식별값을 입력한다 ex)simple-board
   - Pipline 항목을 클릭하고 ok를 누른다
   - 상위 메뉴의 Build Triggers를 클릭한다
   - Poll SCM 체크박스를 클릭하고 크론식으로 원격 저장소의 코드가 변경되었는지 체크하는 시간을 넣는다 ex) */10 * * * *
   - 상위 메뉴의 Pipline을 클릭한다
   - Definition 에서 Pipline script from SCM을 선택한다
   - SCM은 git으로 선택한다
   - Repository URL은 git 소스코드가 있는 저장소의 주소를 입력한다
   - Branches to build 항목은 체크할 브렌치를 넣는다 ex) */main
   - apply버튼을 누르고 저장버튼을 눌러 item을 저장한다 (Jnekinsfile 필요)
   - 서버 컴퓨터에 git config --global user.name "사용자 이름", git config --global user.email "사용자 이메일" 명령어를 입력한다
   - git config --global credential.helper "store --file ~/.git-cred"을 입력하여 계정정보를 저장한다
   - 깃 토큰을 발급하여 password를 입력한다
   - Jenkins 관리 -> Manage Credentials -> global -> Add Credentials를 누른다
   - UserName에 도커허브 계정을 넣는다
   - Password에 도커허브 토큰을 넣는다
   - id에 자격증명을 식별할 수 있는 값을 넣는다
   
14. Slack hook을 이용한 배포 알림
   - 슬랙에 회원가입 후 설치를 진행한다
   - 왼쪽 메뉴 하단에 앱 메뉴에서 앱 추가 버튼을 누른다
   - Jenkins CI 앱을 추가한다
   - Jenkins CI 앱을 클릭하고 구성 버튼을 누른다
   - 출력되는 웹페이지에서 Slack에 추가 버튼을 누른다
   - 하단의 새 채널 생성 버튼을 눌러 채널을 생성한다
   - 셀렉트 박스의 화살표를 눌러(정확하게 눌러야함) 추가한 채널을 선택한다
   - Jenkins CI 통합 앱 추가 버튼을 누른다
   - 다음 페이지에서 토큰값을 복사해서 저장한 뒤 설정 저장 버튼을 누른다
   - 슬랙 프로그램에서 왼쪽메뉴 최상단의 워크스페이스 화살표 버튼을 눌러 도메인 주소를 확인하고 저장한다
   - 젠킨스 홈 -> 젠킨스 관리 -> Managed Credentials -> (global)로 이동한다
   - Add Credentials 버튼을 누른다
   - Kind = Secret text, Secret = 슬랙 토큰, ID = slack-key로 입력하고 등록한다
   - 젠킨스 홈 -> 젠킨스 관리 -> 플러그인 관리 -> 설치 가능 탭으로 이동한다
   - Slack Notification을 검색하여 지금 다운로드하고 재시작 후 설치하기 버튼을 누른다
   - 다음 화면에서 설치가 끝나고 실행 중인 작업이 없으면 Jenkins 재시작 체크박스를 체크한다
   - 젠킨스 홈 -> 젠킨스 관리 -> 시스템 설정으로 이동한다
   - 스크롤 최하단에 Slack 항목에 Workspace = 도메인, Credential = 방금 설정한 slack-key, Default channel/member id = 젠킨스 메세지를 받으려고 생성한 채널 명을 입력한다
   - apply 후 save를 눌러 저장한다
   - Jenkinsfile에 slack 관련 stage를 주석 해제하고 깃에 업로드 한다
   - 빌드를 진행시키고 알림이 오는지 확인한다
   - 배포 변경사항 자동 비교를 위한 플러그인 설치
   - 젠킨스 홈 -> 젠킨스 관리 -> 플러그인 관리 -> 설치 가능 탭으로 이동한다
   - Last Changes를 검색하여 설치한다
   - Jenkinsfile에 diff stage를 주석 해제하고 빌드한다
   - slack에 메세지가 잘 오는지 확인한다
     
15. 그라파나, 프로메테우스 설치
   - 프로메테우스 = 수집 대상이 공개하는 메트릭 데이터를 모아 시계열 데이터베이스에 저장
   - prometheus폴더에 prometheus-server-preconfig.sh 파일과 prometheus-server-volume.yaml 파일을 마스터 노드의 같은 폴더에 옮긴다
   - prometheus-server-preconfig.sh를 실행하여 프로메테우스의 데이터를 저장할 볼륨을 설정하고 권한을 준다
   - kubectl get pv, kubectl get pvc를 실행하여 정삭적으로 작동하였는지 확인한다
   ---------------------------------- kubernetes 버전 변경으로 인해 학습용 helm template 미지원 -------------------
   - prometheus-install.sh 파일을 마스터 노드로 옮기고 실행시켜 설치한다
   ---------------------------------- kubernetes 버전 변경으로 인해 학습용 helm template 미지원 -------------------
   - helm repo add prometheus-community https://prometheus-community.github.io/helm-charts를 입력하여 저장소를 추가한다
   - helm repo update를 입력하여 저장소를 최신화 시킨다
   - helm pull prometheus-community/prometheus를 입력하여 프로메테우스 환경구성을 할 수 있는 파일을 다운받는다
   - tar xvfz <프로메테우스 압축파일 명>을 입력하여 압축을 해제한다
   - 압축을 해제한 파일 중 values.yaml파일을 수정한다
   - existingClaim 항목의 값을 방금 만든 pvc값으로 바꾼다
   - type 항목의 값을 metallb로부터 외부 IP를 할당받아 웹 ui로 확인할 수 있도록 LoadBalancer로 설정한다
   - extraFlags 항목중에 storage.tsdb.no-lockfile 항목의 주석을 해제한다 (해당 설정이 없으면 설정 변경작업 실패)
   - securityContext 항목의 runAsGroup,runAsUser,fsgroup 1000번으로 바꾼다 (nfs서버 유저가 1000번이기 때문)
   - tolerations의 []를 지우고
   - - key: "node-role.kubernetes.io/control-plane"
      operator: "Exists"
      effect: "NoSchedule"
   - 를 입력한다
   - pushgateway와 alertmanager항목의 enable을 false로 변경하여 비활성화 시킨다
   - values.yaml 파일 경로에서 helm install prometheus prometheus-community/prometheus -f values.yaml 명령어를 입력하여 프로메테우스를 설치한다
   - kubectl get service prometheus-server를 입력하여 service가 정상 작동하는지 확인하고 external-ip를 브라우저에 입력하여 정상 작동하는지 확인한다
   - grafana폴더에 grafana-preconfig.sh 파일과 grafana-volume.yaml 파일을 마스터 노드로 옮긴다
   - grafana-preconfig.sh를 실행하여 프로메테우스의 데이터를 저장할 볼륨을 설정하고 권한을 준다
   - grafana폴더에 grafana-install.sh 파일을 마스터 노드로 옮긴다
   ---------------------------------- kubernetes 버전 변경으로 인해 학습용 helm template 미지원 -------------------
   - ./grafana-install.sh를 실행하여 헬름으로 그라파나를 설치한다
   ---------------------------------- kubernetes 버전 변경으로 인해 학습용 helm template 미지원 -------------------
   - helm repo add grafana https://grafana.github.io/helm-charts를 입력하여 저장소를 추가한다
   - helm repo update를 입력하여 저장소를 최신화 시킨다
   - git clone https://github.com/grafana/helm-charts.git을 입력하여 그라파나 헬름 차트를 다운받는다
   - helm-chart -> charts -> grafana 경로에 있는 values.yaml을 수정한다
   - persistence에서 enabled를 true로 설정한다
   - accessModes와 size 항목은 주석처리한다
   - existingClaim항목은 주석을 해제하고 방금 만든 pvc 명을 기입한다
   - service 하위의 type 값 ClusterIP를 지우고 LoadBalancer를 넣는다
   - securityContext 하위의 runAsUser, runAsGroup, fsGroup를 1000번으로 바꾼다
   - adminPassword부분의 주석을 해제하고 비밀번호를 admin으로 설정한다
   - helm install grafana grafana/grafana -f values.yaml을 입력하여 그라파나를 설치한다
   - kubectl get service를 입력하여 노출된 IP를 확인하고 접속하여 정상 배포되었는지 확인한다
   
16. 그라파나, 프로메테우스 연동 (노드 모니터링)
   - 그라파나에 접속하여 로그인한다
   - 왼쪽 menu에 Connections로 들어가 Data sources 탭을 클릭한다
   - Prometheus를 클릭한다
   - name에 Prometheus를 입력하고 Default 항목을 체크한다
   - Connection 항목에 http://prometheus-server.default.svc.cluster.local (CoreDNS 기능)을 입력하고 Save & Test 버튼을 누른다
   - 왼쪽 메뉴에서 Dashboard를 클릭한다
   - Create Dashboard 버튼을 누르고 Add visualization버튼을 누른다
   - 데이터 소스로 아까 만든 프로메테우스를 넣는다
   - 다음 나오는 창에서 하단에 code 버튼을 누르고 메트릭 브라우저 옆에 입력창에 해당 내용을 입력한다
   - 1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) by (node)를 입력한다
   - 오른쪽 패널에서 Title에 노드 CPU 사용률을 입력한다
   - 오른쪽 상단의 메트릭 수집 설정 구간을 Last 6 hours에서 Last 1 hour로 변경한다
   - 오른쪽 패널 탭을 아래로 스크롤 하여 Standard options 탭의 unit을 Misc -> percent(0.0-1.0)으로 선택한다
   - 오른쪽 최상단의 Save 버튼을 눌러 저장한다
   - 오른쪽 상단의 Add -> visualization 버튼을 눌러 새 패널을 생성한다
   - 제목을 노드 메모리 사용량으로 설정한다
   - PromQL을 node_memory_Active_bytes를 입력한다
   - 입력후 하단 options를 열어 Legend의 Auto를 Custom으로 바꾸고 {{}} 안에 node를 넣는다
   - Standard options 탭의 unit을 Data -> bytes(SI)로 선택한다
   - Save 눌러 저장한다
   - 새 패널을 생성한다
   - 제목: 노드 네트워크 평균 송신/수신 트래픽
   - PromQL: avg(rate(node_network_transmit_bytes_total[5m])) by (node)
   - Legend: {{node}}-transmit
   - 하단의 Add query 버튼을 누른다
   - PromQL: avg(rate(node_network_receive_bytes_total[5m])) by (node) * - 1
   - Legend: {{node}}-receive
   - Standard options 탭의 unit을 Data -> bytes(SI)로 선택한다
   - Save 버튼을 눌러 저장한다
   - 새 패널 생성
   - 제목: 노드 상태
   - PromQL: up{job="kubernetes-nodes"}
   - Legend: {{instance}}
   - 오른쪽 상단의 Time series 버튼을 눌러 Stat으로 바꾼다
   - Stat styles탭에서 Orientation을 Horizontal로 바꾼다
   - Graph mode를 None으로 바꾼다
   - Value mappings탭에서 Add value mapping 버튼을 누른다
   - Condition에 1을 입력하고 Display text에 Good을 입력한다
   - 하단의 Add value mapping버튼을 눌러 0 = Bad를 입력한다
   - 오른쪽에 color를 눌러 Bad의 색상을 빨간색으로 바꾼다
   - Save를 눌러 저장한다
   - add 버튼을 눌러 row를 선택한다
   - row title에서 톱니바퀴를 눌러 제목을 Cluster Metrics로 변경한다
   - 패널들을 드래그해 Cluster Metrics밑에 속하도록 정렬시킨다
   - add 버튼 옆에 save 버튼을 눌러 Dash Board를 저장한다
     
17. 그라파나, 프로메테우스 연동 (파드 모니터링)
   - 오른쪽 상단의 톱니바퀴를 누른다
   - Variables 버튼을 누르고 Add variable 버튼을 누른다
   - Name 항목에 Namespace를 입력한다
   - Label 항목에 Namespace를 입력한다
   - Query 항목에 Query type을 Label Values로 선택하고 Label은 namespace로 설정한다
   - Include All option을 체크한다
   - Custom all value에 .+를 입력한다
   - 하단 Preview of values 항목에 namespace들이 출력되는지 확인한다
   - Apply 버튼을 눌러 메인화면으로 나온다
   - 다시 변수 추가 버튼을 누른다
   - Name: Pod
   - Label: Pod
   - Query Type: Label Value
   - Label: Pod
   - Metric: 방금 설정한 Namespace
   - Include All option: true
   - Custom all value: .+
   - Save dashboard 버튼을 눌러 저장한다
   - Add 버튼을 눌러 row를 생성한다
   - row 명을 $Namespace Namespace Metrics로 입력한다
   - 새 패널 생성
   - 제목: $Pod Pod CPU 사용률
   - PromQL: sum(rate(container_cpu_usage_seconds_total{namespace=~"$Namespace",pod=~"$Pod",container!=""}[5m])) by (pod)
   - Legend: {{pod}}
   - Standard options 탭의 unit을 Misc -> percent(0.0-1.0)로 선택한다
   - 새 패널 생성
   - 제목: $Pod Pod 메모리 사용량
   - PromQL: sum(container_memory_usage_bytes{namespace=~"$Namespace",pod=~"$Pod",container!=""}) by (pod)
   - Legend: {{pod}}
   - Standard options 탭의 unit을 Data -> bytes(SI)로 선택한다
   - 새 패널 생성
   - 제목: API 서버 응답 시간(5분/SAL 99%)
   - PromQL: histogram_quantile(0.99, sum(rate(apiserver_request_duration_seconds_bucket[5m])) by (le))
   - 시각화: Stat
   - Standard options 탭의 unit을 Time -> seconds(s)로 선택한다
   - 새 패널 생성
   - 제목: Pod 상태
   - PromQL: sum(kube_pod_status_phase{pod=~"$Pod",namespace=~"$Namespace"}) by (phase)
   - Legend: {{phase}}
   - 시각화: Stat
   - Stat Styles Orientation = Horizontal
   - $Namespace Namespace Metrics row 밑으로 지금까지 생성한 패널을 옮긴다
17. 서버 모니터링 경고 Slack 알림
   - 슬랙을 연다
   - webhook을 검색해 Incomming WebHooks를 추가한다
   - 새 채널 생성을 눌러 알림을 받을 채널을 생성한다
   - 채널을 등록하고 웹훅을 등록한다
   - 웹훅 URL을 복사해둔다
   - alert-manager.yaml 파일의 Slack-URL 값을 발급받은 URL값으로 바꾼다
   - alert-manager.yaml를 마스터 노드로 옮기고 kubectl apply -f alert-notifier.yaml을 실행하여 콘피그맵을 배포한다
   - prometheus-alertmanager-preconfig.sh파일과 prometheus-alertmanager-volume.yaml파일을 마스터 노드로 옮긴다
   - prometheus-alertmanager-preconfig.sh를 실행하여 alert-manager가 사용할 pv,pvc를 생성한다
   - prometheus-alertmanager-install.sh파일과 values.yaml파일을 마스터 노드로 옮긴다
   - helm upgrade prometheus prometheus-community/prometheus -f ./values.yaml로 프로메테우스를 업그래이드 한다
   - (Error: UPGRADE FAILED: template: prometheus/templates/_helpers.tpl:80:47: executing "prometheus.alertmanager.fullname" at        
     <.Subcharts.alertmanager>: nil pointer evaluating interface {}.alertmanager)
   - 업그레이드 시도 시 해당 에러가 나와 helm 버전 변경 혹은 첫 인스톨 시 alertmanager 같이 설치

