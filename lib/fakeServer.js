// You don't need to modify this file
// This file works like server
(function() {

  var DATA = [
    { user: 'ingikim', message: 'Welcome to Code States #codestates', created_at: '2019-01-03 12:30:20', url: 'img/codestates2.png' },
    { user: 'johnnykoo', message: 'this is test message #pair #programming', created_at: '2019-01-04 18:30:20', url: 'img/codestates1.jpg' },
    { user: 'ingikim', message: 'code now! #work #hard', created_at: '2019-01-05 07:30:20', url: 'img/codestates3.jpg' }
  ]

  if(typeof window !== 'undefined') {
    window.API = {};
  }
  else {
    global.API = {};
  }

  API.fetchData = function(callback) {
    setTimeout(function() {
      callback(DATA)
    }, 100);
  };

  API.validateData = function(post) {
    var o = {
      result: false
    };
    if(post.user && post.message) {
      if(post.created_at) {
        if(/\s/g.test(post.user)) {
          o.message = 'user should have no spaces';
        }
        else {
          o.result = true;
        }
      }
      else {
        o.message = 'cannot post without created_at timestamp';
      }
    }
    else {
      o.message = 'cannot post without user or message';
    }
    return o;
  }

  API.postData = function(post, callback) {
    var check = API.validateData(post);
    if(check.result) {
      post.url = 'img/pic' + (Math.floor(Math.random() * 4) + 1) + '.jpeg';
      DATA.push(post);
      setTimeout(callback, 100);
    }
    else {
      throw new Error(check.message);
    }
  }

})();


if(typeof module !== 'undefined') {
  module.exports = {
    API
  };
}