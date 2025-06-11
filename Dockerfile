# 1. Node.js 기본 이미지 사용
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. TypeScript 빌드를 위한 추가 패키지 설치
RUN npm install -g typescript ts-node

# 6. 소스 코드 복사
COPY . .

# gRPC 코드 생성
RUN npm run generate:proto

# 7. TypeScript 빌드 실행
RUN npm run build

# 8. 컨테이너가 실행될 때 사용할 기본 명령어 설정
CMD ["node", "dist/server.js"]

ENV TZ=Asia/Seoul

# 9. 컨테이너에서 사용할 포트 지정
EXPOSE 3000