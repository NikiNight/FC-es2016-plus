window.onload = function() {

    //Event Listener - submit class button click
    document.querySelector('.submit').onclick = function () {
        disableButton(this);
        let news = new News(getInputValue('country'), getInputValue('category'), getInputValue('pagesize'));
        createNews(news);
    };

    async function createNews(news) {
        let newsContainer = getNewsContainer();
        hideTitle();
        try {
            let articles = await news.getData();
            if(articles){
                articles.forEach((val) => {newsContainer.appendChild(val.generateArticle())});
                addShowMoreClickListener();
            }
        } catch (err) {
            console.log(err);
            showAlertMessage();
        }
        showTitle();
        enableButton('.submit');

    }
    
    //Get input value from UI
    function getInputValue(element) {
        return document.getElementById(element).value;
    }

    //Disable submit button, prevent multiclick
    function disableButton(button) {
        button.setAttribute('disabled', 'disabled');
        button.innerHTML = 'Loading';
    }

    function enableButton(button) {
        document.querySelector(button).removeAttribute('disabled');
        document.querySelector(button).innerHTML = 'Get news';
    }

    //Get and clear news container in DOM
    function getNewsContainer() {
        const newscontainer = document.querySelector('.news__container');
        newscontainer.innerHTML = '';
        return newscontainer;
    }

    //Hide News Title
    function hideTitle() {
        document.querySelector('.news__title').style.display = "none";
    }

    //Show News Title
    function showTitle() {
        document.querySelector('.news__title').style.display = "block";
    }

    //Event listener - show more button click
    function addShowMoreClickListener() {
        document.querySelectorAll('.article_show-more').forEach((val) => {
            val.onclick = function () {
                this.parentNode.querySelector('.article__body').style.display = 'block';
                this.parentNode.querySelector('.article_show-more').style.display = 'none';
            }
        });
    }

    function showAlertMessage() {
        document.querySelector('.news__title').innerHTML = 'Something went wrong. Try again later';
    }

};