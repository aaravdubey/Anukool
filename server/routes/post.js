import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { userModel } from "../models/user.js";
import { CommentModel, PostModel } from "../models/post.js";
import { GenerateID } from "../services/IdGenerator.js";
import { spawn } from 'child_process';

const router = express.Router();

const executePython = async (script, arg) => {
  // const argumentss = args.map(arg => arg.toString());

  const py = spawn("python", [script, arg.toString()]);

  const result = await new Promise((resolve, reject) => {
    let output;

    // Get output from python script
    py.stdout.on('data', (data) => {
      output = data.toString();
      console.log(`[python] ${output}`);
    });

    // Handle erros
    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured: ${data}`);
      reject(`Error occured in ${script}`);
    });

    py.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
      resolve(output);
    });
  });

  return result;
}

router.post('/create', verifyToken, async (req, res) => {
  try {
    console.log(req.body.userData);
    const { userId, anonymousName } = req.body.userData;
    const { title, text, visibility } = req.body;

    const user = await userModel.findOne({ userId });
    console.log(text);
    let sentiment = await executePython('routes/scripts/sentiment_analysis.py', text);
    sentiment = sentiment.trim();

    if (user) {
      const newPost = await PostModel({
        anonymousName,
        title,
        text,
        visibility,
        userId,
        sentiment,
        postId: 'PID' + await GenerateID()
      }).save();

      const comment = await CommentModel({
        postId: newPost.postId
      }).save();

      console.log(newPost);

      res.status(200).json({ msg: 'Created Post' });
    } else {
      res.status(404).json({ msg: 'Account not found ' });
    }

  } catch (error) {
    console.log("ERRRRRRRRRRRRR");
    console.log(error);
    res.status(500).json({ msg: 'Some error occured' });
  }
})

router.post('/comment', verifyToken, async (req, res) => {
  try {
    console.log(req.body.userData);
    const { userId } = req.body.userData;
    const { pid, comment } = req.body;

    const post = await PostModel.findOne({ postId: pid });
    console.log("XXX");
    console.log(comment);
    if (post) {
      let commentDoc = await CommentModel.findOne({ postId: pid });
      commentDoc.comments.push({
        text: comment,
        userId
      })
      commentDoc.markModified('comments');
      commentDoc.save();

      console.log(commentDoc);
      res.status(200).json({ commentDoc });
    } else {
      res.status(404).json({ msg: 'Post not found ' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Some error occured' });
  }
})

// router.post('/get-comments', verifyToken, async (req, res) => {
//   try {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const { pid } = req.body;
//     let post = await PostModel.findOne({ postId: pid });

//     if (post) {
//       let comment = await CommentModel.findOne({ postId: pid });
//       let commentObject = comment.toObject().comments;
//       commentObject = await Promise.all(commentObject.map(async (c) => {
//         let date = new Date(c.datetime);
//         let user = await userModel.findOne({ userId: c.userId });
//         c.name = user.anonymousName;
//         c.datetime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
//         console.log(c);
//         return c;
//       }))
//       res.status(200).json({ commentObject });
//     }

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Some error occured' });
//   }
// })

router.post('/get-posts', verifyToken, async (req, res) => {
  try {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let posts = await PostModel.find({ visibility: 'public' });

    posts = await Promise.all(posts.map(async (post) => {
      let date = new Date(post.datetime);
      let user = await userModel.findOne({ userId: post.userId });
      let postObject = post.toObject();
      postObject.name = user.anonymousName;
      postObject.datetime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      // console.log(postObject);
      return postObject;
    }))
    res.status(200).json({ posts });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Some error occured' });
  }
})
function formatDate(timestamp) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

router.post('/get-post', verifyToken, async (req, res) => {
  try {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let post = await PostModel.findOne({ visibility: 'public', postId: req.body.pid });

    if (post) {
      let comment = await CommentModel.findOne({ postId: req.body.pid });

      let date = new Date(post.datetime);
      let user = await userModel.findOne({ userId: post.userId });
      let postObject = post.toObject();
      postObject.name = user.anonymousName;
      postObject.datetime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      console.log("qwertyuio");
      console.log(postObject);

      let commentObject = comment.toObject().comments;
      commentObject = await Promise.all(commentObject.map(async (c) => {
        let date = new Date(c.datetime);
        let user = await userModel.findOne({ userId: c.userId });
        c.name = user.anonymousName;
        c.datetime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        console.log(c);
        return c;
      }))

      res.status(200).json({ post: postObject, comments: commentObject });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Some error occured' });
  }
})

export default router;