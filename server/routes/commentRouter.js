const { Router } = require('express');
const router = new Router();
const { Comment, User } = require('../db/models');

router.get('/:id', async (req, res) => {
  console.log('popali v ruchku get :id');
  const { id } = req.params;
  try {
    const findComments = await Comment.findAll({
      where: { tourId: id },
      include: { model: User, attributes: ['login'] },
    });
    // console.log('eto findComments====>',findComments);
    res.json(findComments);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id', async (req, res) => {
  const { user } = req.session;
  const userId = user.id;
  console.log('userId ===>', userId);
  const { id } = req.params;
  console.log('eto id comments===>', id);
  const { value } = req.body;
  console.log('eto value ===>', value);
  try {
    if (userId) {
      const comment = await Comment.create({
        userId: userId,
        tourId: id,
        isCheckedByAdmin: false,
        value,
      },
      );
      console.log(comment);
      res.json(comment);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { user } = req.session;
  const { value } = req.body;
  const { id } = req.params;
  const updatedCommentId = id;
  try {
    const findComment = await Comment.findByPk(updatedCommentId);
    const updatedComment = await findComment.update({
      value,
      isCheckedByAdmin: false,
    });
    const finalComment = await Comment.findAll({
      where: { id: updatedComment.id },
      include: { model: User, attributes: ['login'] },
    });
    res.json(finalComment);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const commentId = Number(id);
  console.log(typeof commentId);
  try {
    const delComment = await Comment.destroy({ where: { id: commentId } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
