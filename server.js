var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
const pg = require('pg');
var app = express();
var http = require('http');

// DB connect String
var connectionString = "postgres://postgres:1114@localhost:5432/cheeseordersdb";
const client = new pg.Client(connectionString);

app.get('/', function (req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  return res.redirect('/index.html')
}).listen(8888);
console.log('Server is listening at 8888');
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/cheeseorderform', function (req, res, next) {

  var firstname = req.query.firstname;
  var lastname = req.query.lastname;
  var employeenumber = req.query.employeenumber;
  var saledate = req.query.saledate;

  var cheeseSaleDate = new Date(saledate);
  var day = cheeseSaleDate.getDate() + 1
  var month = cheeseSaleDate.getMonth() + 1;
  var year = cheeseSaleDate.getFullYear();

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  var cheeseSaleDate = month + '/' + day + '/' + year;

  var dateNow = new Date();
  //console.log("Today is: " + dateNow);
  var dd = dateNow.getDate();
  var mm = dateNow.getMonth() + 1; //January is 0
  var yyyy = dateNow.getFullYear();
  var min = dateNow.getMinutes();
  var hour = dateNow.getHours();
  var sec = dateNow.getSeconds();


  //var countedPounds = req.query.countPounds;
  //console.log(req.query);

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  //dateNow = yyyy + '-' + mm + '-' + dd;
  dateNow = mm + '/' + dd + '/' + yyyy + " " + hour + ":" + min + ":" + sec;

  var email = req.query.email;
  //console.log("Email User typed MP.: "+ email);
  var mainEmail = "mpatel@josephfarms.com";

  //console.log(mainEmail);
  console.log('here is qt for item one: ')
  console.log(req.query.countPounds1);
  // console.log("saledate is before array " + saledate);
  var array = new Array(16);
  var test;
  array[0] = {
    'variety': req.query.variety1,
    'style': req.query.style1,
    'size': req.query.size1,
    'qty': req.query.qty1,
    'pounds': req.query.countPounds1,
    'price': 0.00
  }
  array[1] = {
    'variety': req.query.variety2,
    'style': req.query.style2,
    'size': req.query.size2,
    'qty': req.query.qty2,
    'pounds': req.query.countPounds2,
    'price': 0.00
  }
  array[2] = {
    'variety': req.query.variety3,
    'style': req.query.style3,
    'size': req.query.size3,
    'qty': req.query.qty3,
    'pounds': req.query.countPounds3,
    'price': 0.00
  }
  array[3] = {
    'variety': req.query.variety4,
    'style': req.query.style4,
    'size': req.query.size4,
    'qty': req.query.qty4,
    'pounds': req.query.countPounds4,
    'price': 0.00
  }
  array[4] = {
    'variety': req.query.variety5,
    'style': req.query.style5,
    'size': req.query.size5,
    'qty': req.query.qty5,
    'pounds': req.query.countPounds5,
    'price': 0.00
  }
  array[5] = {
    'variety': req.query.variety6,
    'style': req.query.style6,
    'size': req.query.size6,
    'qty': req.query.qty6,
    'pounds': req.query.countPounds6,
    'price': 0.00
  }
  array[6] = {
    'variety': req.query.variety7,
    'style': req.query.style7,
    'size': req.query.size7,
    'qty': req.query.qty7,
    'pounds': req.query.countPounds7,
    'price': 0.00
  }
  array[7] = {
    'variety': req.query.variety8,
    'style': req.query.style8,
    'size': req.query.size8,
    'qty': req.query.qty8,
    'pounds': req.query.countPounds8,
    'price': 0.00
  }
  array[8] = {
    'variety': req.query.variety9,
    'style': req.query.style9,
    'size': req.query.size9,
    'qty': req.query.qty9,
    'pounds': req.query.countPounds9,
    'price': 0.00
  }
  array[9] = {
    'variety': req.query.variety10,
    'style': req.query.style10,
    'size': req.query.size10,
    'qty': req.query.qty10,
    'pounds': req.query.countPounds10,
    'price': 0.00
  }
  array[10] = {
    'variety': req.query.variety11,
    'style': req.query.style11,
    'size': req.query.size11,
    'qty': req.query.qty11,
    'pounds': req.query.countPounds11,
    'price': 0.00
  }
  array[11] = {
    'variety': req.query.variety12,
    'style': req.query.style12,
    'size': req.query.size12,
    'qty': req.query.qty12,
    'pounds': req.query.countPounds12,
    'price': 0.00
  }
  array[12] = {
    'variety': req.query.variety13,
    'style': req.query.style13,
    'size': req.query.size13,
    'qty': req.query.qty13,
    'pounds': req.query.countPounds13,
    'price': 0.00
  }
  array[13] = {
    'variety': req.query.variety14,
    'style': req.query.style14,
    'size': req.query.size14,
    'qty': req.query.qty14,
    'pounds': req.query.countPounds14,
    'price': 0.00
  }
  array[14] = {
    'variety': req.query.variety15,
    'style': req.query.style15,
    'size': req.query.size15,
    'qty': req.query.qty15,
    'pounds': req.query.countPounds15,
    'price': 0.00
  }
  array[15] = {
    'variety': req.query.variety16,
    'style': req.query.style16,
    'size': req.query.size16,
    'qty': req.query.qty16,
    'pounds': req.query.countPounds16,
    'price': 0.00
  }
  var comments = req.query.comments;

  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected!");
    //Checks if user exists into database.
    client.query("SELECT distinct fname FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function (err, result, fields) {
      if (err) {
        throw err;
      }
      //Insert user bc it does not exists.
      if (result.rowCount == 0) {
        console.log("Not Match!");
        client.query("INSERT INTO users(fname, lname, empnum) \
          VALUES($1, $2, $3) RETURNING fname, lname, empnum", [firstname, lastname, employeenumber], function (err, resu) {
          if (err) {
            throw err
          }
          console.log('New User row was inserted MP');

          //LOOP TO CHECK ALL THE array items.
          array.forEach(function (item, i, arr) {
            //If array is empty.
            if ((array[i].variety == '-' && array[i].style == '-' && array[i].size == 0 && array[i].qty == 0) || (array[i].variety == '' && array[i].style == '' && array[i].size == 0 && array[i].qty == 0)) {
              console.log('No values inside');
              //Else add the values into orders table.
            } else {
              console.log('There are values inside MR.: ' + array[i].variety + ' ' + array[i].style + ' ' + array[i].size + ' ' + array[i].qty);
              //search for userid into user table and insert it into orders table.
              client.query("SELECT id FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function (err, result) {
                if (err) {
                  throw err;
                }
                var num = result.rows[0];
                var getId = num.id;
                console.log("Found user data at index MR.: " + getId);
                client.query("INSERT INTO orders(userid, saledate, variety, style, size, qty, pounds, price, orderDate) \
                  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [getId, cheeseSaleDate, array[i].variety, array[i].style, array[i].size, array[i].qty, array[i].pounds, array[i].price, dateNow], function (err, resu) {
                  if (err) {
                    throw err
                  }
                  console.log('Item added: ');
                });
              });
            }
          });
        });
        //Do Not insert user bc it does exist into the database.
      } else {
        console.log("Match");
        console.log(array[0].variety + ' ' + array[0].style + ' ' + array[0].size + ' ' + array[0].qty);
        //LOOP TO CHECK ALL THE array items.
        array.forEach(function (item, i, arr) {
          //If array is empty.
          if ((array[i].variety == '-' && array[i].style == '-' && array[i].size == 0 && array[i].qty == 0) || (array[i].variety == '' && array[i].style == '' && array[i].size == 0 && array[i].qty == 0)) {
            console.log('No values inside');
            //Else add the values into orders table.
          } else {
            console.log('There are values inside MR.: ' + array[i].variety + ' ' + array[i].style + ' ' + array[i].size + ' ' + array[i].qty);
            //search for userid into user table and insert it into orders table.
            client.query("SELECT id FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function (err, result) {
              if (err) {
                throw err;
              }
              var num = result.rows[0];
              var getId = num.id;
              console.log("Found data user at index MR.: " + getId);

              client.query("INSERT INTO orders(userid, saledate, variety, style, size, qty, pounds, price, orderDate) \
                  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [getId, cheeseSaleDate, array[i].variety, array[i].style, array[i].size, array[i].qty, array[i].pounds, array[i].price, dateNow], function (err, resu) {
                if (err) {
                  throw err
                }
                console.log('Item added: ');
              });
            });
          }
        });
      }
    });
  });
  var calQty1 = req.query.qty1;
  var calQty2 = req.query.qty2;
  var calQty3 = req.query.qty3;
  var calQty4 = req.query.qty4;
  var calQty5 = req.query.qty5;
  var calQty6 = req.query.qty6;
  var calQty7 = req.query.qty7;
  var calQty8 = req.query.qty8;
  var calQty9 = req.query.qty9;
  var calQty10 = req.query.qty10;
  var calQty11 = req.query.qty11;
  var calQty12 = req.query.qty12;
  var calQty13 = req.query.qty13;
  var calQty14 = req.query.qty14;
  var calQty15 = req.query.qty15;
  var calQty16 = req.query.qty16;

  var calSize1 = req.query.size1;
  var calSize2 = req.query.size2;
  var calSize3 = req.query.size3;
  var calSize4 = req.query.size4;
  var calSize5 = req.query.size5;
  var calSize6 = req.query.size6;
  var calSize7 = req.query.size7;
  var calSize8 = req.query.size8;
  var calSize9 = req.query.size9;
  var calSize10 = req.query.size10;
  var calSize11 = req.query.size11;
  var calSize12 = req.query.size12;
  var calSize13 = req.query.size13;
  var calSize14 = req.query.size14;
  var calSize15 = req.query.size15;
  var calSize16 = req.query.size16;

  if (parseInt(calSize1) == 8) {
    calSize1 = 0.5;
  }
  if (parseInt(calSize2) == 8) {
    calSize2 = 0.5;
  }
  if (parseInt(calSize3) == 8) {
    calSize3 = 0.5;
  }
  if (parseInt(calSize4) == 8) {
    calSize4 = 0.5;
  }
  if (parseInt(calSize5) == 8) {
    calSize5 = 0.5;
  }
  if (parseInt(calSize6) == 8) {
    calSize6 = 0.5;
  }
  if (parseInt(calSize7) == 8) {
    calSize7 = 0.5;
  }
  if (parseInt(calSize8) == 8) {
    calSize8 = 0.5;
  }
  if (parseInt(calSize9) == 8) {
    calSize9 = 0.5;
  }
  if (parseInt(calSize10) == 8) {
    calSize10 = 0.5;
  }
  if (parseInt(calSize11) == 8) {
    calSize11 = 0.5;
  }
  if (parseInt(calSize12) == 8) {
    calSize12 = 0.5;
  }
  if (parseInt(calSize13) == 8) {
    calSize13 = 0.5;
  }
  if (parseInt(calSize14) == 8) {
    calSize14 = 0.5;
  }
  if (parseInt(calSize15) == 8) {
    calSize15 = 0.5;
  }
  if (parseInt(calSize16) == 8) {
    calSize16 = 0.5;
  }

  var calTotal = (parseInt(calQty1) * parseFloat(calSize1)) + (parseInt(calQty2) * parseFloat(calSize2)) + (parseInt(calQty3) * parseFloat(calSize3)) +
    (parseInt(calQty4) * parseFloat(calSize4)) + (parseInt(calQty5) * parseFloat(calSize5)) + (parseInt(calQty6) * parseFloat(calSize6)) +
    (parseInt(calQty7) * parseFloat(calSize7)) + (parseInt(calQty8) * parseFloat(calSize8)) + (parseInt(calQty9) * parseFloat(calSize9)) +
    (parseInt(calQty10) * parseFloat(calSize10)) + (parseInt(calQty11) * parseFloat(calSize11)) + (parseInt(calQty12) * parseFloat(calSize12)) +
    (parseInt(calQty13) * parseFloat(calSize13)) + (parseInt(calQty14) * parseFloat(calSize14)) + (parseInt(calQty15) * parseFloat(calSize15)) +
    (parseInt(calQty16) * parseFloat(calSize16))

  //smpt
  let transporter = nodemailer.createTransport({
    host: '10.4.1.11',
    port: 25,
    secure: false, // true for 465, false for other ports
  });
  // setup email data
  let mailOptions = {
    from: '"New Order - " <notifications@josephfarms.com>', // sender address
    to: mainEmail, // list of receivers
    subject: 'New Cheese Order Received - ' + cheeseSaleDate, // Subject line
    cc: email,
    html: '<strong>First Name: </strong>' + firstname + '<br/><strong>Last Name: </strong>' + lastname + '<br/><strong>Employee Number: </strong>' + employeenumber + '<br/><strong>Cheese Sale Date: </strong>' + cheeseSaleDate + '<br/><br/>\
    <table style="text-align: center; border:2px solid black; width:400px">\
    <tr><th style="border-bottom:2px solid black;">Number</th><th style="border-bottom:2px solid black;">Variety</th><th style="border-bottom:2px solid black;">Style</th><th style="border-bottom:2px solid black;">Size</th><th style="border-bottom:2px solid black;">Qty</th><th style="border-bottom:2px solid black;">Pounds</th><th style="border-bottom:2px solid black;"></th></tr>\
    <tr><td style="border-bottom:1px solid black;">1</td><td style="border-bottom:1px solid black;">' + array[0].variety + '</td><td style="border-bottom:1px solid black;">' + array[0].style + '</td><td style="border-bottom:1px solid black;">' + array[0].size + '</td><td style="border-bottom:1px solid black;">' + array[0].qty + '</td><td style="border-bottom:1px solid black;">' + array[0].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">2</td><td style="border-bottom:1px solid black;">' + array[1].variety + '</td><td style="border-bottom:1px solid black;">' + array[1].style + '</td><td style="border-bottom:1px solid black;">' + array[1].size + '</td><td style="border-bottom:1px solid black;">' + array[1].qty + '</td><td style="border-bottom:1px solid black;">' + array[1].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">3</td><td style="border-bottom:1px solid black;">' + array[2].variety + '</td><td style="border-bottom:1px solid black;">' + array[2].style + '</td><td style="border-bottom:1px solid black;">' + array[2].size + '</td><td style="border-bottom:1px solid black;">' + array[2].qty + '</td><td style="border-bottom:1px solid black;">' + array[2].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">4</td><td style="border-bottom:1px solid black;">' + array[3].variety + '</td><td style="border-bottom:1px solid black;">' + array[3].style + '</td><td style="border-bottom:1px solid black;">' + array[3].size + '</td><td style="border-bottom:1px solid black;">' + array[3].qty + '</td><td style="border-bottom:1px solid black;">' + array[3].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">5</td><td style="border-bottom:1px solid black;">' + array[4].variety + '</td><td style="border-bottom:1px solid black;">' + array[4].style + '</td><td style="border-bottom:1px solid black;">' + array[4].size + '</td><td style="border-bottom:1px solid black;">' + array[4].qty + '</td><td style="border-bottom:1px solid black;">' + array[4].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">6</td><td style="border-bottom:1px solid black;">' + array[5].variety + '</td><td style="border-bottom:1px solid black;">' + array[5].style + '</td><td style="border-bottom:1px solid black;">' + array[5].size + '</td><td style="border-bottom:1px solid black;">' + array[5].qty + '</td><td style="border-bottom:1px solid black;">' + array[5].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">7</td><td style="border-bottom:1px solid black;">' + array[6].variety + '</td><td style="border-bottom:1px solid black;">' + array[6].style + '</td><td style="border-bottom:1px solid black;">' + array[6].size + '</td><td style="border-bottom:1px solid black;">' + array[6].qty + '</td><td style="border-bottom:1px solid black;">' + array[6].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">8</td><td style="border-bottom:1px solid black;">' + array[7].variety + '</td><td style="border-bottom:1px solid black;">' + array[7].style + '</td><td style="border-bottom:1px solid black;">' + array[7].size + '</td><td style="border-bottom:1px solid black;">' + array[7].qty + '</td><td style="border-bottom:1px solid black;">' + array[7].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">9</td><td style="border-bottom:1px solid black;">' + array[8].variety + '</td><td style="border-bottom:1px solid black;">' + array[8].style + '</td><td style="border-bottom:1px solid black;">' + array[8].size + '</td><td style="border-bottom:1px solid black;">' + array[8].qty + '</td><td style="border-bottom:1px solid black;">' + array[8].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">10</td><td style="border-bottom:1px solid black;">' + array[9].variety + '</td><td style="border-bottom:1px solid black;">' + array[9].style + '</td><td style="border-bottom:1px solid black;">' + array[9].size + '</td><td style="border-bottom:1px solid black;">' + array[9].qty + '</td><td style="border-bottom:1px solid black;">' + array[9].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">11</td><td style="border-bottom:1px solid black;">' + array[10].variety + '</td><td style="border-bottom:1px solid black;">' + array[10].style + '</td><td style="border-bottom:1px solid black;">' + array[10].size + '</td><td style="border-bottom:1px solid black;">' + array[10].qty + '</td><td style="border-bottom:1px solid black;">' + array[10].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">12</td><td style="border-bottom:1px solid black;">' + array[11].variety + '</td><td style="border-bottom:1px solid black;">' + array[11].style + '</td><td style="border-bottom:1px solid black;">' + array[11].size + '</td><td style="border-bottom:1px solid black;">' + array[11].qty + '</td><td style="border-bottom:1px solid black;">' + array[11].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">13</td><td style="border-bottom:1px solid black;">' + array[12].variety + '</td><td style="border-bottom:1px solid black;">' + array[12].style + '</td><td style="border-bottom:1px solid black;">' + array[12].size + '</td><td style="border-bottom:1px solid black;">' + array[12].qty + '</td><td style="border-bottom:1px solid black;">' + array[12].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">14</td><td style="border-bottom:1px solid black;">' + array[13].variety + '</td><td style="border-bottom:1px solid black;">' + array[13].style + '</td><td style="border-bottom:1px solid black;">' + array[13].size + '</td><td style="border-bottom:1px solid black;">' + array[13].qty + '</td><td style="border-bottom:1px solid black;">' + array[13].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">15</td><td style="border-bottom:1px solid black;">' + array[14].variety + '</td><td style="border-bottom:1px solid black;">' + array[14].style + '</td><td style="border-bottom:1px solid black;">' + array[14].size + '</td><td style="border-bottom:1px solid black;">' + array[14].qty + '</td><td style="border-bottom:1px solid black;">' + array[14].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">16</td><td style="border-bottom:1px solid black;">' + array[15].variety + '</td><td style="border-bottom:1px solid black;">' + array[15].style + '</td><td style="border-bottom:1px solid black;">' + array[15].size + '</td><td style="border-bottom:1px solid black;">' + array[15].qty + '</td><td style="border-bottom:1px solid black;">' + array[15].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td></td><td></td><td></td><td></td><td><strong>Total Pounds:</strong></td><td><strong>' + calTotal + '</strong></td><td></td></tr>\
    </table>\
    <br><strong>Comments: </strong>' + comments + '<br/>'
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  res.redirect('confirmation.html');
  next()
}, function (req, res, next) {
  //res.redirect('/confirmation');
  res.end();
});

