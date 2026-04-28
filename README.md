# 동아리 모집 정보 확인 서비스

[서비스 바로가기](https://skhu.eoehd1ek.com)

교내 동아리 모집 정보를 검색하여 찾아볼 수 있는 서비스입니다.

동아리 모집 정보는 교내 커뮤니티에 올라온 정보를 사용했습니다.

동아리 모집 정보의 추가, 수정, 삭제 요청은 에브리타임 게시글을 통한 쪽지로 요청바랍니다.

## 설계

- 이 프로젝트는 Vite, React, TypeScript로 구성됩니다.
- 이미지는 `public/image` 경로에 존재합니다.  
- 동아리 모집 정보글의 본문은 `public/contents` 경로에 존재합니다.  
- `public/data.json`의 keyword를 사용하여 이미지와 본문 정보를 가져옵니다.  

## 기여

1. `./templates/Gemini Data Preprocessing.txt` 프롬프트로 json 데이터를 생성합니다.  
2. 생성한 json 데이터를 `public/data.json` 에 추가합니다.  
3. `.public/contents/{keyword}.txt`에 홍보 게시글 원문을 작성합니다.  
4. `public/image/{keyword}1~9.jpg`로 홍보 게시글의 이미지를 저장합니다.  
5. 하나의 커밋에는 하나의 게시글을 작업하여 PR을 요청합니다.

## 실제 화면

<img src="./docs/example1.png" alt="example-pc" width="720" height="352" />

<img src="./docs/example2.jpg" alt="example-mobile" width="326" height="720" />
