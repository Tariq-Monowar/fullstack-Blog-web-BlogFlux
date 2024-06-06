require("dotenv").config();
const Post = require("../models/posts.models");
const User = require("../models/users.models");
const imgbbUploader = require("imgbb-uploader");

// const getAllPost = async (req, res) => {
//   try {
//     const allPost = await Post.find().populate({
//       path: 'likes',
//       populate: {
//         path: 'user',
//         select: '-email -password -createdOn'
//       }
//     }).populate('user', '-email -password -createdOn');
//     res.status(201).json(allPost);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// const getAllPost = async (req, res) => {
//   try {
//     const allPost = await Post.find().populate({
//       path: 'likes',
//       populate: {
//         path: 'user',
//         select: '-email -password -createdOn'
//       }
//     }).populate({
//       path: 'comments',
//       populate: {
//         path: 'user',
//         select: '-email -password -createdOn'
//       }
//     }).populate('user', '-email -password -createdOn');
//     res.status(201).json(allPost);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find()
      .populate("likes.user", "-email -password -createdOn")
      .populate("comments.user", "-email -password -createdOn")
      .populate("user", "-email -password -createdOn");
    res.status(201).json(allPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createPost = async (req, res) => {
  try {
    const { content, title } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({
        message: "content is null",
      });
    }

    const newPost = new Post({
      content,
      title,
      user: userId,
    });

    if (req.files && req.files.image) {
      console.log(req.files);
      const base64string = req.files.image.data.toString("base64");
      const img = await imgbbUploader({
        apiKey: process.env.IMGBB_API_KEY,
        base64string,
      });
      newPost.image = img.url;
    }

    await newPost.save();

    await newPost.populate("user", "-email -password -createdOn");

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const { content, title } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }

    // console.log(post.user.toString(), userId.toString());
    if (post.user.toString() !== userId.toString()) {
      return res.status(401).json({
        message: "Unauthorized to update Post",
      });
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (req.files && req.files.image) {
      const base64string = req.files.image.data.toString("base64");
      const img = await imgbbUploader({
        apiKey: process.env.IMGBB_API_KEY,
        base64string,
      });
      post.image = img.url;
    }

    await post.populate("user", "-email -password -createdOn");

    const updatePost = await post.save();
    res.status(201).json(updatePost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: `Post not found`,
      });
    }
    if (post.user.toString() !== userId.toString()) {
      return res.status(400).json({
        message: "Unauthorized to delete Post",
      });
    }
    await Post.findByIdAndDelete(postId);
    res.status(201).json({
      message: `delete successfull....`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// const likeUnlikePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.userId;
//     const { rating } = req.body;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(400).json({
//         message: `Post not found`,
//       });
//     }

//     if (post.likes.includes(userId)) {
//       post.likes = post.likes.filter(
//         (like) => like.toString() !== userId.toString()
//       );
//       await post.save();
//     } else {
//       post.likes.push(userId);
//       await post.save();
//     }

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// const likeUnlikePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.userId;
//     const { rating } = req.body;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(400).json({
//         message: `Post not found`,
//       });
//     }

//     const existingLikeIndex = post.likes.findIndex(
//       (like) => like.user.toString() === userId.toString()
//     );

//     if (existingLikeIndex !== -1) {
//       post.likes.splice(existingLikeIndex, 1);
//     } else {
//       post.likes.push({ user: userId, rating });
//     }

//     await post.save();

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const likeUnlikePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.userId;
//     const { rating } = req.body;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(400).json({
//         message: `Post not found`,
//       });
//     }

//     const existingLike = post.likes.find(
//       (like) => like.user.toString() === userId.toString()
//     );

//     if (existingLike) {
//       existingLike.rating = rating; // Update the rating
//     } else {
//       post.likes.push({ user: userId, rating });
//     }

//     await post.save();

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const { rating } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = post.likes.find(
      (like) => like.user.toString() === userId.toString()
    );

    if (rating && rating != 0) {
      if (existingLike) {
        existingLike.rating = rating;
      } else {
        post.likes.push({ user: userId, rating });
      }
    } else {
      if (existingLike) {
        post.likes = post.likes.filter(
          (like) => like.user.toString() !== userId.toString()
        );
      }
    }

    await post.save();

    await post.populate("likes.user", "-email -password -createdOn");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in likeUnlikePost:", error);

    // Return the error message as a response
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: `Post not found`,
      });
    }
    const newComment = {
      content,
      user: userId,
    };

    post.comments.push(newComment);

    await post.save();

    // Populate the user field in the newly added comment
    await post.populate("comments.user", "-email -password -createdOn");

    // Return the post with populated comments
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: `Post not found`,
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(400).json({
        message: `Comment not found`,
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(401).json({
        message: "Unauthorized to delete this comment",
      });
    }

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const topBlogs = async (req, res) => {
  try {
    const postData = await Post.find()
      .lean()
      .populate("user", "-email -password -createdOn");
    const postsWithPopularity = postData.map((post) => {
      const totalLikes = post.likes.reduce((acc, like) => acc + like.rating, 0);
      const averageRating = totalLikes / post.likes.length || 0;
      const totalComments = post.comments.length;
      const popularityScore = totalLikes + averageRating + totalComments;
      // return {totalLikes, totalComments, averageRating, popularityScore};
      return { ...post, popularityScore, averageRating, totalLikes };
    });

    postsWithPopularity.sort((a, b) => b.popularityScore - a.popularityScore);

    res.status(200).json(postsWithPopularity);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const topBloger = async (req, res) => {
  /**
   * Overview for me
   * step1: Fetches all posts and populates the user field.
   * step2: Calculates the total likes, comments, and average rating for each user.
   * step3: Computes a popularity score for each user.
   * step4: Sorts the users based on their popularity scores.
   * step5: Returns the sorted list of top bloggers.
   */
  try {
    /**
     * step1:-
     */
    // Fetch all posts and populate the user field
    const posts = await Post.find().populate(
      "user",
      "-email -password -createdOn"
    );

    /**
     * step2:-
     */
    // Initialize an object to hold user scores
    // This object will store accumulated scores for each user.
    const userScores = {};

    /**
     * step3:-
     */
    // Iterate over each post and calculate scores
    /**
     * step1: For each post, it checks if the user already has an entry in the userScores object.
     *        //If not, it initializes an entry for the user.
     * step2: It then updates the user's score with the total likes, total comments, average rating, and the count of posts.
     */
    posts.forEach((post) => {
      const userId = post.user._id;
      if (!userScores[userId]) {
        userScores[userId] = {
          user: post.user,
          totalLikes: 0,
          totalComments: 0,
          totalRating: 0,
          postCount: 0,
          totalPosts: 0, // Initialize the totalPosts field
        };
      }

      const userScore = userScores[userId];
      userScore.totalLikes += post.likes.reduce(
        (acc, like) => acc + like.rating,
        0
      );
      userScore.totalComments += post.comments.length;
      userScore.totalRating += post.likes.length
        ? post.likes.reduce((acc, like) => acc + like.rating, 0) /
          post.likes.length
        : 0;
      userScore.postCount += 1;
      userScore.totalPosts += 1; // Increment the totalPosts field
    });
    /**
     * step4:-
     */
    // Calculate popularity scores for each user
    const bloggers = Object.values(userScores).map((userScore) => {
      const {
        user,
        totalLikes,
        totalComments,
        totalRating,
        postCount,
        totalPosts,
      } = userScore;
      const averageRating = totalRating / postCount || 0;
      const popularityScore = totalLikes + averageRating + totalComments;
      return {
        user,
        popularityScore,
        totalLikes,
        totalComments,
        averageRating,
        totalPosts, // Include the totalPosts field in the response
      };
    });

    /**
     * step5:-
     */
    // Sort the users by their popularity scores
    bloggers.sort((a, b) => b.popularityScore - a.popularityScore);

    // Send the response
    res.status(200).json(bloggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  createComment,
  deleteComment,
  topBlogs,
  topBloger,
};