app.post('/payRoll', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Pulling the date from database for pay roll MR.: ");

  console.log(req.body);

  var date = req.body.date;
  console.log(date);
  //var dollarValue = req.body.dollarValue;
  //console.log(dollarValue);

  var newDate = new Date(date);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  var newDate = month + '/' + day + '/' + year;
  console.log("here is my new date: " + newDate);

  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected for pay roll!");

    client.query("select users.empnum, users.fname, users.lname, sum(orders.pounds) as totalpounds, sum(orders.price) as totalamount from users inner join orders on users.id = orders.userid where orders.saledate=$1 group by users.empnum, users.fname, users.lname;", [newDate], function (err, result, fields) {
      //select orders.userid, users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.qty, orders.orderdate from users inner join orders on users.id = orders.userid where orders.saledate=$1
      console.log(result.rows);
      if (err) {
        throw err;
      }
      // console.log(typeof result.rows.empnum);
      //result.rows.totalAmount = 3.56;
      //console.log(result.rows);

      res.send(result.rows);
      res.end;
    });

  });
});

app.post('/setPrices', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Pulling the date from database for set prices MR.: ");

  console.log(req.body);

  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected for setPrices!");

    client.query("select id, saledate, price from prices order by saledate;", function (err, result, fields) {
      console.log(result.rows);
      if (err) {
        throw err;
      }
      // console.log(typeof result.rows.empnum);
      //result.rows.totalAmount = 3.56;
      //console.log(result.rows);

      res.send(result.rows);
      res.end;
    });

  });
});

