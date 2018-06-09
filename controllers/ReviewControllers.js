const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    const sortReview = req.order ? req.order : 'dateAdded'
    User.findById(req.user._id)
      .populate({
        path: 'reviews',
        populate: { path: 'productId' }
      })
      .sort(sortReview)
      .exec((err, doc) => {
        res.send(doc.reviews);
      });
  },

  async addReview(req, res) {
    const userId = req.user._id;
    const values = { userId, ...req.body };

    const newReview = await new Review(values).save();
    console.log(newReview.productId)
    const Avg = fetchScore(newReview.productId)
    console.log(Avg)
    res.send(Avg)
    //const productScore = await fetchProduct(newReview.productId,Avg[0].scoreavg)
  },

  async updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatereview = await Review.findByIdAndUpdate(id, body, { new: true })
    const Avg = await Review.aggregate([
      { $match : { productId : updatereview.productId } },
      { $group : {
        _id : "",
        scoreavg : {$avg : "$score"}
      }}
    ])
    const productScore = await Product.findByIdAndUpdate(
      updatereview.productId,
      {
        avgScore : Avg[0].scoreavg
      }
      ,{new : true}
    )
    res.send(productScore);
  },

  removeReview(req, res) {
    const { id } = req.params;

    Review.findOne({ _id: id },async (err, doc) => {
      doc.remove(err => {
        if (err) {
          console.warn(err);
          res.status(410).send('리뷰 제거 실패');
        }
        //res.status(200).send(id);
      });
      const Avg = await Review.aggregate([
        { $match : { 
          $and : [
            {productId : doc.productId},
            {_id : {$ne : id}}
          ]}}
          ,
        { $group : {
          _id : "",
          scoreavg : {$avg : "$score"}
        }}
      ])
      console.log(Avg)
      const productScore = await Product.findByIdAndUpdate(
        doc.productId,
        {
          avgScore : Avg[0].scoreavg
        }
        ,{new : true}
      )
      console.log(productScore);
      res.send(productScore);
    });
    console.log(id)
    /*console.log(removereview.productId);
    const Avg = await Review.aggregate([
      { $match : { 
        $and : [
          {productId : removereview.productId},
          {_id : {$ne : id}}
        ]}}
        ,
      { $group : {
        _id : "",
        scoreavg : {$avg : "$score"}
      }}
    ])
    console.log(Avg)
    const productScore = await Product.findByIdAndUpdate(
      removereview.productId,
      {
        avgScore : Avg[0].scoreavg
      }
      ,{new : true}
    )
    console.log(productScore);
    res.send(productScore);*/

  },

  fetchOneReview(req, res) {
    const { id } = req.params;

    Review.findById(id).exec((err, doc) => {
      res.send(doc);
    });
  },

  fetchMyReview(req, res) {
    const productId = req.params.id;
    const userId = req.user._id;

    Review.findOne({ userId, productId })
      .populate('userId')
      .exec((err, doc) => {
        if (err) {
          res.status(404).send('조회 실패');
        }
        res.status(200).send(doc);
      });
  },

  fetchProductReviews(req, res) {
    const productId = req.params.id;
    const userId = req.user._id;

    // FIX: dateAdded 순으로 정렬
    Review.find({ productId, userId: { $ne: userId } })
      .populate('userId')
      .exec((err, doc) => {
        if (err) {
          res.status(404).send('조회 실패');
        }
        res.status(200).send(doc);
      });
  }
};

const fetchScore = Id =>{
  new Promise(resolve => {
    Review.aggregate([
      { $match : { productId : Id} },
      { $group : {
        _id : "",
        scoreavg : {$avg : "$score"}
      }}
    ])
    .exec((err,doc)=>{
      if(!err){
        console.log(doc);
        resolve(doc);
      }
    })
  })
}

const fetchProduct = (Id,score) =>{
  new Promise(resolve =>{
    Product.findByIdAndUpdate(
      Id,
      { avgScore : score},
      {new : true}
    )
    .exec((err,doc)=>{
      if(!err){
        resolve(doc);
        console.log(doc);
      }
    })
  })
}

