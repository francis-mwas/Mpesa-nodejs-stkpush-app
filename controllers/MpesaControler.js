import axios from 'axios';
import dotenv from 'dotenv';
// import timestamp from '../middleware/timestamp';
import { generateTimeStamp } from '../utils/generateTimeStamp.js';

dotenv.config();

class MpesaController {
  // send the stk push to customers
  static async mpesaStkPush(req, res) {
    let token = req.token;
    let authToken = `Bearer ${token}`;
    let timestamp = generateTimeStamp();

    let { phoneNumber, amount } = req.body;
    phoneNumber = `254${phoneNumber.substring(1)}`;

    let url = process.env.STK_PUSH_URL;
    let shortCode = process.env.MPESA_SHORTCODE;
    let passkey = process.env.LIPA_NA_MPESA_PASS_KEY;

    let password = new Buffer.from(
      `${shortCode}${passkey}${timestamp}`
    ).toString('base64');
    let transcationType = 'CustomerPayBillOnline';
    let partyA = phoneNumber; //should follow the format:2547xxxxxxxx
    let partyB = process.env.MPESA_SHORTCODE;
    // let callBackUrl =  "https://mydomain.com/path";
    let callBackUrl =
      'http://4192-102-219-208-47.ngrok.io/mpesa/mpesa-callback';
    let accountReference = 'Lipa Na Mpesa Online API';
    let transactionDescription = 'Testing drug index application';

    try {
      let { data } = await axios
        .post(
          url,
          {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: transcationType,
            Amount: amount,
            PartyA: partyA,
            PartyB: partyB,
            PhoneNumber: phoneNumber,
            CallBackURL: callBackUrl,
            AccountReference: accountReference,
            TransactionDesc: transactionDescription,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .catch(console.log);

      return res.send({
        success: true,
        message: data,
      });
    } catch (err) {
      return res.send({
        success: false,
        message: err, //['response']['statusText'],
      });
    }
  }

  static getCallbackResponse(req, res) {
    //Get the transaction description
    let responseData = req.body.Body.stkCallback['CallbackMetadata'];
    console.log('CallBack Response: ', responseData);
    return res.send({
      success: true,
      responseData,
    });
  }
}
export default MpesaController;
