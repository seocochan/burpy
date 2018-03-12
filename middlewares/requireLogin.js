module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: '로그인부터 하세요.' });
  }

  next();
};
