// const mongoose = require('mongoose');

// const reviewSchema = mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//   },
//   reviews: [
//     {
//       reviewer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//       reply: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Reply',
//         },
//       ],
//     },
//   ],
// });

// const review = mongoose.model('Review', reviewSchema);

// module.exports = review;
