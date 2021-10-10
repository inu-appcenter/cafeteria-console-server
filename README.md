# cafeteria-console-server

**Cafeteria 콘솔 API 서버**

> #### Cafeteria 관련 저장소 일람
>
> ##### 서비스
> - API 서버: [cafeteria-server](https://github.com/inu-appcenter/cafeteria-server)
> - 모바일 앱: [cafeteria-mobile](https://github.com/inu-appcenter/cafeteria-mobile)
>
> ##### 운영 관리
> - **콘솔 API 서버**: [cafeteria-console-server](https://github.com/inu-appcenter/cafeteria-console-server)
> - 콘솔 웹 인터페이스: [cafeteria-console-web](https://github.com/inu-appcenter/cafeteria-console-web)
>
> ##### 배포 관리
> - API 서버 배포 스크립트: [cafeteria-server-deploy](https://github.com/inu-appcenter/cafeteria-server-deploy)

## 개요

Cafeteria 웹 콘솔을 지원합니다.

API 서버와 같은 DB를 공유하며, 웹 콘솔의 요청에 따라 운영 중 참조되는 파라미터를 수정합니다.

## 업데이트 로그

### 2021.10.11 v1.9.1
- 예약 찾는 메소드는 `BookingFinder` 전담.

### 2021.10.8 v1.9.0
- 예약 관련 API 변경.

### 2021.10.5 v1.8.1
- 로깅 강화.

### 2021.10.3 v1.8.0
- 예약 시스템 준비 완료.
- 타임존 설정 환경변수로 오버라이드 가능하게 설정.

### 2021.10.3 v1.7.13
- 타임존 이슈 해결.

### 2021.10.3 v1.7.12
- 루트 상태 메시지 변경.
- 코어 의존성 업데이트 반영.

### 2021.10.3 v1.7.11
- 코어 의존성 버그(개행문자 따라붙는) 해결.

### 2021.10.2 v1.7.9
- 코어 의존성 버그 해결.

### 2021.10.2 v1.7.8
- Secret 가져오는 방법 변경.

### 2021.10.2 v1.7.7
- Docker 배포 설정.

### 2021.9.27 v1.7.6
- 입장 기록 날짜 from은 그 날의 0시, until은 그 날의 23시 59분 59초로 해석.

### 2021.9.27 v1.7.5
- 입장 기록 가져올 때, 수기 체크인 기록은 모두 가져옴.

### 2021.9.27 v1.7.4
- 입장 기록 엑셀 export API 추가.

### 2021.9.26 v1.7.3
- QR 체크인 검증 세분화.

### 2021.9.17 v1.7.2
- 엔티티 저장과 관련된 버그 수정.

### 2021.9.12 v1.7.1
- 코어 의존성 업데이트로, 런타임에 devDependency 날아갈 때에 발생하는 문제 해결.

### 2021.9.12 v1.7.0
- 수기 체크인 기능 추가.

### 2021.9.11 v1.6.4
- 코어 의존성 업데이트.

### 2021.9.11 v1.6.3
- 체크인 검증 기능 추가

### 2021.8.23 v1.6.2
- 체크인 기초 기능 구현 완료

### 2021.8.22 v1.6.1
- 코어 의존성 업데이트.
- 프로젝트 파일 정리.

### 2021.8.21 v1.6.0
- 엔티티 변경에 대응 및 GraphQL 스케마 자동 생성.

### 2021.3.16 v1.5.0
- 할인 기록 내보내는 기능 추가

### 2021.1.12 v1.4.0
- 카페테리아 Comment 추가

### 2021.1.8 v1.3.1
- DB 모델 정의 수정(auto increment)

### 2021.1.4 v1.3.0
- 서비스 로그 API 지원 추가

### 2020.12.30 v1.2.4
- 카페테리아 POS 번호 열람 및 편집 기능 추가

### 2020.12.20 v1.2.3
- 프로젝트 이름 변경

### 2020.12.6 v1.2.2
- DB 컬럼 타입 변경

### 2020.12.3 v1.2.1
- DB 텍스트 인코딩 변경

### 2020.12.1 v1.2.0
- 고객센터 API 신설

### 2020.11.27 v1.1.2
- 잘못된 요청 차단

### 2020.11.25 v1.1.1
- 할인 로그 갯수 제한(50개) 추가 

### 2020.11.24 v1.1.0
- TransactionHistory 열람 기능 추가

## 배포

### 구성

`Heroku`에서 `potados99@gmail.com` 계정으로 배포중입니다. 애플리케이션 이름은 `cafeteria-console-server`입니다.

배포 도메인은 https://console-api.inu-cafeteria.app 입니다. HTTPS 인증서는 `Heroku`에서 관리합니다. 유료입니다.

### 배포하기

> `heroku` 커맨드라인 유틸리티가 설정되어 있어야 합니다.

로컬에서 `npm run deploy`를 실행하여 `Heroku`에 배포합니다. 
