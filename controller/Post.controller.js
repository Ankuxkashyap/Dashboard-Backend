import Post from "../model/Post.model.js";

export const CreatePost = async (req, res) => {
  try {
    const { title, caption, image, tags, status } = req.body;
    // console.log(req.body);
    if (!title || !caption || !image) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }
    const newPost = new Post({
      title,
      caption,
      image,
      tags,
      status,
      createdBy: req.user._id,
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "name email");
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const UpdatePost = async (req, res) => {
  const { title, caption, image, tags, status } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, caption, image, tags, status },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const DeletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postQuery = async (req, res) => {
  try {
    const { status, search, sort } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    let query = Post.find(filter).populate("createdBy", "name email");

    if (sort === "latest") {
      query = query.sort({ createdAt: -1 });
    } else if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    }

    const posts = await query;

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};