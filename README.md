codestargram
============

HTML, CSS 및 JavaScript를 이용해서 instagram 클론을 만들어봅니다.
실제 서비스와 비슷한 UI를 가진 Web Application을 만들면서, 프론트엔드 개발의 기초를 배웁니다.

아래 Intro 영상을 보시고, 과제를 진행해보세요.

이 앱은 간단히 서버로부터 데이터를 받아와서 화면에 표시하고, 새로운 데이터를 서버로 보내는 과정으로 이루어져 있습니다.
다만 실제로 서버를 통해 어딘가에 저장되는 것은 아니고, mock 서버를 준비해서 클라이언트에서의 과정만 흉내내고 있습니다. (새로고침하면 새로운 글이 삭제되는 이유입니다.)

## 학습 포인트

1. 프론트엔드 개발의 기초인 HTML, CSS, JavaScript의 조합을 배웁니다.
2. HTML을 이용한 UI 설계를 직접 해보며, CSS를 이용한 디자인을 연습해봅니다.
3. UI에서 마우스(혹은 터치)나 키보드 등의 사용자 입력(이벤트)을 받는 경우를 생각해보고, Event Handling을 JavaScript에서 어떻게 처리하는지를 배워봅니다.
4. 가상의 서버를 두어, 실제 클라이언트-서버가 서로 어떻게 비동기적으로 요청/응답을 처리하는지 연습해봅니다.

* * *

Goals
=====

## Bare Minimum Requirements

- 제품의 인터페이스를 디자인하세요.
  - 기본적인 틀, 그리고 반드시 있어야 할 컴포넌트들에 대한 정보가 있습니다. 이에 대해서는 아래 *HTML Design Guide*를 참조하세요.
- 백엔드에 이미 저장되어 있는 데이터를 보여주세요.
  - 자바스크립트 세계에서 클라이언트와 서버와의 통신은 늘 비동기적으로 연결됩니다. 서버에게 요청을 보내고 결과가 올 때까지 무조건 기다리는 것이 아니라, 즉시 다른 기능을 실행할 수 있어야 합니다. 서버로 요청하는 함수는 비동기 함수입니다. 서버로부터 응답이 온 후 실행되는 callback 함수 안에서, 데이터를 화면에 표시하는 코드를 작성하세요.
  - 서버의 기능을 요청할 수 있도록 만들어진 함수가 준비되어 있습니다. (보통 API라고 합니다) 아래 *API Guide*를 참조해보세요.
- 새로운 post를 작성할 수 있도록 하세요.
  - 사용자 이름, 메시지를 입력받아 서버로 전송하는 로직을 구현해보세요. Event Handling을 실습해 볼 수 있는 기회입니다. 사진은 백엔드로부터 제공되니, 여러분은 신경 쓸 필요가 없습니다. (업로드하지 않아도 됩니다)
  - 새로운 post를 작성할 때, 입력값이 유효한 지를 결정할 필요가 있습니다. 백엔드에 허락되지 않은 데이터가 들어가지 않도록 프론트엔드 단에서 어느정도 막아줄 필요가 있습니다. 유효하지 않은 입력이 들어오면, 에러를 표시해주세요.
  - post 작성 시간이 **실제 시간**을 반영해야 합니다. 자바스크립트의 `new Date()`를 이용해야 하는데, 날짜 데이터를 저장하고 표시하는데에 있어서, 아름답게 가공할 수 있는 유틸리티 함수를 작성해야 합니다.
  - 새로운 post 작성에 대한 요청 후, 응답의 성공 여부에 따라 새로운 데이터가 추가되었음을 화면에 표시해야 합니다. 새 post를 기존 목록에 추가하고, 성공에 대한 알림을 표시해주세요.
- 위 모든 과정은 테스트를 통과하면서 자연스럽게 구현할 것입니다. 모든 테스트를 통과하세요.

## Advanced

- 사용자 이름을 클릭했을 때, 해당 사용자가 작성한 post만 볼 수 있게 만들어주세요.
  - 전체 post를 보여주는 화면으로 돌아가는 버튼을 만들어야 합니다.
  - 이 때는, 새 post 입력 화면을 가려주세요.
  - Header에 필터링된 사용자의 이름을 보여주면 더 좋을 것 같습니다.

* * *

## HTML Design Guide

반드시 있어야 할 컴포넌트와, 기본적인 틀을 지킬 수 있도록 테스트 케이스가 준비되어 있습니다. 이 외의 나머지 디자인적인 부분들은, 여러분의 온전한 자유입니다. 디자인에 어느정도 규칙을 둔 이유는, 먼저는 가장 보편적인 디자인 방법을 알려드리기 위함이고, 두번째는 HTML 태그들이 각각의 의미를 가지고 목적에 맞게 존재함을(Semantic Web이라고 합니다) 소개하기 위함입니다.

이 과제에서 강제하고 있는 구조는 다음과 같습니다.

