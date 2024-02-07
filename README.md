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
