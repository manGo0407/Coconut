const { Router } = require('express');
const router = new Router();
const path = require('path');
router.post('/image', (req, res) => {
  try {
    const { imageName } = req.body;
    const imagePath = path.join(process.cwd(), 'public', 'images', imageName);
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
});

router.post('/avatar', (req, res) => {
  try {
    const { imageName } = req.body;
    console.log('Я имагенами',imageName)
    const imagePath = path.join(
      process.cwd(),
      'public',
      'profilePics',
      imageName
    );
    console.log(imagePath);
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
