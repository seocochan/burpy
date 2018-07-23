const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  region: 'ap-northeast-2'
});

module.exports = {
  getImageUrl(req, res) {
    const { category, name } = req.query;
    const { key = `${category}/${name}/${uuid()}.jpeg` } = req.query;
    // key를 전달받으면 기존 이미지를 수정하는 경우, 아니면 새로 등록하는 경우임.
    // 값이 없는 경우 uuid로 새로운 key 값을 지정함.

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'burpy-app',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  }
};
