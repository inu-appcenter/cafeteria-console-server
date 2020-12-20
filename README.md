# cafeteria-console-server

**Cafeteria 콘솔 API 서버**

> #### Cafeteria 관련 저장소 일람
>
> ##### 서비스
> - API 서버: [cafeteria-server](https://github.com/inu-appcenter/cafeteria-server)
> - Android 앱: [cafeteria-android](https://github.com/inu-appcenter/cafeteria-android)
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
