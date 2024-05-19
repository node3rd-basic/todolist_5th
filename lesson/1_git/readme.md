# GIT
![스크린샷 2024-05-17 오후 9.16.33 3.png](..%2Fimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-17%20%EC%98%A4%ED%9B%84%209.16.33%203.png)
## github 의 코드 로컬로 셋팅
### init
- 현재 디텍토리를 git으로 관리하겠다는 명령어
```bash
git init
```

### remote add origin
- 현재 디렉토리를 github의 remote repository와 연결
```bash
git remote add origin {remote repository url}
```
```

### clone
```bash
git clone https://github.com/node3rd-basic/todolist_5th.git
```

> git 이 관리하는 디렉토리가 되면, 해당 디렉토리에는 .git 이라는 디렉토리가 생성된다. .git 을 삭제 하면 git이 관리하지 않는 디렉토리가 된다.

## 주요 상태

### untracked
- git이 관리하지 않는 파일
- 파일이 변경되어도 git은 알지 못함

### tracked
- git이 관리하는 파일

### unstaged
- git이 관리하는 파일이 변경된 상태

### staged
- git이 관리하는 파일이 변경되어 commit 할 준비가 된 상태

## 주요 명령어

### status
- 현재 git의 상태를 확인
- untracked, unstaged, staged 상태를 확인

```bash
git status
```

### commit
- staged 상태의 파일을 commit
- commit은 변경사항을 저장하는 것
- commit 단위로 작업 내용을 기록 하고 롤백가능 하다.

```bash
git commit -m "커밋 메시지"
```
#### add 를 동시에 하기
```bash
git commit -am "커밋 메시지"
```

### pull
- remote(github)의 변경사항을 로컬로 가져옴

### push
- 로컬의 변경사항을 remote (github) 로 보냄

### checkout
- branch를 변경
```bash
git checkout {branch name}
```

- -b 옵션을 사용하면 branch를 생성하고 변경
```bash
git checkout -b {branch name}
```

### add
- untracked 상태의 파일을 tracked 상태로 변경
- unstaged 상태의 파일을 staged 상태로 변경
```bash
# 특정 파일/디렉토리 add
git add {file name}
```

```bash
# 모든 파일 add
git add -A
```

```bash
# 현재 디렉토리 기준 모든 파일 add
git add .
```

## 코드 합치기

### merge
- branch를 합침
```bash
git merge {합치고 싶은 branch name}
```

### pull request
- github에서 코드를 합치는 방법
- pull 을 요청하여 리뷰어가 승인하면 코드를 merge 한다.