'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const requestApi = require('request');
const WELCOME_INTENT = 'input.welcome';

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.createInstance = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  
  function welcomeIntent(app) {
    var options = {
      url: 'https://-----Amazon_API_Gateway_URL-----',
      method: 'GET',
      timeout: 20000
    };
    
    requestApi(options, function (error, response, body) {
      console.log('body     : ' + body);
      console.log('response : ' + response);
      console.log('error    : ' + error);
      var responseMessage;
      
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        var publicIp = result.NetworkInterfaces[0].Association.PublicIp;
        
        responseMessage = "新しいサーバを建てました。IPアドレスは、" + publicIp + " です。";
        responseMessage += "繰り返します。IPアドレスは、" + publicIp + " です。";
      } else {
        responseMessage = "サーバ作成時にエラーが発生しました。";
      }
      app.tell(responseMessage);
    });
  }
  
  const actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent);
  app.handleRequest(actionMap);
});

