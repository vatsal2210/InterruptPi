//Add your PIR sensor on Raspberry Pi 26 number as Input and buzzer on 26 number as Output.
//As PIR sensro detetcs as event mailer.js file call and sendEmail trigger.

var Gpio = require('onoff').Gpio,
buzzer = new Gpio(17, 'out'),
pir = new Gpio(26, 'in', 'both');

pir.watch(function(err, value) {
  if (err) exit();
  buzzer.writeSync(value);
  console.log('Interrupt detected');
  if(value == 1)  require('./mailer.js').sendEmail();
});

console.log('Pi Bot deployed successfully!');
 
function exit() {
  buzzer.unexport();
  pir.unexport();
  process.exit();
}