app.post('/addPrices', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Pulling the date from database for add prices MR.: ");

  console.log(req.body);

  var saledate = req.body.saledate;
  var price = req.body.price;

  var newDate = new Date(saledate);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  var newDate = month + '/' + day + '/' + year;
  saledate = newDate;
  console.log("here is my new date: " + saledate);


  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected for setPrices!");

    client.query("insert into prices (saledate, price) values ($1, $2);", [saledate, price], function (err, result, fields) {
      console.log(result.rows);
      if (err) {
        throw err;
      }
      console.log("here is sale date before query for orders table: " + saledate);
      //update the order table with the prices! CREATE A NEW FUNCTION CALLED updateOrders
      client.query("select id, pounds, saledate from orders where saledate=$1;", [saledate], function (err, resu) {
        if (err) {
          throw err;
        }
        console.log("into update query");
        console.log(resu.rows);
        var poundsList = resu.rows;
        console.log('Here is just pounds!');
        //console.log(poundsList[0].pounds);

        console.log('Right before foreach loop for orders query');
        poundsList.forEach(function (item, i) {
          var id = poundsList[i].id;
          console.log("Id: " + id);
          console.log("Pounds: " + poundsList[i].pounds);
          var totalPrice = (poundsList[i].pounds * price).toFixed(2);
          console.log("Total Price of it: " + totalPrice);

          //insert into orders table
          client.query("update orders set price=$1 where id=$2;", [totalPrice, id], function (err, res) {
            if (err) {
              throw err;
            }
            console.log("inside query to insert");
          })

        })
      });

    });
    console.log("End of the function!");
    res.end;
  });
});

