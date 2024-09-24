const List = require("../models/List");

const getAllList = async (req, res) => {
  try {
    const list = await List.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const postList = async (req, res) => {
  try {
    const list = new List(req.body);
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.findByIdAndUpdate(id);
    res.status(200).send("Your list updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await list.findByIdAndDelete(id);
    res.status(200).send("Your list deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllList,
  postList,
  updateList,
  deleteList,
};
