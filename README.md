# Nexon API Coding Test

---

## 🚀 실행 방법 (Docker Compose)
### 1. 저장소 클론
git clone https://github.com/sun980120/nexon-api-coding-test.git
cd nexon-api-coding-test
### 2. 환경 변수 파일(.env) 설정

각 서비스 폴더(`gateway/`, `auth-server/`, `event-server/`)에 `.env` 파일을 복사/작성하세요. 
### 3. Docker 이미지 빌드 및 전체 서비스 실행
docker-compose up -d --build

### 4. 서비스 확인

- Gateway: [http://localhost:4000](http://localhost:4000)
- Auth Server, Event Server: 내부 TCP 통신(직접 접근 불가)
- MongoDB: 내부 서비스용

  ### 5. 로그 확인
docker-compose logs -f gateway

### 6. 종료
docker-compose down -v


## 이벤트 설계 및 조건 검증 방식

- **이벤트 조건의 유연성**  
  이벤트별로 `conditionType`(예: ATTENDANCE_STREAK, INVITE_COUNT)과 `conditionValue`(예: 7, 3 등)를 분리해 저장함으로써, 다양한 유형의 이벤트를 손쉽게 확장할 수 있도록 설계했습니다.

- **로그 기반 자동 검증**  
  유저의 출석, 초대, 퀘스트 성공 등 모든 행동을 `UserActionLog`에 기록하고,  
  이벤트 기간·조건에 따라 로그를 집계하여 자동으로 보상 조건 충족 여부를 판단합니다.  
  이 방식은 과거, 현재, 미래 이벤트 모두에 대해 일관된 검증이 가능하며,  
  감사 및 통계 분석에도 용이합니다.

- **자동/수동 승인 분리**  
  `autoApprove` 필드로 이벤트별로 "조건만 맞으면 자동 지급"과 "운영자 검토 후 지급"을 구분할 수 있습니다.  
  자동 지급이 가능한 이벤트는 실시간 사용자 경험을 제공하고,  
  수동 검토가 필요한 이벤트(예: 사연 심사 등)는 운영자 승인 후 지급하도록 설계했습니다.

---

## API 구조 선택 이유

- **Gateway 중심 MSA**  
  인증/인가(JWT)는 Gateway에서만 처리하고,  
  내부 마이크로서비스에서는 인증된 userId 등 신뢰할 수 있는 정보만 받아 비즈니스 로직에 집중하도록 분리했습니다.

- **RESTful 엔드포인트**  
  클라이언트가 직관적으로 사용할 수 있도록 RESTful한 URL과 HTTP 메서드를 사용했습니다.

---

## 예외 처리 및 통일된 응답

- **마이크로서비스 예외 전파**   
  Gateway에서는 커스텀 Exception Filter로 statusCode와 message를 추출해  
  HTTP 표준 응답으로 변환합니다.

- **응답 포맷 통일**  
  ResponseInterceptor를 적용해 모든 성공 응답을 `{ success, data, message, timestamp }` 형태로 통일했습니다.

---

## 구현 중 고민 및 해결

- **중복 보상 방지**  
  이벤트별로 보상 이력(`RewardRequest`)을 관리하여,  
  같은 이벤트에서는 중복 보상이 불가능하고,  
  새로운 이벤트에서는 동일한 조건이라도 새로 보상을 받을 수 있도록 했습니다.

- **확장성 & 유지보수성**  
  이벤트 조건 검증 로직을 전략 패턴으로 분리해,  
  새로운 조건이 추가될 때 기존 코드를 수정하지 않고 검증 함수만 추가하면 되도록 했습니다.

- **운영자/감사 지원**  
  모든 행동 로그와 보상 요청 이력을 별도 테이블에 저장해,  
  운영자 대시보드 및 감사 추적이 용이하도록 설계했습니다.

---

## 향후 개선 아이디어

- **이벤트 템플릿화 및 배치 처리**  
  반복되는 이벤트 유형을 템플릿으로 등록하고,  
  대량 보상 지급이 필요한 경우 배치 처리 지원 예정입니다.

- **실시간 알림 및 대시보드**  
  WebSocket 기반 실시간 보상 지급 알림,  
  운영자용 이벤트/보상 현황 대시보드 추가 예정입니다.

- **실제 예외 데이터 표시**  
  Gateway의 Exception Filter에서 마이크로서비스에서 전달받은 에러 객체의  
  `statusCode`, `message`를 추출해 클라이언트에 정확하게 반환하도록 했습니다.

- **실제 예외 데이터 표시**  
  Gateway의 Exception Filter에서 마이크로서비스에서 전달받은 에러 객체의  
  `statusCode`, `message`를 추출해 클라이언트에 정확하게 반환하도록 했습니다.
---
