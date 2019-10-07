블록체인 통신용 API
===


Version
---
#### truffle 4.1.15
#### nodejs 10.16.0

# 사용법
```
npm install을 먼저 한 후,
var api = require('api_server.js');
api 객체로 받아와서 쓰면 된다.
```

# API 종류

## 물건 등록
```
api.register(티켓 개수, 전체 가격, 판매자 지갑주소)
```
```
return(물건 컨트랙트 주소)
```
### 특징
##### 티켓 가격 자동으로 계산
##### KLAY 더 많이 보낼시 거스름돈 반환


## 구매 등록
```
api.staking(물건 컨트랙트 주소, 구매자 지갑 주소)
```
```
return(bool)
true: 성공
false: 실패
```

## 물건을 받을 사람 지갑 주소 받기
```
api.getWinner(물건 컨트랙트 주소)
```
```
return(구매자 지갑 주소)
```

## 남은 티켓 개수
```
api.remainTicket(물건 컨트랙트 주소)
```
```
return(남은 티켓 개수)
```

# 주의점
### 입력하는 주소의 길이는 42어야 한다. string.length.
### 이 api는 모두 서버가 통제한다.
### uint/uint로 진행하기 때문에 나머지는 버려진다.
##### 불상사를 겪지 않으려면 미리 계산해보는 것을 추천.

# 테스트하기
---
```
node apitest.js
```
