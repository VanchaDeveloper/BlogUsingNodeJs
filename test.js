const mongoose=require('mongoose');
const Post =require('./database/models/Post');
mongoose.connect("mongodb://localhost:27017/testDB", { useNewUrlParser: true });
//Post.create(
  //{
  // title:'second blog',
    //description:'blog description',
    //content:'blog content'
    //  },(error ,post)=>{
    //console.log(error , post);
//  }
//)
//Post.find({
  //title:'first blog'
//} ,(error , post)=>{
//  console.log(post);
//})
//Post.findById("5ca368f448c3f9326c754e69",(error ,post)=>console.log(post));
//Post.findByIdAndUpdate("5ca368f448c3f9326c754e69" , {title:'blog Post'}
//, (error , post)=>console.log(post));
