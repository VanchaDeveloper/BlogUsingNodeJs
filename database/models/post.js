const mongoose=require('mongoose');

  const PostSchema=new mongoose.Schema({

    title :  {
        type: String,
        required: true
    },
    description :  {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt:
    {
      type:Date,
      default:  new Date()
    }

  })

  const Post = mongoose.model('Post' , PostSchema);

  module.exports= Post;
