This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## frontend 환경변수 사용법 ##
<b>1. 환경 변수 파일 생성 <br></b>
frontend 폴더 내 .env 파일 생성<br>
.gitignore에 .env 추가

<b>2. 저장 <br></b>
.env 파일에서 환경변수 추가 (; 붙이면 안됨)<br>
예) NEXT_PUBLIC_GOOGLE_PLACES_API_KEY = 내 API키<br>

<b>3. 사용 <br></b>
설정한 API 변수명 앞에 process.env.를 붙여서 사용<br>
예) const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;<br>
