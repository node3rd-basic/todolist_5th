# Prisma
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql

## 이미 DB 에 table 이 존재할 경우 반영
### prisma cli 설치 
- command line 에서 prisma 관련 명령을 실행 하는 기능 제공
```bash
yarn add prisma

# 설치 확인
npx prisma
```

### 프로젝트에 prisma 초기화
- .env 에 database 환경변수 추가 됨
- 이후 설치되고, 프로젝트에서 사용될 prisma client 를 사용하기 위한 설정 파일 생성
```bash
npx prisma init
```

### DB 정보 작성
- .env 에 database 정보 작성

### DB type 수정
- schema.prisma 에서 사용할 DB type 수정
```prisma
./prisma/schema.prisma 의 db->provider 를 mysql 로 수정
```

### 원격의 db 구조를 프로젝트에 끌어오기
- schemas.prisma 에 db 의 table 구조가 자동 작성됨
```bash
npx prisma db pull
```


### @prisma/client 설치
- 프로젝트 코드에서 실제로 사용할 패키지 설치
```bash
yarn add @prisma/client
```

### prisma client 에 schema.prisma 적용
```bash
npx prisma generate
```

### 테스트 
-- app.js