app.post('/deletePrice', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Into deletePrice with this data to delete on server side: ");
  console.log(req.body);
  var removeId = req.body.id;
  var removeDateValues = req.body.saledate;

  //SQL DATABASE
  client.connect(function (err) {
    //   if (err) {
    //     throw err;
    //   }
    console.log("Database connected for deletePrice!");
    client.query("delete from prices where id=$1", [removeId], function (err, result, fields) {
      if (err) {
        throw err;
      }
      //set prices to 0.00 for those dates.
      client.query("update orders set price=0.00 where saledate=$1;", [removeDateValues], function (err, res) {
        if (err) {
          throw err;
        }
      })

    });
  });
});

app.post('/orders', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Pulling the date from database for orders MR.: ");

  console.log(req.body);

  var date = req.body.date;
  console.log(date);

  var newDate = new Date(date);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  var newDate = month + '/' + day + '/' + year;
  console.log("here is my new date: " + newDate);

  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected for orders!");

    client.query("select orders.id, orders.userid, users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.qty, orders.pounds, orders.orderdate from users inner join orders on users.id = orders.userid where orders.saledate=$1", [newDate], function (err, result, fields) {

      console.log(result.rows);
      if (err) {
        throw err;
      }
      //console.log("hello");
      res.send(result.rows);
      res.end;
    });
  });
});

