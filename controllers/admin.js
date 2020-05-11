const ArticleModel = require('../models/article');

exports.getArticles = (req, res, next) =>{
   
    ArticleModel.find()
        .then( articlesFetched => {
            res.render('articles', {
                articleList: articlesFetched,  
                pageTitle: 'Articles',
                path: '/articles'
              }); 
        })
        .catch(err =>{
            console.log("-------------------Error finding Articles",err)
        });
    
};

exports.getAddArticle = (req, res, next) =>{
      res.render('edit-article', {
        editArticle: false,  
        pageTitle: 'Add Article',
        path: '/add-article'
      }); 

}

exports.postAddArticle = (req, res, next) =>{
    let title = req.body.title;
    let price = req.body.price;
    let description = req.body.description;

    var article = new ArticleModel({
        title : title,
        price : price,
        description : description
    })
    article.save()
    .then( result => {
        res.redirect('/articles');
    })
    .catch(err =>{
        console.log("-------------------Error Creating Articles",err)
    });
}

exports.getEditArticle = (req, res, next) =>{

    let articleId = req.params.articleId;

    ArticleModel.findById(articleId)
    .then( article => {
        res.render('edit-article', {
            editArticle: true,  
            article: article,
            pageTitle: 'Edit Article',
            path: '/edit-article'
          }); 
    })
    .catch( err => {
        console.log("error in fetching article",err);
    })
} 

exports.postEditArticle = (req, res, next) =>{

    let updatedTitle = req.body.title;
    let updatedPrice = req.body.price;
    let updatedDescription = req.body.description;
    let articleId = req.body.articleId;
console.log("articleId",articleId)
    ArticleModel.findById(articleId)
    .then( article => {
		console.log("article",article)
        article.title = updatedTitle;
        article.price = updatedPrice;
        article.description = updatedDescription;

        return article.save()
    })
    .then( result => {
        res.redirect('/articles');
    })
    .catch( err =>{
        console.log("error in updating article",err);
    })  
} 

exports.postDeleteArticle = (req, res, next) =>{

    let articleId = req.body.articleId;

    ArticleModel.findByIdAndDelete(articleId)
    .then( article => {
        res.redirect('/articles');
    })
    .catch( err => {
        console.log("error in deleting article",err);
    })
} 