# 과제 피드백 feat: github
## 과제 리뷰 코멘트 받은 경우
- PR 에서 리뷰를 받고 코드 수정이 필요할땐, 해당 브랜치에서 추가 작업 후 commit, push 를 하면 PR 에 반영된다.
- 반영 후 재 확인 요청 코멘트를 남긴다.
## 과거 시점으로 rollback 해야 하는 경우
```bash
git reset { commit id } --hard
```
> reset 은 rollback 시점 이후에 작업 했던 commit 이 모두 사라진다.

### 그밖의 rollback 방법
- git revert : 이후에 다시 설명 예정

# nodejs 기본
- 자신의 디렉토리 (/homework/{이름}/backend) 생성
- app.js 생성
```bash
# yarn 설치 (이미 설치되어 있으면 생략)
npm install yarn -g

# express 설치 (반드시 본인 homework 디렉토리에서 실행)
yarn add express
```
### 과제
- `외울때까지` express 기본 (app.js) 코드 작성
