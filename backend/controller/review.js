// const Review = require('../model/review');

// exports.addReview = async (req, res, next) => {
//   const { rating, content } = req.body;

//   const reviewData = {
//     reviewer: req.user._id,
//     rating,
//     content,
//   };
//   try {
//     const _Review = await Review.findOne({ productId: req.params.productId })
//     if (_Review) {
//       console.log("review", _Review)
//       _Review.reviews.push(reviewData);
//       const updatedReview = await _Review.save();
//       return res.status(201).json({ success: true, message: updatedReview });
//     } else {
//       const newReview = new Review({
//         productId: req.params.productId,
//         reviews: reviewData,
//       });
//       const userReview = await newReview.save();
//       return res.status(201).json({ success: true, message: userReview });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteReview = async (req, res, next) => {
//   res.json({ message: 'Product Deleted' });
  //   const productItemId = req.params.id;
  //   try {
  //     const userData = await Review.findOne({ userId: req.user._id }).populate('Review').exec();
  //     const Review = userData.products;
  //     const updatedReview = Review.filter(
  //       (_Review) => _Review._id.toString() !== productItemId.toString(),
  //     );
  //     userData.products = updatedReview;
  //     await userData.save();
  //     return res.status(200).json({ success: true, message: userData });
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
// };

// exports.updateReview = async (req, res, next) => {
//   res.json({ message: 'Product updated' });
  //   const productItemId = req.params.id;
  //   try {
  //     const userData = await Review.findOne({ userId: req.user._id }).populate('Review').exec();
  //     const Review = userData.products;
  //     const updatedReview = Review.filter(
  //       (_Review) => _Review._id.toString() !== productItemId.toString(),
  //     );
  //     userData.products = updatedReview;
  //     await userData.save();
  //     return res.status(200).json({ success: true, message: userData });
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
// };
