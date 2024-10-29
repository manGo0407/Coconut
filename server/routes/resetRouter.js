const { Router } = require("express");
const router = new Router();
const crypto = require('crypto');
const {User} = require('../db/models');
const mailer = require('./nodemailer');



router.post('/', (req,res) => {
    const {email} = req.body;
    try {
     crypto.randomBytes(32, async (err, buffer) => {
        if(err) {
            req.flash('error', 'Что-то пошло не так повторите попытку позже')
          return res.redirect('/forgotPassword')
        }
        const token = buffer.toString('hex');
        const user = await User.findOne({where: {email: email}})
        console.log(user);
        console.log(req.body);
        if(user) {
        user.resetToken = token;
        user.resetTokenExp = Date.now() + 60 * 60 * 1000; 
        await user.save();
        const message = {
            from: 'Mailer test  <test_test_6767@mail.ru>',
            to: req.body.email,
            subject:`Сброс и восстановление данных`,
            
            html: `Вы запросили восстановление пароля, перейдите по ссылке для сброса старого и создания нового пароля: <br>
  
            <a href="http://localhost:5173/resetPassword/${token}">Сбросить пароль</a> <br>
            
            Если вы не запрашивали восстановление пароля или передумали, проигнорируйте это письмо.`
          };
          console.log(message);
          mailer(message);
        res.json(user)
         
        } else {
            req.flash('error', 'Такого email нет!');
            res.json({err: "Не удалось отправить письмо, произошла ошибка!"})
        }
     })
    } catch {
        console.log(error);
    }
})


module.exports = router;