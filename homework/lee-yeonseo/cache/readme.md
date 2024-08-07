# 인덱스란

- 데이터베이스에서 데이터를 빠르게 검색하기 위해 사용하는 데이터 구조
- 책의 색인같은 개념
- 현재 투두리스트에서 인덱스를 생성한다면 userId나 createdAt에 인덱스를 생성하는 게 좋다.
- createdAt에 생성하는 게 좋은 이유: 생성 날짜를 기반으로 정렬하거나, 검색하는 서비스를 추가할 수도 있기 때문

# 인덱스 생성 방법

> 일반적인 인덱스 생성 방법

```
CREATE INDEX 인덱스_이름 ON 테이블_명(컬럼_명);
```

> 여러개의 컬럼을 조합해서 하나의 인덱스 생성 방법

```
CREATE INDEX 인덱스_이름 ON 테이블_명(컬럼_명1, 컬럼_명2);
```

## 인덱스 사용 시 주의 사항

- 모든 열에 인덱스를 생성하면 데이터베이스의 용량을 쓸데없이 많이 차지하게 돼, 오히려 성능이 저하될 수 있기 때문에 자주 검색되는 컬럼에만 생성하는 것이 좋다.

# 캐시(Cache)란

- 데이터나 계산, 조회 결과를 임시로 저장해 두는 공간.
- 주로 데이터베이스에 자주 접근하는 데이터를 빠르게 제공하기 위해서 사용된다.
- 자주 사용되는 데이터를 메모리에 저장하고, 해당 데이터의 만료시간이 지나지 않았다면, DB를 조회하지 않고 바로 결과를 반환해 접근 속도를 높이고, 리소스를 절약해준다.
- Redis를 활용할 수 있다.

## 캐시 사용 시 주의사항

- 실제 데이터와 캐시에 저장되어 있는 데이터간의 일관성을 유지해야하기 때문에 적절한 만료 시간을 설정해야한다.
