var localip = require('local-ip');
var iface = 'wlan0';
 
localip(iface, function(err, res) {
  if (err) {
    console.log(err + 'I have no idea what my local ip is.');
  }
  console.log('My local ip address on ' + iface + ' is ' + res);
});