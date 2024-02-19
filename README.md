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

10. backend 배포
   - backend 폴더의 back.yaml 파일을 마스터 노드로 옮긴다 (DB 연결정보는 yaml에 명시했지만 추후 시크릿으로 처리 필요)
   - 도커 hub에서 이미지를 가져오기 위해 kubectl create secret docker-registry docker-login --docker-username=<도커ID> --docker-password=<도커PW> 를 사용해서 secret 값을 만든다
   - 명령어 중에 특수문자가 포함되어 있다면 작은 따옴표를 사용하여 이스케이프 처리를 해줘야 한다
   - kubectl apply -f back.yaml을 실행하여 배포한다
   - 정상적으로 배포되었는지 kubectl get pods 로 파드 목록 출력 후 kubectl logs 파드name 을 넣어 로그를 확인한다
   - kubectl expose deploy simple-board --port 8070 --type LoadBalancer을 입력하여 backend를 로드밸런서 타입으로 노출시킨다
   - (해당 명령어는 yaml에 service로도 기술 가능)

11. frontend 배포 (11번 성규 도커파일 완성되면 작성)
   - kubectl get service를 입력하여 백엔드가 어느 ip로 노출되었는지 파악한다
   - externa-ip로 frontend api 요청 주소를 교체한다

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
   - 하단에 Apply 후에 Save를 눌러 변경된 설정을 저장한다
   - kubectl get serviceaccounts로 jenkins 서비스 어카운트가 존재하는지 확인한다
   - 젠킨스의 파드에서 쿠버네티스 API 서버와의 통신을 위해 admin 권한을 부여한다
   - kubectl create clusterrolebinding jenkins-cluster-admin --clusterrole=cluster-amdin --serviceaccount=default:jenkins
   - kubectl get clusterrolebindings jenkins-cluster-admin -o yaml 을 입력하여 롤 바인딩이 정상적으로 진행됬는지 확인한다
     
13. jenkins로 CI/CD 구현
   - 젠킨스에 로그인하여 접속한다
   - 젠킨스 관리 > 플러그인 관리 > 설치 가능 으로이동한다
   - Kubernetes Continuous Deploy 플러그인을 검색하여 체크하고 지금 다운로드하고 재시작후 설치하기를 누른다
   - 넘어가는 화면에서 설치가 끝나고 재시작을 체크한다
   - 지속적 배포 플러그인은 자격 증명 정보를 따로 관리하여 등록해야 한다
   - 젠킨스 관리 > Manage Credentials로 이동한다
   - global 버튼을 누른다
   - 쿠버 설정파일이 있는 마스터 노드에 접속권한이 필요하므로 왼쪽 메뉴에서 Add Credentials를 눌러 추가한다
   - Username에 마스터 노드 리눅스 접속 계정 id를 기입한다
   - Password에 마스터 노드 리눅스 접속 계정 pw를 기입한다
   - ID에 자격 증명을 사용할때 식별할 값을 넣는다 ex)m-k8s-ssh
   - 하단에 OK 버튼을 눌러 저장한다
   - 
