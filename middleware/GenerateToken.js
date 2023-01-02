import axios from 'axios';

class GenerateOauthToken {
  // get mpesa authentication token
  static async generateOAuthToken(req, res, next) {
    let consumer_key = process.env.consumer_key;
    let consumer_secret = process.env.consumer_secret;

    let url = process.env.OAUTH_TOKEN_REQUEST_URL;

    console.log('The url is here: ', url);

    //form a buffer of the consumer key and secret
    let buffer = new Buffer.from(consumer_key + ':' + consumer_secret);

    console.log('This is buffer contents: ', buffer);

    let auth = `Basic ${buffer.toString('base64')}`;



    console.log("The auth token: ", auth);

    try {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });

      req.token = data['access_token'];
      console.log('The token is here: ', data);

      return next();
    } catch (err) {
      console.log('The error is here: ', err);
      return res.send({
        success: false,
        message: err['response']['statusText'],
      });
    }
  }
}

export default GenerateOauthToken;
