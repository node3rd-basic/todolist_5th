# GIT
![스크린샷 2024-05-17 오후 9.16.33 3.png](..%2Fimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-17%20%EC%98%A4%ED%9B%84%209.16.33%203.png)
## github 의 코드 로컬로 셋팅
### init

### remote add origin

### clone
```bash
git clone https://github.com/node3rd-basic/todolist_5th.git
```

## 주요 상태

### untracked
- git이 관리하지 않는 파일


### tracked
- git이 관리하는 파일

### unstaged
- git이 관리하는 파일이 변경된 상태

### staged
- git이 관리하는 파일이 변경되어 commit 할 준비가 된 상태

## 주요 명령어

### status
- 현재 git의 상태를 확인

### commit
- staged 상태의 파일을 commit
```bash
git commit -m "커밋 메시지"
```
#### add 를 동시에 하기
```bash
git commit -am "커밋 메시지"
```

### pull
- github의 변경사항을 로컬로 가져옴

### push
- 로컬의 변경사항을 github로 보냄

### checkout
- branch를 변경

### add
- untracked 상태의 파일을 tracked 상태로 변경

## 코드 합치기

### merge
- branch를 합침

### pull request
- github에서 코드를 합침