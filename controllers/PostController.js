import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not get posts",
    });
  }
};

export const create = async (req, res) => {
  try {
    console.log("testestestestes_dwafnkan",req.body)
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });
    console.log("tags",req.body.tags,"body",req.body)

    const post = await doc.save();
    // console.log(doc, "doc");
    res.json(post);
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "could not create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "could not get posts",
    });
  }
};

// export const getOne = async function (req, res) {
//   try {
//     const postId = req.params.id;
//     console.log(postId)
//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: "after",
//       },
//       function(err, doc) {
//         if(err) {
//             console.log(err);
//             return res.status(500).json({
//                 message: "could not return post",
//             });
//         }

//         if(!doc) {
//             return res.status(500).json({
//                 message: "could not find post",
//             })
//         }
//         res.json(doc);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "could not get postawd",
//     });
//   }
// };

export const getOne = function (req, res) {
  const postId = req.params.id;
  // console.log(postId);

  PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewsCount: 1 } },
    { returnDocument: "after" }
  ).populate("user")
    .then((doc) => {
      if (!doc) {
        return res.status(500).json({
          message: "could not find post",
        });
      }
      res.json(doc);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "could not return post",
      });
    });
};

export const update = function (req, res) {
  const postId = req.params.id;
  // console.log(postId);

  PostModel.findOneAndUpdate(
    { _id: postId },
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    }
  )
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "could not update post",
      });
    });
};

export const remove = function (req, res) {
  const postId = req.params.id;
  // console.log(postId);

  PostModel.findOneAndDelete({ _id: postId })
    .then((doc) => {
      if (!doc) {
        return res.status(500).json({
          message: "could not find post",
        });
      }
      res.json({ success: true });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "could not remove post",
      });
    });
};