### 1. 데이터 출력 화면
- `ul` 태그가 `posts`라는 id를 가지도록 하고, 그 안쪽에 직접적인 자식(children)들로 각 post 하나하나가 `li` 태그로 묶여 있어야 합니다.

```html
<ul id="posts">
  <li> (하나의 post: 사용자, 그림, 메시지, 올린 시각 등) </li>
  <li> (하나의 post: 사용자, 그림, 메시지, 올린 시각 등) </li>
  ...
  <li> (하나의 post: 사용자, 그림, 메시지, 올린 시각 등) </li>
</ul>
```

### 2. 새 post 입력 화면
- `form` 태그로 감싸고, `new-post-form`이라는 id를 가지도록 합니다.
- `form` 안쪽에 다음과 같은 구성요소가 있어야 합니다. (직접적인 자식일 필요는 없습니다)
  - `username` id를 갖는 입력 element
  - `message` id를 갖는 입력 element
  - `post` id를 갖는 제출용 버튼 element

### 3. 알림창
- `alert` className을 갖는 element

이와 관련해 추가적으로 다음과 같은 CSS 항목이 제공됩니다.
- `alert-hide` className을 이용하면 알림창이 css animation을 통해 서서히 사라지고 보여집니다.
- `alert-success` className을 이용하면, 알림창이 초록색으로 변합니다.
- `alert-danger` className을 이용하면, 알림창이 빨간색으로 변합니다.

### 4. 전체 보기 버튼 (for Advanced)
사용자 이름으로 필터링을 할 경우, 전체 post를 보여주는 화면으로 돌아가야 합니다. 이 때 이용할 [전체 보기] 버튼의 요구사항은 다음과 같습니다.
- `show-all` id를 갖는 버튼 element
- 처음에는 화면에서 가리워져 있어야 합니다. (CSS `display:none` 속성 이용)

* * *

## API Guide

데이터를 서버로부터 받아오기 위해서는, 서버에 요청할 수 있는 Programming Interfaces들이 서버로부터 제공되기 마련입니다. 이를 Application Programming Interfaces, 줄여서 API 라고 부릅니다.
API는 다음의 내용을 담고 있습니다. (앞으로 프로그래밍을 계속 하시게 된다면, API 문서를 보는 일에 아주 익숙해지셔야 합니다.)

- 호출할 수 함수의 이름 혹은 속성들
- 호출할 때 넘겨야 할 argument나 callback에 주어진 parameter
- return을 기대하는 결과

codestargram 백엔드에서 제공하는 API는 다음과 같습니다.

### `fetchData`

```javascript
API.fetchData(callback);
```
- 넘겨야 할 arguments
  - `callback`: 요청이 성공하면 실행하는 함수, 다음 parameter를 제공합니다.
    - `data`: post 데이터가 담긴 배열
- return 값
  - `undefined` 리턴값이 없습니다
- 예시 코드
```javascript
API.fetchData(function(data) {
  // clearList();
  data.forEach(function(post) {
    // TODO
  });
});
```

### `postData`
```javascript
API.postData(post, callback);
```
- 넘겨야 할 arguments
  - `post`: post 데이터 객체, 담아야 할 key/value pair는 다음과 같습니다.
    - `user`: string 타입이며, 띄어쓰기가 포함되면 안됨
    - `message`: string 타입
    - `created_at`: string 타입이며, `yyyy-MM-dd hh:mm:ss`형식으로 들어와야 함
  - `callback`: 요청이 성공하면 실행되는 함수
- return 값
  - `undefined` 리턴값이 없습니다
- 예시 코드
```javascript
var post = {
  user: 'ingikim',
  message: 'welcome to codestates',
  created_at: '2019-01-30 12:30:55'
};
API.postData(post, function(data) {
  // displaySuccessAlert();
  // renderNewPost();
});
```

* * *
## Before Moving On

