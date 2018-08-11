// TODO

/*
 * clearList()
 *
 * arguments: 없음
 * return: 없음
 * 설명: ul#posts 이하에 렌더링된 모든 리스트, 즉 모든 자식 노드들이 지워져야 합니다
 */
function clearList() {

}

/*
 * makePostElement()
 *
 * arguments: post 객체 (user, message, url, created_at의 key-value pair를 갖고 있음)
 * return: jQuery object 형태로 wrapping된 element
 * 설명: 언제든 jQuery 메소드를 이용할 수 있는 element를 만듭니다
 *      이 함수에서는 element를 어딘가에 appen(또는 prepend)할 필요는 없습니다
 */
function makePostElement(post) {

}

/*
 * renderPost()
 *
 * arguments: 없음
 * return: 없음
 * 설명: API를 이용해 post 데이터를 받아온 후, ul#posts에 관련 내용을 자식 element로 추가합니다
 *      makePostElement에서 리턴한 jQuery element를 사용할 수 있습니다
 */
function renderPosts() {

}

/*
 * validate()
 *
 * arguments: 없음
 * return: boolean 값
 * 설명: #username 혹은 #message의 내용이 유효한지 확인 후 boolean 값으로 리턴합니다
 */
function validate() {

}

/*
 * displaySuccess(), displayError()
 *
 * arguments: 자유롭게 구현하세요
 * return: 자유롭게 구현하세요
 * 설명: 알림창을 경우에 따라 표시합니다. 어느정도 시간이 지나 저절로 사라지게 만드는 것도 재미있는 도전이 될 겁니다
 */
function displaySuccess() {

}

function displayError() {

}

/*
 * clearForm()
 *
 * arguments: 없음
 * return: 없음
 * 설명: 새 post를 보내고 나면, form 내용을 중복해서 올리지 않도록 지우는 것이 UX적으로 좋습니다
 */
function clearForm() {

}

/*
 * submitPost(event)
 *
 * arguments: #post 버튼을 눌렀을 때의 클릭 이벤트
 * return: 없음
 * 설명: API를 이용해 서버로 새 post를 전송합니다
 *      새 post를 서버로 보내기 전, 데이터가 유효한지 검증해야 합니다
 *      새 post를 만들고 난 후, 화면에 보이는 리스트를 갱신해야 합니다
 */
function submitPost(event) {
  event.preventDefault();

  // FILL MORE
}

/*
 * initialize()
 *
 * arguments: 없음
 * return: 없음
 * 설명: DOM이 로드된 후, 이 함수가 불립니다 (index.html 파일 참조)
 *      시작하자마자, renderPosts를 호출해야 합니다
 *      경우에 따라 이벤트 핸들러를 추가할 수 있습니다
 */
function initialize() {

  $('#post').on('click', submitPost);

  renderPosts();

}

// 아래 코드는 수정하지 마세요
if(typeof module !== 'undefined') {
  module.exports = {
    clearList,
    makePostElement,
    renderPosts,
    initialize
  };
}