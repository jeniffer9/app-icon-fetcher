const { getAppStoreAppIconFromUrl, getPlayStoreAppIconFromUrl } = require('./dist/index');

getAppStoreAppIconFromUrl("https://apps.apple.com/ch/app/prepaid-twint-andere-banken/id1001116392").then(res => console.log(res));
getPlayStoreAppIconFromUrl("https://play.google.com/store/apps/details?id=ch.twint.payment&hl=de_CH&gl=US").then(res => console.log(res));