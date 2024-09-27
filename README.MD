
## OTConnection
**웹툰 팬덤과 OTT의 세계를 잇다**
  
웹툰/웹소설 팬덤과 OTT 드라마 팬덤 시장을 유기적으로 연결하는 플랫폼
  
우리는 웹툰 팬덤 데이터를 체계적으로 관리하고 분석하여, 
  
OTT 드라마와의 연관성을 시각화합니다.

### 프로젝트 기간
2024.07.19 - 2024.09.30

---

### 프로젝트 팀원 (role 변경 예정)
✒️ &nbsp; **기획팀**
  + 👦&nbsp; 서비스 기획자(PM) 심영애
  + 👦&nbsp; 서비스 기획자 이우영
    + 👦&nbsp; 서비스 기획자 임정연

⌨️ &nbsp; **개발팀**
  + 👦&nbsp; 서비스 개발자 (풀스택) 장영권 
  + 👦&nbsp; 서비스 개발자 (프론트) 김경진
----
### 📚기술스택 
1. 형상관리 : Github
2. 커뮤니케이션 : Discord, Notion
3. 개발환경 : 
   * OS
     * window10
     * Mac
   * IDE
     * IntelliJ
     * Visual Studio Code
   * Frontend
     * React
     * CSS - ANT DESIGN 
   * Backend
     * Nodejs
   * DB
     * AWS RDS
   * CI/CD
     * AWS EC2
     * Nginx
   * INFRA
     * Route53
     * ACM (Amazon Certificate Manager)
     * ABL (Application Load Balancer)

### 🌳Backend 구조

```plantuml
/project-fandom
│
├── /config
├── /controllers           # 비즈니스 로직 처리
├── /doc                   # 프로젝트 설명 및 사용 방법 관련 문서
├── /models                # DB 스키마 및 모델
├── /public                # 정적 파일 (이미지, CSS, JavaScript 등)
├── /routes                # 라우팅
├── /utils                 # 유틸리티 함수 및 헬퍼 함수
├── /views                 # 뷰 파일 (서버 사이드 렌더링 시)
├── .env                   # 환경 변수 설정 파일
├── app.js                 # Express 애플리케이션 초기화
├── .gitignore             # Git에서 제외할 파일 및 폴더 목록
└── package.json           # 프로젝트 메타데이터 및 의존성 목록 

```

