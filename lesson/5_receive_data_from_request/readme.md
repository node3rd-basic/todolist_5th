# 요청자가 값을 전달 하고 백엔드 프로그램이 값을 받는 3가지 방법
## 1. 쿼리스트링
- URL 뒤에 `?`를 붙이고 `key=value` 형태로 값을 전달
### Nodejs 에서 값을 받는 방법
```node  
req.query
```

## 2. URL 파라미터
- URL에 `key/:key` 형태로 값을 전달
### nodejs 에서 값을 받는 방법
```node
req.params
```

## 3. Body
- HTTP 메시지의 본문에 json 형태의 데이터를 담아서 전달
- ### nodejs 에서 값을 받는 방법
```node
// json 문자열을 object 형태로 전환하여 req.body 에 담아준다.
app.use(express.json())

req.body
```

## 과제
- register-todo-item
- 요청자가 값을 전달 하고 백엔드 프로그램이 값을 받는 3가지 방법 정리
- frontend/index.html 할일 목록들 보여지도록 api 구현
- frontend/index.html 할밀 목록 추가되도록 api 구현
