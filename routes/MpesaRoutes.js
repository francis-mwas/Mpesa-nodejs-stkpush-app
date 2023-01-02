import express from 'express';
import MpesaController from '../controllers/MpesaControler.js';
import generateOAuthToken from '../middleware/GenerateToken.js';

const router = express.Router();

//endpoint to get the auth token
router.get('/get-auth-token', generateOAuthToken.generateOAuthToken);

//make actual payments[lipa na mpesa]
router.post(
  '/lipa-na-mpesa',
  generateOAuthToken.generateOAuthToken,
  MpesaController.mpesaStkPush
);

//callback url
router.post('/mpesa-callback', MpesaController.getCallbackResponse);

router.get('/test', (req, res) => {
  res.json({ hello: 'hello Nairobi' });
});

export default router;
