## Table 관계

`point`
무엇을 개발하느냐에 따라 관계를 정의해야한다. => 설계중요 & 단편적으로 생각않기
설정시 여러개를 가질 수 있는가? 를 기준으로 둘 것

1:1 관계. users 테이블의 userid와
user infos 테이블의 주민번호 칼럼을 1:1로 넣어줌
; 부수적인 정보-유저 테이블에
메인 아이디 -userid를 넣음

`릴레이션 맺을 때에는 공식적으로는 pk를 공유`

1:N관계. 학생 : 학급
학생 입장에서 학급을 여러개 가질 수 있는가(학년으로 따진다면 Y) N
학급 입장에서 학생을 여러명 가질 수 있는가 Y

=> 1:N (학년으로 따진다면 N:M)

2. 회원: 회원주소
   만약 배민 처럼 주소를 여러개 가질 수 있다면 1:N

3. 게시글 : 좋아요 이력
   1:N
   게시글은 여러개의 좋아요를 하 수 있지만 좋아요는 게시글을 여러개 가질 수 없음

N:M관계.
학생 : 수업
학생 입장에서 수업을 여러개 들을 수 있는가 Y
수업 입장에서 학생을 여러명 가질 수 있는가 Y

`N:M 일 경우`
중간에 맵핑하는 테이블만들기
ex. 할일 : 유저 (권한 공유 일 경우)
; 권한 테이블 추가해서 맵핑하기

## join

필요한 데이터가 다른 테이블에 있을 때 데이터 불러오는 용도

필요한 것 : 공통으로 가지고 있는 컬럼

1:1, 1:N, N:M 상관 없음.

- 꼭 외래키를 해야 엮을 수 있진 않음. 단, 빨라서 자주사용함

LEFT JOIN : 공통 컬럼인 키값을 기준으로 하나의 테이블에 값이 없더라도 모두 조회함.
예를 들어

LEFT JOIN
select 조회 할 컬럼
from 테이블1 a left join 테이블2 b on a.공통컬럼명=b.공통컬럼명

이라면. 유저가 테이블 1. join 기준으로 왼쪽에 있으므로

RIGHT JOIN : 기준이 다를 뿐. LEFT JOIN과 같음

- 주의할 것 (자꾸 메인 ; 유저 등을 왼쪽에 두고 릴레이션이하는 것은.. 나만의 생각)

INNER JOIN
LEFT JOIN과 마찬가지로
select 조회 할 컬럼
from 테이블1 a inner join 테이블2 b on a.공통컬럼명=b.공통컬럼명

`tip`
공통 컬럼은 묶어주기 위한 공통값 이기 때문에 두 컬럼명이 다를 수도 있음
ex. 주문 정보에 고객id, 고객 정보에는 고객아이디 라고해도
테이블1.고객id=테이블2.고객아이디 처럼 묶는데는 상관 없음 .

## 그 외

join을 활용하여 테이블 값 연산시 :

- 어떤 테이블에서 데이터 뽑을지
- 어떤 칼럼 이용할지
- 어떤 조건 지정할지
- 어떤 함수, 수식 이용할지

순서도 (기억...해보기)
from -> join -> where -> group by -> having -> select -> order by -> limit

@@를 활용하여 테이블 이름 지정하기
컬럼명 이름 붙여주는 것은 다를 때 위주로 (같으면 안붙여도 됨) ; ex. userId Int @map("user_id")
있을지 없을 지 모르는 컬럼은 []을 넣기 ex. reviews Review[]

`중복안되게 설정`

## 예시. 같은 펫시터가 같은 날에 중복예약 되지 않도록 설정

model Reservation {

id Int @id @default(autoincrement())

sitterId Int @map("sitter_id")

userId Int @map("user_id")

date DateTime

service ServiceType

createdAt DateTime @default(now()) @map("created_at")

updatedAt DateTime @updatedAt @map("updated_at")

petSitter PetSitter @relation(fields: [sitterId], references: [id])

user User @relation(fields: [userId], references: [id])

review Review?

##### @@unique([sitterId, date]) // 같은 펫시터가 같은 날에 중복 예약되지 않도록 설정

#### @@map("reservations")

#### }

---

-자세한 것 : https://www.prisma.io/docs/orm/prisma-schema

- 참고하면 좋을 자료 : https://hanamon.kr/%EA%B4%80%EA%B3%84%ED%98%95-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84-%EA%B4%80%EA%B3%84-%EC%A2%85%EB%A5%98/

- pk / fk 참고하면 좋을 자료 : https://velog.io/@hiy7030/DB-Primary-key%EC%99%80-foreign-key
