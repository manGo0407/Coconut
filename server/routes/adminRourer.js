const { Router } = require('express');
const router = new Router();
const { User, Comment, Tour } = require('../db/models');
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      where: { checkedByAdmin: false },
      attributes: [
        'id',
        'login',
        'photoUser',
        'aboutMe',
        'role',
        'createdAt',
        'email',
        'firstName',
        'lastName',
        'age',
        'experience',
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/user/profilePic/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    user.photoUser = '';
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    user.checkedByAdmin = true;
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { isCheckedByAdmin: false },
      include: [{ model: User }, { model: Tour }],
    });
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
});
router.patch('/comment/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    comment.isCheckedByAdmin = true;
    await comment.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
