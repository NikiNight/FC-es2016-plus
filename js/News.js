class News {
    constructor(country, category, pagesize){
        this.country = country;
        this.category = category;
        this.pagesize = pagesize;
    };

    //Get API call address
    get formApi(){
        return (`https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.category}&sortBy=popularity&pageSize=${this.pagesize}&apiKey=59e5ec14708e4b768acc8a0664f22906`);
    }

    //Get json data from API
    getData(){
        return fetch(this.formApi)
            .then(response => response.json())
            .then(newsjson => this.handleJSON(newsjson))
            .finally(() => console.log('Finished working with response'));
    }

    //Form articles list
    handleJSON(respon){
        let articles = [];
        respon.articles.forEach(function (val) {
            articles.push(new Article(val));
        });
        return articles;
    }
}