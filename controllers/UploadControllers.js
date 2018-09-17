const AWS = require('aws-sdk');
const User = require('../models/User');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  region: 'ap-northeast-2'
});

module.exports = {
  getImageUrl(req, res) {
    const { query, user } = req;

    if (Object.keys(query).length === 0) {
      return res.status(400).send({ error: '잘못된 요청입니다.' });
    }

    const { category, name } = query;
    let { key } = query;

    // 이미지가 없던 상품에 새로 등록되는 경우
    if (!key) {
      User.findByIdAndUpdate(user.id, { $inc: { points: 3 } }).exec(
        (err, doc) => {
          if (err) {
            return res.status(500).send({ error: 'DB 에러: ' + err });
          }
        }
      );

      key = `${category}/${name}/${uuid()}.jpeg`;
    }

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'burpy-app',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        if (err) {
          return res.status(500).send({ error: 'S3 에러: ' + err });
        }

        return res.send({ key, url });
      }
    );
  }
};
