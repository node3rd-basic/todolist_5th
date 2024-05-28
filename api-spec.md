# 할일 관리 프로그램 API 명세서

### TodoItem
| key | type | description |
| --- | --- | --- |
| id | number | 할일 아이디 |
| userId | number | 유저 아이디 |
| title | string | 할일 제목 |
| doneAt | string | 할일 완료일 |
| createdAt | string | 할일 생성일 |
| updatedAt | string | 할일 |

## `GET` /todo-items 
- 할일 목록들 조회

### response
#### 응답 
- 할일 목록 : TodoItem[]

#### 응답 샘플
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "할일1",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "할일2",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  }
]
```

## `GET` /todo-items/:id 
- 할일 목록 한개 조회
### response
#### 응답
- 할일 목록 : TodoItem

#### 응답 샘플
```json
{
  "id": 1,
  "userId": 1,
  "title": "할일1",
  "doneAt": "2021-08-01",
  "createdAt": "2021-08-01",
  "updatedAt": "2021-08-01"
}
```


## `GET` /todo-items/search/:keyword
- 할일 목록들 조회
### response
#### 응답
- 할일 목록 : TodoItem[]

#### 응답 샘플
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "할일1",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "할일2",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  }
]
```

## `POST` /todo-items
- 할일 등록
### Request
#### Body
| key | type | description |
| --- | --- | --- |
| title | string | 할일 제목 |

### 요청 예제
```json
{
  "title": "할일1"
}
```

### response
#### 응답
- 할일 목록 : TodoItem

#### 응답 샘플
```json
{
  "id": 1,
  "userId": 1,
  "title": "할일1",
  "doneAt": "2021-08-01",
  "createdAt": "2021-08-01",
  "updatedAt": "2021-08-01"
}
```

## `PUT` /todo-items/:id
- 할일 완료 여부 토글
### response
| key | type | description |
| --- | --- | --- |
| result | boolean | 성공 여부 |

#### 응답 예제
```json
{
  "result": true
}
```

## `DELETE` /todo-items/:id
- 할일 삭제
### response
| key | type | description |
| --- | --- | --- |
| result | boolean | 성공 여부 |

#### 응답 예제
```json
{
  "result": true
}
```

## `POST` /sign-in 
- 로그인  
### Request
#### Body
| key | type | description |
| --- | --- | --- |
| email | string | 이메일 |
| password | string | 비밀번호 |

### 요청 예제
```json
{
  "email": "example@example.com",
  "password": "password"
}
```

## `POST` /sign-up
- 회원 가입
### Request
#### Body
| key | type | description |
| --- | --- | --- |
| email | string | 이메일 |
| password | string | 비밀번호 |
| name | string | 이름 |

### 요청 예제
```json
{
  "email": "example@example.com",
  "password": "password",
  "name": "홍길동"
}
```
     

## `GET` /users/me
- 내 정보 가져오기

### response
#### 응답
| key | type | description |
| --- | --- | --- |
| id | number | 유저 아이디 |
| email | string | 이메일 |
| name | string | 이름 |
| createdAt | string | 생성일 |
