const Riddle = require('../models/Riddle');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllRiddles = async (req, res) => {
  const riddles = await Riddle.find({});
  res.status(200).json({ riddles });
};

const getRiddle = async (req, res) => {
  const {
    params: { id: riddleId },
  } = req;

  const riddle = await Riddle.findOne({
    _id: riddleId,
  });
  if (!riddle) {
    throw new NotFoundError(`No riddle with id ${riddleId}`);
  }
  res.status(StatusCodes.OK).json({ riddle });
};

const createRiddle = async (req, res) => {
  const riddle = await Riddle.create(req.body);
  res.status(StatusCodes.CREATED).json({ riddle });
};

const updateRiddle = async (req, res) => {
  const { id: riddleID } = req.params;
  console.log(req.body);
  const riddle = await Riddle.findOneAndUpdate({ _id: riddleID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!riddle) {
    throw new NotFoundError(`No riddle with id ${riddleID}`);
  }

  res.status(StatusCodes.OK).json({ riddle });
};

const deleteRiddle = async (req, res) => {
  const {
    params: { id: riddleId },
  } = req;

  const riddle = await Riddle.findByIdAndRemove({
    _id: riddleId,
  });
  if (!riddle) {
    throw new NotFoundError(`No riddle with id ${riddleId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getRandomRiddle = async (req, res) => {
  const randomRiddle = await Riddle.aggregate([{ $sample: { size: 1 } }]);

  res.send(randomRiddle);
};

module.exports = {
  createRiddle,
  deleteRiddle,
  getAllRiddles,
  updateRiddle,
  getRiddle,
  getRandomRiddle,
};
