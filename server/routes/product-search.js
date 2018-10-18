const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('V0Z65ZQAJE', '124c4a83a85aadc48043f32ab8075a9d');
const index = client.initIndex('WEBAPPANGULAR');

router.get('/', (req, res, next) => {
  if (req.query.query) {
    index.search({
      query: req.query.query,
      page: req.query.page,
    }, (err, content) => {
      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query
      });
    });
  }
});

module.exports = router;
