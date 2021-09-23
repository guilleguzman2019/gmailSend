const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const mysql = require('mysql');
const nodemailer = require("nodemailer");
const util = require('util');

var con = mysql.createConnection({
  host: "185.201.11.128",
  user: "u270568211_pablod",
  password: "Guillermo2020.",
  database: "u270568211_juegosgamer"
});



const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    ctx.reply("Ingrese su key");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.reply("Ingrese el mail de destino?");
    ctx.wizard.state.data.key = ctx.message.text;
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.email = ctx.message.text;
    ctx.reply('Ingrese su mensaje');
    return ctx.wizard.next();
  },
  ctx => {
    
    ctx.wizard.state.data.mensaje = ctx.message.text;
    
    const query = util.promisify(con.query).bind(con);

    var rows = '' ;

    (async () => {
      try {
        rows = await query('SELECT * FROM user WHERE llave = "${ctx.wizard.state.data.key}"');
        //console.log(rows.length);
      } finally {
        conn.end();
      }
    })()
    
    if(rows.length != 0){

      const mails =['golondrinasient@gmail.com','axonzte58@gmail.com','greciatonally@gmail.com','aaronpinzon30q@gmail.com','golondrina202221@gmail.com','fuegocruzado2020@gmail.com','plugin8080@gmail.com','plugin252525@gmail.com','guilleamazon.2016@gmail.com','mexicotierrahackers2020@gmail.com','musicaalairelibre2020@gmail.com','greciatonally@gmail.com','sheinofertas525@gmail.com','amazonprime20u@gmail.com','chedraguicuestamenos@gmail.com','negociosonline17u@gmail.com','sheinhistorial@gmail.com','coppelrenueva@gmail.com'];
    
      mails.forEach(function myFunction(value) {
        
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: value,
              pass: 'Alor_1130'
              }
          });
        
        var mailOptions = {
          from: value,
          to: ctx.wizard.state.data.mail,
          subject: 'Asunto',
          text: ctx.wizard.state.data.mensaje
        };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            //res.send(500, err.message);
        } else {
            console.log("Email sent");
            ctx.reply('mensaje enviado');
            //res.status(200).jsonp(req.body);
        }
    })
      
    });
    }
    

    return ctx.scene.leave();
  }
);

const stage = new Stage([superWizard]);

const bot = new Telegraf('1969516967:AAFPXAcbSn3pZHCfcE3MD6rfyMq-sLvLgIA');
bot.use(session());
bot.use(stage.middleware());
bot.command('enviar', ctx => {
  
  ctx.scene.enter('super-wizard');
});
bot.launch();
