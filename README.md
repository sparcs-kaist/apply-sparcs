# apply-sparcs

Apply system for SPARCS @ KAIST.

Used at [apply.sparcs.org](https://apply.sparcs.org) during our recruiting seasons

## Credits

- fi ([Github](https://github.com/litmify))
- nenw ([Github](https://github.com/HelloWorld017))
- sboh1214 ([Github](https://github.com/sboh1214))

## How to change to current semester

### frontend/pages/index.vue

- `2023년도 가을학기` 3군데 변경
- 특별한 안내사항(COVID-19) 등이 있을 경우 변경

### frontend/pages/apply.vue

면접 일정 변경

### frontend/store/index.js

Unix timestamp로 된 due date 변경(ms 단위)

## How to deploy

빠르게 서버를 띄워봅시다.
(Ubuntu 20.04, EC2 t2.micro 기준)

<https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-ubuntu/> 참조하여 mongodb 설치

### 1. 패키지 설치

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y nodejs npm nginx mongodb-org certbot python3-certbot-nginx
sudo npm install -g n pm2
sudo n 15.8.0
```

### 2. 소스 받기

```bash
git clone https://github.com/sparcs-kaist/apply-sparcs src
cd src/backend && npm ci
cd ../frontend && npm ci
echo "API_URL=https://apply.sparcs.org/api" >> .env
npm run build
cd ../..
```

### mongoDB 실행하기

```sh
sudo systemctl start mongod
mongo
> use apply
> exit
```

### 3. pm2

`src`와 같은 디렉토리에 아래와 같이 `ecosystem.config.js`를 생성합니다.
DB_PASSWORD는 임원진 노션에 있습니다.

```js
module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "run start",
      cwd: "/home/ubuntu/src/backend",
      env: {
        HOST_DOMAIN: "apply.sparcs.org",
        PORT: "5000",
        JWT_SECRET_KEY: "a290fe45af2e48beffdc06fd0450924ad380b8df04f5357d",
        MONGO_URI: "mongodb://127.0.0.1:27017/apply",
        DB_PASSWORD: "",
        SSO_CLIENT_ID: "apply-sparcs",
        SSO_SECRET_KEY: "",
      },
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start",
      cwd: "/home/ubuntu/src/frontend",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
```

### 4. nginx

아래 내용을 `/etc/nginx/sites-available/default`에 작성합니다.

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name _;

  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /api/ {
    rewrite /api/(.*) /$1 break;
    proxy_pass http://localhost:5000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

아래 명령어로 설정 파일이 올바르게 작성되었는지 검사합니다.
그후 변경사항을 적용합니다.

```sh
sudo nginx -t
sudo service nginx reload
```

### 5. HTTPS (Let's Encrypt)

AWS Route 53에서 apply.sparcs.org를 등록한 후 실행합니다.

```bash
sudo certbot --nginx -d apply.sparcs.org
```

crontab에 아래 내용을 추가합니다.

```sh
crontab -e
```

```sh
0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. 실행

```bash
pm2 start ecosystem.config.js
```

`pm2 logs all`으로 잘 실행되고 있는지 확인하세요.

## 지원서 스프레드 시트 연동

### 스크립트 추가

스프레트 시트 상단 바 > 확장 프로그램 > App scripts 클릭 > 기존 내용 지우고 아래 스크립트 복붙 > ctrl+s 로 저장

잘 되는지 확인하려면 실행 > 권한 승인 (경고창에서 고급 눌러 승인해 주세요)

### 스크립트 내용 (비밀번호 수정 필요 - 3번의 pm2 `DB_PASSWORD` env 포함)

```js
function load() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const sheet = ss.getActiveSheet();

  const url = "https://apply.sparcs.org/api/forms"; // POST URL
  var data = {
    password: "",
  };
  var options = {
    method: "post",
    payload: data,
  };
  const response = UrlFetchApp.fetch(url, options);
  const dataAll = JSON.parse(response.getContentText());
  const data2D = dataAll.payload.map((i) => [
    i.name,
    i.stdNo,
    i.email,
    i.dept,
    i.phone,
    i.applyType,
    i.introduction,
    i.workToDo,
    i.motivation,
    i.meetup,
    i.activeForFour,
    i.lengthOkay,
  ]);

  sheet.getRange("A1:Z200").clearContent();
  const columns = [
    "name",
    "stdNo",
    "email",
    "dept",
    "phone",
    "applyType",
    "introduction",
    "workToDo",
    "motivation",
    "meetup",
    "activeForFour",
    "lengthOkay",
  ];
  sheet
    .getRange("A1")
    .setValue(
      '"몇 초 전에 마지막으로 수정했습니다." 라는 문구가 뜰 때까지 잠시 기다려주세요'
    );
  sheet.getRange(2, 1, 1, columns.length).setValues([columns]);
  if (data2D.length)
    sheet.getRange(3, 1, data2D.length, data2D[0].length).setValues(data2D);
}
```

- 내용은 꽤나 간단하고 직관적이어서 혹시 column이 추가되거나 하면 쉽게 수정하실 수 있을 듯 합니다
- 혹시 비밀번호를 바꾸고 싶다면 위 스크립트와 pm2 환경변수만 고쳐주시면 됩니다.

### 트리거 추가

누군가 스프레드 시트로 접속 시 내용을 자동으로 업데이트되게 하기 위해서는 트리거를 추가해야 합니다.

Apps script 페이지 좌측에 아이콘 5개가 있는데, 그중 3번째꺼 (시계 아이콘) 눌러주세요. 우측 하단 트리거 추가 버튼 누르고, load 함수와 이벤트 유형이 열릴시로 잘 설정되었다면 저장 버튼을 누르면 됩니다.