app.post('/deleteOrder', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Into deleteFunc with this data to delete on server side: ");
  console.log(req.body);
  var removeId = req.body.id;

  // //SQL DATABASE
  //client.connect(function (err) {
  //   if (err) {
  //     throw err;
  //   }
  console.log("Database connected for deleteOrder!");
  client.query("delete from orders where  id=$1", [removeId], function (err, result, fields) {
    if (err) {
      throw err;
    }
  });
  //});
});

app.post('/addOrder', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Into addFunc with this data to add on server side: ");
  var addOrder = req.body;
  console.log(addOrder);

  //SQL DATABASE
  // client.connect(function(err) {
  //   if (err) {
  //     throw err;
  //   }

  //if price is set in setprice page, get price from there. IF not set price to 0.00. 
  client.query("select price, saledate from prices where saledate=$1", [addOrder.saledate], function (err, result) {
    if (err) {
      throw err;
    }
    console.log("for price query");
    console.log(result.rows);
    // console.log("Just price");
    // console.log(result.rows[0].price);

    console.log("into query to look for price!!");
    if (result.rowCount == 1) {
      console.log("inside start of if statement!");
      var addPrice = (result.rows[0].price) * addOrder.pounds;
      console.log(addPrice);
      client.query("INSERT INTO orders(userid, saledate, variety, style, size, qty, pounds, price) \
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [addOrder.userid, addOrder.saledate, addOrder.variety, addOrder.style, addOrder.size, addOrder.qty, addOrder.pounds, addPrice], function (err, result, fields) {
        if (err) {
          throw err;
        }
        console.log("inside end of if statement!");
      });
      //get ID num to insert into the view.
      client.query("select id from orders where userid=$1 and saledate=$2 and variety=$3 and style=$4 and size=$5 and qty=$6 and pounds=$7", [addOrder.userid, addOrder.saledate, addOrder.variety, addOrder.style, addOrder.size, addOrder.qty, addOrder.pounds], function (err, resu, fields) {
        if (err) {
          throw err;
        }
        console.log("from the query");
        console.log(resu.rowCount);
        //console.log(resu);
        if (resu.rowCount == 1) {
          console.log('here are rows');
          console.log(resu.rows);
          res.send(resu.rows);
        }
      });
    } else {
      client.query("INSERT INTO orders(userid, saledate, variety, style, size, qty, pounds, price) \
      VALUES($1, $2, $3, $4, $5, $6, $7, 0.00)", [addOrder.userid, addOrder.saledate, addOrder.variety, addOrder.style, addOrder.size, addOrder.qty, addOrder.pounds], function (err, result, fields) {
        if (err) {
          throw err;
        }
        console.log("inside else statement!");
      });
      //get ID num to insert into the view.
      client.query("select id from orders where userid=$1 and saledate=$2 and variety=$3 and style=$4 and size=$5 and qty=$6 and pounds=$7", [addOrder.userid, addOrder.saledate, addOrder.variety, addOrder.style, addOrder.size, addOrder.qty, addOrder.pounds], function (err, resu, fields) {
        if (err) {
          throw err;
        }
        console.log("from the query");
        console.log(resu.rowCount);
        //console.log(resu);
        if (resu.rowCount == 1) {
          console.log('here are rows');
          console.log(resu.rows);
          res.send(resu.rows);
        }
      });
    }
  });

  console.log("Database connected for addOrder!");

});

app.post('/picklist', function (req, res) {
  /* Handling the AngularJS post request*/
  console.log("Pulling the date from database for pick list MR.: ");

  var date = req.body.date;
  console.log(date);

  var newDate = new Date(date);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  var newDate = month + '/' + day + '/' + year;
  console.log("here is my new date: " + newDate);

  //SQL DATABASE
  client.connect(function (err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected for pick list!");

    client.query("select saledate, variety, style, size, sum(qty) as qty, count(*) from orders where saledate=$1 group by variety, style, size, saledate", [newDate], function (err, result, fields) {

      if (err) {
        throw err;
      }
      res.send(result.rows);
      res.end;
    });
  });
});