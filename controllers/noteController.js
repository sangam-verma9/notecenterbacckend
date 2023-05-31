const asynchandler = require("express-async-handler");
const Note = require("../models/noteModel");

// const getnote = asynchandler(async (req, res) => {
//   const note = await Note.find({req.user._id});
//   res.json(note);
// });

const getnote = asynchandler(async (req, res) => {
  const note = await Note.find();
  res.json(note);
});

const createnote = asynchandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("please fill all the fields");
  } else {
    const note = Note.create({ title, content, category });
    // const createnote = await note.save();
    res.status(201).json(createnote);
  }
});

// const createnote = asynchandler(async (req, res) => {
//   const { title, content, category } = req.body;
//   if (!title || !content || !category) {
//     res.status(400);
//     throw new Error("please fill all the fields");
//   } else {
//     const note = new Note({ user: req.user._id, title, content, category });
//     const createnote = await note.save();
//     res.status(201).json(createnote);
//   }
// });

const getnotebyid = asynchandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(400).json({ message: "note not find" });
  }
});

const updatenote = asynchandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("you can not perform this operaion");
  // }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updnote = note.save();
    res.status(200).json(updnote);
  } else {
    res.status(400);
    throw new Error("note not found");
  }
});

// const deletenote = asynchandler(async (req, res) => {
//   const note = await Note.findById(req.params.id);
//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("you can not perform this operaion");
//   }
//   if (note) {
//     await note.deleteOne();
//     res.status(200).json({ message: "note deleted" });
//   } else {
//     res.status(400);
//     throw new Error("note not found");
//   }
// });

const deletenote = asynchandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("you can not perform this operaion");
  // }
  if (note) {
    await note.deleteOne();
    res.status(200).json({ message: "note deleted" });
  } else {
    res.status(400);
    throw new Error("note not found");
  }
});

module.exports = { getnote, createnote, getnotebyid, updatenote, deletenote };
