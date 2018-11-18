export default class Article {
    constructor({author, title, urlToImage, content, description, url}) {
        this.author = author;
        this.title = title;
        this.urlToImage = urlToImage;
        this.content = content;
        this.description = description;
        this.url = url;
    };

    //Article generator
    generateArticle(){
        let template = '';
        let article = document.createElement('article');
        article.className = 'article';
        if (this.author){
            template += `<p class="article__author">${this.author}</p>`;
        }
        if (this.title){
            template += `<h3 class="article__title">${this.title}</h3>`;
        }
        if (this.description){
            template += `<p class="article__description">${this.description}</p>`;
        }
        if (this.content || this.urlToImage) {

            template += `<button class="article_show-more">Show More</button><div class="article__body">`;

            if(this.urlToImage){
                template += `<img class="article__img" src="${this.urlToImage}">`;
            }
            if(this.content){
                template += `<p class="article__content">${this.content}</p>`;
            }

            template += `</div>`
        }

        if(this.url){
            template += `<a class="article__href" href="${this.url}" target="_blank">Show Source</a>`
        }

        article.innerHTML=template;

        if(this.content || this.urlToImage){
            article.querySelector('.article_show-more').addEventListener('click', () => Article.handleShowmoreClick(article));
        }

        return article;

    }

    //Event listener for show more button
    static handleShowmoreClick(article) {
         article.querySelector('.article__body').style.display = 'block';
         article.querySelector('.article_show-more').style.display = 'none';
    }
}