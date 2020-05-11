const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

router.get('/articles', adminController.getArticles);

router.get('/add-article', adminController.getAddArticle);

router.post('/add-article', adminController.postAddArticle);

router.get('/edit-article/:articleId', adminController.getEditArticle);

router.post('/edit-article', adminController.postEditArticle);

router.post('/delete-article', adminController.postDeleteArticle);

router.get('/', adminController.getArticles);

module.exports = router;