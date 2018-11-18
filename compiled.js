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

window.onload = function () {
  //Event Listener - submit class button click
  document.querySelector('.submit').onclick = function () {
    this.setAttribute('disabled', 'disabled');
    this.innerHTML = 'Loading';
    fetch(formApi()).then(function (response) {
      return response.json();
    }).then(function (newsjson) {
      return handleJSON(newsjson);
    }).catch(function (err) {
      return alert('Error. Try again later');
    });
  }; //Show last articles in markup container


  function handleJSON(respon) {
    var newscontainer = document.querySelector('.news__container');
    newscontainer.innerHTML = '';
    document.querySelector('.news__title').style.display = "none";
    respon.articles.forEach(function (val) {
      var article = new Article(val);
      newscontainer.appendChild(article.generateArticle());
    });
    document.querySelector('.submit').removeAttribute('disabled');
    document.querySelector('.submit').innerHTML = 'Get news';
    document.querySelector('.news__title').style.display = "block";
  } //Form API url from user changed selects


  function formApi() {
    var country = document.getElementById('country').value;
    var category = document.getElementById('category').value;
    var pagesize = document.getElementById('pagesize').value;
    return "https://newsapi.org/v2/top-headlines?country=".concat(country, "&category=").concat(category, "&sortBy=popularity&pageSize=").concat(pagesize, "&apiKey=59e5ec14708e4b768acc8a0664f22906");
  }
};