codestargram을 구현하는 데 있어서 특별한 요구사항이 필요하지는 않지만, 유닛 테스트와 [end-to-end 테스트(E2E 테스트)](https://hackernoon.com/testing-your-frontend-code-part-iii-e2e-testing-e9261b56475)를 통해 구현 내용이 올바른지 확인할 수 있습니다. 그러기 위해서는 다음과 같은 요구사항이 필요합니다.
- Node.js 설치
- 명령 프롬프트 또는 터미널(또는 git bash)을 열어서 프로젝트 폴더로 이동 후 `npm install` 실행

그동안 SpecRunner.html 와 같은 파일을 이용해 테스트를 실행했던 것을 기억하실 겁니다. 이 프로젝트는 CLI 환경에서 테스트를 실행합니다.
- 명령 프롬프트 또는 터미널(또는 git bash)을 열어서 프로젝트 폴더로 이동 후 `npm test` 실행

총 14개의 테스트 중, Advanced를 위한 두 개의 테스트를 제외한 나머지를 반드시 통과시켜야 합니다.

* * *
## What's Already Here

보다 전문적인 프로그래머들은 모든 기능을 한 함수에 구현하지 않습니다. 함수를 분리하는 것은 재사용성을 높이고 테스트가 유리하도록 만들며, 이는 버그가 없는 프로그래밍을 가능하게 합니다. 그러나, 주니어 개발자들에게 함수를 목적에 맞게 적절히 분리하는 것은 쉬운 일이 아닙니다. 그래서 우리는 이미 각각의 목적을 가진 함수를 만들어 놓았습니다.

이 repo에는 다음과 같은 내용이 포함됩니다.

- `index.html`
  - 이 프로젝트의 진입점입니다. jQuery 라이브러리와 fakeServer 구현이 embed 되어 있습니다. 여기에는 DOM 구조를 직접 작성해야 하며, 또한 작성한 JavaScript 및 CSS를 embed 해야 합니다.
- `spec/spec.js`
  - 이 프로젝트의 실질적인 요구사항이 담겨 있습니다. 예를 들어, 주어진 함수를 실행했을 때, 기대하는 return 값이 무엇인지, 또는 html 파일에 어떠한 element가 필수적으로 들어가기를 원하는지 등이 상세히 적혀 있습니다. 이를 바탕으로 테스트를 실행합니다. 여러분은 이 파일을 찬찬히 뜯어보며 요구사항을 파악하되, 직접적으로 수정할 필요는 없습니다.
- `src/prototype.js`
  - 유틸리티 함수를 미리 작성합니다. 여기서 주목할 점은, 유틸리티 함수를 기본 객체의 프로토타입 확장 형태로 작성한다는 점입니다. Number에 padLeft라는 함수는 존재하지 않지만, 프로토타입 확장을 통해 모든 Number에 동일한 메소드를 구현할 수 있습니다. 주어진 함수는 두 개인데, 이는 날짜 데이터를 아름답게 표시하는 용도로 사용할 것입니다.
- `src/script.js`
  - 여러분이 구현해야 할 함수들의 목록이 있습니다. 자세한 설명은 각 함수 위에 주석으로 적혀있습니다.
- `style/style.css`
  - 알림창 등 div 몇가지는 기본적으로 제공됩니다만, 나머지는 여러분이 자유롭게 디자인할 수 있습니다.
- `lib/fakeServer.js`
  - 마치 서버처럼 작동하게 하는 비동기 API들입니다. 이 파일을 수정할 필요는 없습니다.
- `package.json`
  - 이 프로젝트에 필요한 라이브러리와 테스트 도구들을 node package manager를 이용해 다운로드 할 수 있도록 돕는 파일입니다. 이에 대해 더 알고 싶으면 [여기](https://docs.npmjs.com/files/package.json)를 참조하거나, 구글에서 package.json 으로 검색해보세요.

* * *

## A note about `<form>` tag

`<form>` 태그는 Web Application에서 아주 많이 쓰이는 태그입니다. 원래 HTML에서는 정적 페이지의 전환을 염두해두고 만들어졌습니다. 그래서 form 태그를 이용해 사용자 입력을 어딘가로 전송하면 또다른 정적 페이지로 전환됩니다. (흔히 브라우저가 깜빡인다고 표현합니다)

그러나 현대적인 Web Application은, JavaScript를 이용해서 화면 내용의 일부분만 동적으로 갱신하며, 보다 더 interactive하고 seamless한 형태로 만듭니다. 여전히 form 태그의 목적은 사용자 입력을 담는 형태로 사용하지만, 원래의 동작인 화면 전환을 하지 못하도록 기본 동작을 막는 형태로 구현됩니다.

여러분이 form 태그 안에 button 태그로 제출 버튼을 만들고, 이벤트 핸들러를 붙이게 되면, 기본 동작을 막는 코드를 추가해야 할 것입니다. 다음 링크를 참고하세요.

[MDN event.preventDefault](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault)

## A note about `Date` object

`Date` 객체는 JavaScript에서 날짜와 시간을 다룰 때 쓰입니다. 다음의 간단한 사용법을 참조하세요.

```javascript
var now = new Date(); // 현재 시간을 바탕으로 한 date 객체를 생성합니다

var date = new Date(2019, 2, 1, 1, 10, 30);
// 특정 시간을 바탕으로 한 date 객체를 생성합니다.
// 위 결과는 2019년 3월 1일 오전 1시 10분 30초를 의미합니다
```

`new Date`를 통해 만들어진 객체는 시각을 표시하는 문자열을 반환합니다. 우리가 구현해야 할 목표는, 객체의 다양한 메소드를 이용해, 특정 값들을 받아내고, 이를 문자열로 조합하는 것입니다. [MDN Date 객체 항목](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)에 여러분이 필요로 하는 메소드들을 찾아볼 수 있습니다. 직접 API 문서를 찾아서 해결하세요.