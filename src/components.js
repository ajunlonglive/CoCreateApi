const config = require('../CoCreate.config.js');

 const CoCreateDomain = require('@cocreate/domain');
// const CoCreateEmail = require('@cocreate/email');
// const CoCreateFacebook = require('@cocreate/facebook');
const CoCreateGoogleAuth = require('@cocreate/google-auth');
const CoCreateInstagram = require('@cocreate/instagram');
const CoCreateLightHouse = require('@cocreate/lighthouse');
const CoCreateLinkedin = require('@cocreate/linkedin');
const CoCreatePlaid = require('@cocreate/plaid');
const CoCreateSendGrid = require('@cocreate/sendgrid'); 
const CoCreatePinterest = require('@cocreate/pinterest'); 
const CoCreateShipengine = require('@cocreate/shipengine');
const CoCreateStripe = require('@cocreate/stripe');
// const CoCreateTwilio = require('@cocreate/twilio');
const CoCreateTwitter = require('@cocreate/twitter');
// const CoCreateXXX = require('@cocreate/xxx');
const ApiPermission = require("./permission.js")
const CoCreateAuth = require('@cocreate/auth')

module.exports.init = function(wsManager) {
	new CoCreatePinterest(wsManager);
	new CoCreateDomain(wsManager);
	// new CoCreateEmail(wsManager);
	// new CoCreateFacebook(wsManager);
	new CoCreateGoogleAuth(wsManager);
	new CoCreateInstagram(wsManager);
	new CoCreateLightHouse(wsManager);
	new CoCreateLinkedin(wsManager)
	new CoCreatePlaid(wsManager);
	new CoCreateSendGrid(wsManager);
	new CoCreateShipengine(wsManager);
	new CoCreateStripe(wsManager);
	// new CoCreateTwilio(wsManager, config);
	new CoCreateTwitter(wsManager);
	// new CoCreateXXX(wsManager);
	const permission = new ApiPermission();
	wsManager.setPermission(permission)
	const auth = new CoCreateAuth(config.jwttoken)
	wsManager.setAuth(auth)

}