const express = require('express');
const https = require('https');

const router = express.Router();

const ENDPOINT = 'https://api.telegram.org';
const BOT_SECRET_TOKEN = process.env.BOT_SECRET_TOKEN;
const TEST_GROUP_ID = '-348484030';
const GROUP_ID = ''; // TODO: Need to update

const NOTIFY_MESSAGE = 'Не забудь внести время!';

const getStatusUrl = `${ENDPOINT}/bot${BOT_SECRET_TOKEN}/getUpdates`;
const sendTimeNotifyUrl = `${ENDPOINT}/bot${BOT_SECRET_TOKEN}/sendMessage?chat_id=${TEST_GROUP_ID}&text=${NOTIFY_MESSAGE}`;

const sendTimeNotifyMessage = async () => {
  try {
    await https.get(encodeURI(sendTimeNotifyUrl), (resp) => {
      resp.on('end', () => {
        // console.log(JSON.parse(data));
      });
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

router.get('/sendTimeNotify', async (req, res) => {
  // TODO: Send req to the bot
  await sendTimeNotifyMessage();
  res.statusCode = 200;
  return res.send('Notify message was sent successfully!');
});

module.exports = router;