[//]: # (인프라 구성도)


[//]: # (ERD 다이어그램)

----

### 📀 Installation

```bash
npm install
```
----

[//]: # (### 🔗산출물)

[//]: # (- 프로젝트 관리 :)

[//]: # (- 기획서 :)

[//]: # (- 와이어프레임 :)

[//]: # (- ERD :)

Welcome to the project_fandom_back wiki!

### **📩 GIT Commit 규칙**
- 제목에는 마침표(`.`)를 포함하지 않도록 합니다.
- 제목은 명령형(예: "Add", "Fix", "Update")으로 작성합니다. 이는 커밋이 무엇을 "했는지"보다 "무엇을 할 것인지"를 나타내기 위함입니다.
- 본문에서는 변경 이유, 무엇이 변경되었는지, 변경 사항이 무엇을 해결하는지 등을 자세히 설명합니다.
- 만약 버그를 수정했다면, 무엇이 문제였고, 어떻게 해결했는지 설명하는 것이 좋습니다.

----

`feat`: 기능 추가
- 새로운 기능을 추가할 때 사용합니다.
- 예: `feat: 사용자 로그인 기능 추가`

`update`: 기능을 수정할 때
- 기존 기능을 수정할 때 사용합니다.
- 예: `update: 사용자 로그인 기능에서 e-mail항목 제거`

`fix`: 버그 수정
- 버그를 수정할 때 사용합니다.
- 예: `fix: 로그인 시 비밀번호 유효성 검사 수정`

`docs`: 문서 변경
- 문서 파일을 수정하거나 새로 추가할 때 사용합니다.
- 예: `docs: API 사용법 문서화`

`style`: 코드 포맷
- 코드 스타일 관련 변경 사항을 커밋할 때 사용합니다. 기능에 영향을 미치지 않는 포맷 변경입니다.
- 예: `style: 코드 포맷팅 및 세미콜론 추가`

`refactor`: 코드 개선
- 기능은 동일하지만 코드 구조나 내부 로직을 개선할 때 사용합니다.
- 예: `refactor: 인증 로직 리팩토링`

`test`: 테스트 추가
- 새로운 테스트를 추가하거나 기존 테스트를 보완할 때 사용합니다.
- 예: `test: 사용자 로그인 테스트 추가`

`chore`: 기타 작업
- 빌드 작업, 패키지 관리, 설정 파일 변경 등 다른 유형에 해당하지 않는 작업에 사용합니다.
- 예: `chore: 패키지 버전 업데이트(package.json 변경)`

예시 커밋 메시지

```plaintext
feat: 사용자 로그인 기능 추가

사용자 로그인 기능을 추가했습니다.
세션 관리를 위해 express-session을 사용했습니다.
JWT를 사용하여 인증 토큰을 발급합니다.
```
---

### 🕊️ Branch 전략

gitFlow 변형방식으로 hotfix, realease 브랜치를 제외하여 개발한다.
1. main 브랜치에서 dev 브랜치를 생성한다.
2. 개발하려는 기능이 있다면 dev 브랜치에서 feature브랜치를 생성한다.
   -ex : git checkout -b feature/positive-word-suggestion

3. 개발완료된 기능은 dev 브랜치로 머지한다.
4. 스크럼미팅에서 협의 후, main 브랜치로 머지한다.

----

### 🧬GitHub Process

**1. GitHub Repository 생성**

1. GitHub에서 새로운 레포지토리 생성
    - [[GitHub]](https://github.com/)에서 새로운 레포지토리를 생성한다.
    - 레포지토리 이름은 프로젝트와 관련된 이름을 사용하고, private 또는 public으로 설정한다.
2. **초기 설정**:
    - `README.md`, `.gitignore`, `LICENSE` 파일을 추가한다.

**2. 로컬 환경에 레포지토리 클론**

```bash
# 레포지토리 클론
git clone https://github.com/visvaden7/project_fandom_back.git
cd project_fandom_back

```

**3. 폴더 구조 설정 및 커밋**

[//]:# (- 클론한 레포지토리 안에서 위에서 설명한 폴더 구조를 설정하고, 초기 커밋을 진행한다.)
클로한 레포지토리 안에서, 모듈을 설치 시작한다.

```bash

# 라이브러리 설치
npm i

```
[//]: # (# 초기 커밋)
[//]: # (git add .)
[//]: # (git commit -m "Initial project setup with BE")
[//]: # (git push origin main)


**4. 브랜치 전략 및 협업**

- **Main 브랜치 보호**: GitHub에서 main 브랜치를 보호하여, PR(Pull Request)을 통해서만 main 브랜치에 병합할 수 있도록 설정한다.
- **기능 브랜치**: 각 팀원은 자신의 기능별 브랜치에서 작업을 진행한다.   
  예를 들어, 새로운 기능 추가 시 `feature/positive-word-suggestion` 같은 브랜치를 만들어 작업할 수 있다.
- **Pull Request(PR)**: 작업이 완료되면 GitHub에서 PR을 생성해 리뷰를 요청하고, 다른 팀원의 검토를 받은 후 main 브랜치에 병합한다.

**5. 이슈 및 프로젝트 관리**

- **GitHub Issues**: 기능 추가, 버그 수정 등의 작업을 관리하기 위해 GitHub Issues를 사용한다. 각 이슈는 브랜치와 연결되어 추적할 수 있다.
- **GitHub Projects**: 칸반 보드 스타일로 프로젝트를 관리할 수 있다. 작업 상태를 쉽게 확인할 수 있고, 팀원 간 협업이 더 효율적으로 이루어진다.

[//]: # (### 3. **CI/CD 및 자동화 &#40;옵션&#41;**)

[//]: # ()
[//]: # (## 6. **CI/CD 및 자동화 &#40;옵션&#41;**)

[//]: # ()
[//]: # (- **GitHub Actions**: CI/CD 파이프라인을 설정하여 코드를 자동으로 빌드하고 테스트할 수 있다. 예를 들어, PR 생성 시 자동으로 테스트가 실행되도록 설정할 수 있다.)

[//]: # ()
[//]: # (## 7. 팀원 추가 및 권한 관리)

[//]: # ()
[//]: # (- **팀원 초대**: 레포지토리 설정에서 팀원을 초대해 협업할 수 있도록 권한을 부여한다.)

[//]: # (- **권한 관리**: 필요한 경우 팀원별로 권한을 조정하여 레포지토리 접근을 제한할 수 있다.)

[//]: # ()
[//]: # (  이 구조를 통해 프론트엔드와 백엔드를 함께 관리하고, GitHub에서 효율적으로 협업할 수 있다.)

[//]: # ()





