import Article from './Article.js';

window.onload = function() {

    //Event Listener - submit class button click
    document.querySelector('.submit').onclick = function () {

        this.setAttribute('disabled', 'disabled');
        this.innerHTML = 'Loading';

        fetch(formApi())
            .then(response => response.json())
            .then(newsjson => handleJSON(newsjson))
            .catch(err => alert('Error. Try again later'));
    };

    //Show last articles in markup container
    function handleJSON(respon){
        const newscontainer = document.querySelector('.news__container');
        newscontainer.innerHTML = '';
        document.querySelector('.news__title').style.display = "none";

        respon.articles.forEach(function (val) {
            let article = new Article(val);
            newscontainer.appendChild(article.generateArticle());
        });

        document.querySelector('.submit').removeAttribute('disabled');
        document.querySelector('.submit').innerHTML = 'Get news';
        document.querySelector('.news__title').style.display = "block";
    }

    //Form API url from user changed selects
    function formApi() {
        let country = document.getElementById('country').value;
        let category = document.getElementById('category').value;
        let pagesize = document.getElementById('pagesize').value;
        return (`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&sortBy=popularity&pageSize=${pagesize}&apiKey=59e5ec14708e4b768acc8a0664f22906`);
    }
};