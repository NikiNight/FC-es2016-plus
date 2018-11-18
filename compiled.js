"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Article =
/*#__PURE__*/
function () {
  function Article(_ref) {
    var author = _ref.author,
        title = _ref.title,
        urlToImage = _ref.urlToImage,
        content = _ref.content,
        description = _ref.description,
        url = _ref.url;

    _classCallCheck(this, Article);

    this.author = author;
    this.title = title;
    this.urlToImage = urlToImage;
    this.content = content;
    this.description = description;
    this.url = url;
  }

  _createClass(Article, [{
    key: "generateArticle",
    //Article generator
    value: function generateArticle() {
      var template = '';
      var article = document.createElement('article');
      article.className = 'article';

      if (this.author) {
        template += "<p class=\"article__author\">".concat(this.author, "</p>");
      }

      if (this.title) {
        template += "<h3 class=\"article__title\">".concat(this.title, "</h3>");
      }

      if (this.description) {
        template += "<p class=\"article__description\">".concat(this.description, "</p>");
      }

      if (this.content || this.urlToImage) {
        template += "<button class=\"article_show-more\">Show More</button><div class=\"article__body\">";

        if (this.urlToImage) {
          template += "<img class=\"article__img\" src=\"".concat(this.urlToImage, "\">");
        }

        if (this.content) {
          template += "<p class=\"article__content\">".concat(this.content, "</p>");
        }

        template += "</div>";
      }

      if (this.url) {
        template += "<a class=\"article__href\" href=\"".concat(this.url, "\" target=\"_blank\">Show Source</a>");
      }

      article.innerHTML = template;

      if (this.content || this.urlToImage) {
        article.querySelector('.article_show-more').addEventListener('click', function () {
          return Article.handleShowmoreClick(article);
        });
      }

      return article;
    } //Event listener for show more button

  }], [{
    key: "handleShowmoreClick",
    value: function handleShowmoreClick(article) {
      article.querySelector('.article__body').style.display = 'block';
      article.querySelector('.article_show-more').style.display = 'none';
    }
  }]);

  return Article;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var News =
/*#__PURE__*/
function () {
  function News(country, category, pagesize) {
    _classCallCheck(this, News);

    this.country = country;
    this.category = category;
    this.pagesize = pagesize;
  }

  _createClass(News, [{
    key: "getData",
    //Get json data from API
    value: function getData() {
      var _this = this;

      return fetch(this.formApi).then(function (response) {
        return response.json();
      }).then(function (newsjson) {
        return _this.handleJSON(newsjson);
      }).catch(function (err) {
        return alert('Error. Try again later');
      });
    }
  }, {
    key: "handleJSON",
    value: function handleJSON(respon) {
      // const newscontainer = document.querySelector('.news__container');
      // newscontainer.innerHTML = '';
      // document.querySelector('.news__title').style.display = "none";
      var articles = [];
      respon.articles.forEach(function (val) {
        articles.push(new Article(val)); //newscontainer.appendChild(article.generateArticle());
      });
      return articles; // document.querySelector('.submit').removeAttribute('disabled');
      // document.querySelector('.submit').innerHTML = 'Get news';
      // document.querySelector('.news__title').style.display = "block";
    }
  }, {
    key: "formApi",
    //Get API call address
    get: function get() {
      return "https://newsapi.org/v2/top-headlines?country=".concat(this.country, "&category=").concat(this.category, "&sortBy=popularity&pageSize=").concat(this.pagesize, "&apiKey=59e5ec14708e4b768acc8a0664f22906");
    }
  }]);

  return News;
}();
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.onload = function () {
  //Event Listener - submit class button click
  document.querySelector('.submit').onclick = function () {
    disableButton(this);
    var news = new News(getInputValue('country'), getInputValue('category'), getInputValue('pagesize'));
    createNews(news); // fetch(formApi())
    //     .then(response => response.json())
    //     .then(newsjson => handleJSON(newsjson))
    //     .catch(err => alert('Error. Try again later'));
  };

  function createNews(_x) {
    return _createNews.apply(this, arguments);
  } //Get input value from UI


  function _createNews() {
    _createNews = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(news) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('start');
              _context.next = 3;
              return console.log(news.getData());

            case 3:
              console.log('finish');

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return _createNews.apply(this, arguments);
  }

  function getInputValue(element) {
    return document.getElementById(element).value;
  } //Disable submit button, prevent multiclick


  function disableButton(button) {
    button.setAttribute('disabled', 'disabled');
    button.innerHTML = 'Loading';
  } //Show last articles in markup container
  // function handleJSON(respon){
  //     const newscontainer = document.querySelector('.news__container');
  //     newscontainer.innerHTML = '';
  //     document.querySelector('.news__title').style.display = "none";
  //
  //     respon.articles.forEach(function (val) {
  //         let article = new Article(val);
  //         newscontainer.appendChild(article.generateArticle());
  //     });
  //
  //     document.querySelector('.submit').removeAttribute('disabled');
  //     document.querySelector('.submit').innerHTML = 'Get news';
  //     document.querySelector('.news__title').style.display = "block";
  // }
  //
  // //Form API url from user changed selects
  // function formApi() {
  //     let country = document.getElementById('country').value;
  //     let category = document.getElementById('category').value;
  //     let pagesize = document.getElementById('pagesize').value;
  //     return (`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&sortBy=popularity&pageSize=${pagesize}&apiKey=59e5ec14708e4b768acc8a0664f22906`);
  // }

};
