// gulpfile.js should look like this:

// var gulp = require('gulp');
// // var sass = require('gulp-sass');
// var bs = require('browser-sync').create();

// gulp.task('browser-sync', function() {
//     bs.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

// gulp.task('sass', function () {
//     return gulp.src('scss/*.scss')
//                 .pipe(sass())
//                 .pipe(gulp.dest('css'))
//                 .pipe(bs.reload({stream: true}));
// });

// gulp.task('watch', ['browser-sync'], function () {
//     gulp.watch("scss/*.scss", ['sass']);
//     gulp.watch("*.ejs,*.js").on('change', bs.reload);
// });


// 'use strict';
var open = require("open");
// open("http:localhost:3000/pay");
var nums = {
    '०': 0,
    '१': 1,
    '२': 2,
    '३': 3,
    '४': 4,
    '५': 5,
    '६': 6,
    '७': 7,
    '८': 8,
    '९': 9
};

var nums1 = {
    0: '०',
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९'
};


//  function getenglish(strNum) {
//   var arrNumNe = strNum.toString().split('').map(function (ch) {
//     if (ch === '.' || ch === ',') {
//       return ch;
//     }
//     return nums[ch];
//   });
//   return arrNumNe.join('');
// };
function getnepali(strNum) {
    var arrNumNe = strNum.toString().split('').map(function(ch) {
        if (ch === '.' || ch === ',') {
            return ch;
        }
        return nums1[Number(ch)];
    });
    return arrNumNe.join('');
};

function getenglish(strNum) {
    var arrNumNe = strNum.toString().split('').map(function(ch) {
        if (ch === '.' || ch === ',') {
            return ch;
        }
        return nums[ch];
    });
    return arrNumNe.join('');
};

const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var MySQLEvents = require('mysql-events');
var deferred = require('deferred');
// var reload = require('reload');
var nepali = require('get-nepali-number');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "buddha",
//     password: "Sha677@#",
//     database: 'buddhasaba',
//     multipleStatements: true
// });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3308,
    database: 'buddhasaba',
    multipleStatements: true
});
// var newcon = {
//     host: "localhost",
//     user: "root",
//     password: "",
//     port: 3308,
//     database: 'jhimjhime'
// }
//  var con1 = mysql.createConnection({
//     host: "localhost",
//     user: "buddha",
//     password: "Sha677@#",
//     database: 'buddhasaba',
//     multipleStatements: true
// });
var path = require('path')
con.connect(function(err) {
    // if (err) throw err;
    // con1.connect();

    console.log("Connected!");
});


// mysqleventwatcher = MySQLEvents(newcon);
// console.log(mysqleventwatcher);


const app = express();
// reload(app);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
var jQuery = require('jquery');
// app.use(express.json());

app.post('/getdetailtitlebymonth',function(req,res)
{
var total=0;
console.log(req.body);
var getdetailtitle="SELECT sum(pd.amount) as totalamount,pd.subaccount from paymentdetails as pd inner join accountinformation as ai on pd.subaccount=ai.accountname inner join kagroups as kag on ai.title=kag.id where kag.katitle=? and MONTH(pd.paymentdate) = ? group by subaccount";
con.query(getdetailtitle,[req.body.titlename,req.body.count],function(err,result,fields)
{
    if(err) console.log(err);
    if(result.length>0)
    {
    for(i=0;i<result.length;i++)
    {
        total=total+result[i].totalamount;
        result[i].totalamount= getnepali(result[i].totalamount);
    }
    total=getnepali(total);
    console.log(result);
        res.json({'result':result,'total':total})

}
else
{
    res.json({'nodata':'nodata'});
}
    
    
})
})

app.get('/daybookkhoj',function(req,res)
{
    var latest = "select * from title";

    con.query(latest, function(err, result, fields) {
        accountinformation = result;
        console.log(accountinformation);
        res.render('pages/daybookkhoj', { accountinformation: accountinformation });
    })
 })
app.get('/kaathdaurastatus', function(req, res) {
    var kaathdauradata = "SELECT ka.gullino,ka.kaathname,ka.quantity,ka.unit,kt.status,ka.collectiontype from kaathaamdani as ka inner join kaathtransaction as kt  on  ka.gullino=kt.gullino; select * from kaathnamelist";
    con.query(kaathdauradata, function(err, results, fields) {
        if (err) console.log(err)
        console.log(results[0]);
    for(i=0;i<results[0].length;i++)
    {
        results[0][i].gullino=getnepali(results[0][i].gullino);
        results[0][i].quantity=getnepali(results[0][i].quantity);
    }

        res.render('pages/kaathdaurastatus', { 'results': results[0],'results1':results[1],'error': {} });
  
    })
})
app.post('/ghumtikoshadddata', function(req, res) {
    var userdata = [req.body.userid, req.body.paidamount, req.body.paymentdate];
    console.log(userdata);
    var insertdata = "INSERT INTO `ghumtikoshpayment`(`userid`,`paidamount`, `paymentdate`) VALUES (?,)"
    con.query(insertdata, [userdata], function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        // res.json({'result':result})
    })
    var updateghumtikosh = "UPDATE ghumtikosh set remainingamount=remainingamount-? where userid= ?";
    con.query(updateghumtikosh, [req.body.paidamount, req.body.userid], function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        // res.json({'result':result})
    })

})


app.get('/kaathdaura', function(req, res) {
    var accountquery = "SELECT * from kagroups; SELECT * from paymenttable;select * from accountinformation;select * from title";
    con.query(accountquery, function(err, results, fields) {
        // console.log(results[0]);
        // console.log(results[1]);
        var transactionno;
        // console.log(result.length);
        // if (err) throw err;
        // console.log(result[0].accountname);
        // console.log("Number of records inserted: " + result.affectedRows);
        // if (results[1].length === 0) {
        //     transactionno = 0;
        // } else {
        //     for (var i = 0; i < results[1].length; i++) {
        //         transactionno = Number(results[1][i]['transactionno']);
        //     }
        // }

        console.log(transactionno);
        res.render('pages/kaathdaura', { error: '', results: results[0], transactionno: transactionno, accountinformation: results[2], titles: results[3] });
    });
    // res.render('pages/kaathdaura');
})

app.post('/ledger',function(req,res)
{


// var firstdate=aarthikbarsa.split('/')
 var selectdata= "SELECT * from kagroups; SELECT sum(pd.amount) as totalamount,ai.title,kag.katitle,kag.type from paymentdetails as pd inner join accountinformation as ai on pd.subaccount=ai.accountname inner join kagroups as kag on ai.title=kag.id where pd.paymentdate between ? and ? GROUP by title";
    var totalkharcha=0;
    var totalaamdani=0;
    var status=0;
    con.query(selectdata,[req.body.ledgerinitialdate,req.body.ledgerfinaldate],function(err,result,fields)
    {
        console.log(err);
        if(result[1].length>0)
        {
        for(i=0;i<result[1].length;i++)
        {
             if(result[1].type==='k')
            {
                totalkharcha= totalkharcha+ Number(result[1][i].totalamount);
            }
            else
            {
                 totalaamdani= totalaamdani+ Number(result[1][i].totalamount);
            }

            result[1][i].totalamount= getnepali(result[1][i].totalamount);
            status=1;
        }
        totalkharcha= getnepali(totalkharcha);
        totalaamdani= getnepali(totalaamdani);
        initialdate=req.body.ledgerinitialdate.split('-')[0];
        finaldate=req.body.ledgerfinaldate.split('-')[0];

        res.render('pages/groupledger',{'initialdate':initialdate,'finaldate':finaldate,'status':status,results:result[0],results1:result[1],totalkharcha:totalkharcha,totalaamdani:totalaamdani});
    }
    else
    {
        res.render('pages/groupledger',{'initialdate':0,'finaldate':0,'status':status,results:'',results1:'',totalkharcha:'',totalaamdani:''});
    }
    })

})
app.get('/ledger',function(req,res)
{
    // var selectdata= "SELECT * from kagroups; SELECT sum(pt.dcamount) as totalamount,ai.title,kag.katitle,kag.type from paymenttable as pt inner join accountinformation as ai on pt.account=ai.accountname inner join kagroups as kag on ai.title=kag.id GROUP by title";
//  var selectdata= "SELECT * from kagroups; SELECT sum(pd.amount) as totalamount,ai.title,kag.katitle,kag.type from paymentdetails as pd inner join accountinformation as ai on pd.subaccount=ai.accountname inner join kagroups as kag on ai.title=kag.id GROUP by title";
// var totalkharcha=0;
// var totalaamdani=0;
// con.query(selectdata,function(err,result,fields)
// {
//     if(result[1].length>0)
//     {
//     for(i=0;i<result[1].length;i++)
//     {
//          if(result[1].type==='k')
//         {
//             totalkharcha= totalkharcha+ Number(result[1][i].totalamount);
//         }
//         else
//         {
//              totalaamdani= totalaamdani+ Number(result[1][i].totalamount);
//         }

//         result[1][i].totalamount= getnepali(result[1][i].totalamount);

//     }
//     totalkharcha= getnepali(totalkharcha);
//     totalaamdani= getnepali(totalaamdani);
    
//     res.render('pages/groupledger',{'status':0,results:result[0],results1:result[1],totalkharcha:totalkharcha,totalaamdani:totalaamdani});
// }
// else
// {
        res.render('pages/groupledger',{'initialdate':0,'finaldate':0,'status':0,results:'',results1:'',totalkharcha:'',totalaamdani:''});
    // }
    })
// })

app.get('/',function(req,res)
{
    return res.redirect('/pay');
})
app.get('/ghumtikoshsearch', function(req, res) {
    res.render('pages/ghumtikoshsearch');
})

app.get('/jeansisamansearch', function(req, res) {
    res.render('pages/jeansisamansearch');
})

app.post('/getdetailtitle',function(req,res){
var total=0;
// var getdetailtitle="SELECT sum(pt.dcamount) as totalamount,pt.account from paymenttable as pt inner join accountinformation as ai on pt.account=ai.accountname inner join kagroups as kag on ai.title=kag.id where kag.katitle=? group by account";
var getdetailtitle="SELECT sum(pd.amount) as totalamount,pd.subaccount from paymentdetails as pd inner join accountinformation as ai on pd.subaccount=ai.accountname inner join kagroups as kag on ai.title=kag.id where kag.katitle=? group by subaccount";
con.query(getdetailtitle,[req.body.titlename],function(err,result,fields)
{
    for(i=0;i<result.length;i++)
    {
        total=total+result[i].totalamount;
        result[i].totalamount= getnepali(result[i].totalamount);
    }
    total=getnepali(total);
    res.json({'result':result,'total':total})
})
})
app.get('/jeansisaman', function(req, res) {
    res.render('pages/jeansisaman');
})
app.post('/jeansisaman', function(req, res) {
    // var daterecord = req.body.date;
    var productnamerecord = [req.body.productnamedisplay];
    var totalquantityrecord = [req.body.quantitydisplay];
    var productstatus = [req.body.status];
    console.log(req.body);
    console.log(productnamerecord);
    console.log(productstatus);
    console.log(totalquantityrecord);

    // var datedata = [];
    var productnamedata = [];
    var totalquantitydata = [];
    var statusdata = [];

    productnamerecord.forEach(function(userid) {
        productnamedata.push(userid);
        // datedata.push(req.body.date);
    });
    productstatus.forEach(function(statuses) {
        statusdata.push(statuses);
        // datedata.push(req.body.date);
    });
    // console.log(useriddata);
    // console.log(datedata);
    totalquantityrecord.forEach(function(quantity) {
        var check = getenglish('१००');
        console.log(check);
        totalquantitydata.push(getenglish(quantity));
    });
    // console.log(datedata);
    console.log(totalquantitydata);
    console.log(productnamerecord);
    // useridrecord.forEach(function(userid)
    // {
    // useriddata.push([userid]);
    // }
    //   )
    totalquantityrecord.forEach(function(totalamount, counter) {
        var selectjeansisamandata = "SELECT * from jeansisaman where productname= ?";
        var insertjeansisamandata = "INSERT INTO `jeansisaman`(`productname`,`quantity`, `status`) VALUES (?,?,?)";
        var updatejeansisamandata = "UPDATE jeansisaman set quantity=? where productname=?"

        con.query(selectjeansisamandata, [productnamedata[counter]], function(err, result) {
            if (result.length > 0) {
                con.query(updatejeansisamandata, [totalquantitydata[counter], productnamedata[counter]], function(err, result) {
                    if (err) console.log(err);
                })
            } else {
                con.query(insertjeansisamandata, [productnamedata[counter], totalquantitydata[counter], statusdata[counter]], function(err, result) {

                    if (err) console.log(err);
                    console.log("Submiitted successfully");
                })
            }
        })




    })
    res.render('pages/jeansisaman');
})

app.post('/returnusername',function(req,res)
{
    var userid= [req.body.userid];
    var getusername= "SELECT * from upavokta where userid=?";
    con.query(getusername,[userid],function(err,results,fields)
    {
        res.json({'result':results});
    })
})

app.post('/addtitle',function(req,res)
{
var title= [req.body.titlename,req.body.type];
var inserttitle= "INSERT INTO kagroups(katitle,type) values (?)";
con.query(inserttitle,[title],function(err,result)
{
if(err) 
{
    console.log(err);
    res.json({'msg':'शीर्षक पहिलयै छ'})
}
else{
    res.json({'success':'शीर्षक राख्यो'})
    open("http:localhost:3000/pay")
}
})
})
app.post('/ghumtikoshsearchdata', function(req, res) {
    // var userid= req.body.userid;
    // console.log(userid);
    // var selectdata= "SELECT gk.totalamount,u.address,gk.remainingamount,u.fname,u.lname,gk.userid from ghumtikosh as gk  inner join upavokta as u on gk.userid=u.userid where gk.userid = ?"
    var selectdata = "SELECT gk.totalamount,u.address,gk.remainingamount,u.fname,u.lname,gk.userid from ghumtikosh as gk  inner join upavokta as u on gk.userid=u.userid  ";

    con.query(selectdata,[req.body.userid],function(err, result, fields) {
        if (err) console.log(err);
        console.log(result);
        res.json({ 'result': result })
    })
})

app.post('/jeansisamansearchdata', function(req, res) {
    // var userid= req.body.userid;
    // console.log(userid);
    // var selectdata= "SELECT gk.totalamount,u.address,gk.remainingamount,u.fname,u.lname,gk.userid from ghumtikosh as gk  inner join upavokta as u on gk.userid=u.userid where gk.userid = ?"
    var selectdata = "SELECT * from jeansisaman ";

    con.query(selectdata, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({ 'result': result })
    })
})

app.get('/ghumtikoshbill/', function(req, res) {
    res.render('pages/ghumtikoshbill');
})
app.post('/ghumtikoshsubmit/', function(req, res) {
    console.log(req.body);
    console.log("hello");
    var takendata = req.body;
    var daterecord = req.body.date;
    var useridrecord = [req.body.userid];
    var totalamountrecord = [req.body.totalamount];
    var datedata = [];
    var useriddata = [];
    var totalamountdata = [];
    var count = 0;
    console.log(daterecord);
    useridrecord.forEach(function(userid) {

        useriddata.push(userid);
        count++;
    });
    console.log(useriddata);
    console.log(datedata);
    totalamountrecord.forEach(function(totalamount) {
        totalamountdata.push(totalamount);
        datedata.push(daterecord);

    });
    console.log(datedata);
    console.log(useriddata);
    console.log(totalamountdata);
    // useridrecord.forEach(function(userid)
    // {
    // useriddata.push([userid]);
    // }
    //   )
    if (count > 1) {
        totalamountrecord[0].forEach(function(totalamount, counter) {
            var insertghumtikoshdata = "INSERT INTO `ghumtikosh`(`userid`,`totalamount`, `givendate`, `remainingamount`) VALUES (?,?,?,?)";

            con.query(insertghumtikoshdata, [useriddata[0][counter], totalamountdata[0][counter], datedata[0], totalamountdata[0][counter]], function(err, result) {
                if (err) console.log(err);
                console.log("Submiitted successfully");
            })

        })
    } else {
        var insertghumtikoshdata = "INSERT INTO `ghumtikosh`(`userid`,`totalamount`, `givendate`, `remainingamount`) VALUES (?,?,?,?)";

        con.query(insertghumtikoshdata, [useriddata, totalamountdata, datedata, totalamountdata], function(err, result) {
            if (err) console.log(err);
            console.log("Submiitted successfully");
        })


    }



    res.render('pages/ghumtikosh');
});
app.post('/edit/paymentsubmit/:id', function(req, res) {
    // var updatingdata
    // var transactionno= req.params.id;
    var submitcount = 0;
    var queries1 = ''
    if (submitcount === 0) {
        var transactionno = 36;

        console.log("New transactionno" + transactionno);
        var accountdetails1 = [];
        var selectdata = "SELECT * from paymenttable where transactionno = ?";
        con.query(selectdata, [
            [transactionno]
        ], function(err, res, fields) {
            if (err) console.log(err)
            console.log(res);
            for (i = 0; i < res.length; i++) {
                accountdetails1.push([res[i].dcamount, res[i].account])
                console.log("Accountdetails1 is " + accountdetails1);
            }

            accountdetails1.forEach(function(item) {
                queries1 += mysql.format("UPDATE accountinformation SET amount = amount - ? WHERE accountname = ?; ", item);
            });
            console.log(queries1);
            con.query(queries1);
            var deletepaymenttable = "DELETE from paymenttable where transactionno= " + transactionno;
            var deletepaymentdetails = "DELETE from paymentdetails where transactionno=" + transactionno;
            con.query(deletepaymenttable, function(err, results) {
                console.log("Deleted successfully");
            })
            con.query(deletepaymentdetails, function(err, results) {
                console.log("Deleted successfully");
            })
        })
        // var queries1=''
        // accountdetails1.forEach(function (item) {

        //   queries1 += mysql.format("UPDATE accountinformation SET amount = amount - ? WHERE accountname = ?; ", item);
        // });
        // console.log(queries);

        // console.log(queries1);
        // con.query(queries1);

        // var deletepaymenttable= "DELETE from paymenttable where transactionno= "+transactionno;
        // var deletepaymentdetails= "DELETE from paymentdetails where transactionno="+ transactionno;
        // con.query(deletepaymenttable,function(err,results)
        // {
        //   console.log("Deleted successfully");
        // })
        // con.query(deletepaymentdetails,function(err,results)
        // {
        //   console.log("Deleted successfully");
        // })
        submitcount++;
    }
    if (submitcount === 1) {
        var paymentdata = req.body.op;
        var paymentdatadetails = req.body.paymentdetails;

        console.log(paymentdata);
        // paymentdata=paymentdata[0];
        // console.log(paymentdata);
        // var transactionno= paymentdata[0][4];
        console.log(`Transaction no is ${transactionno}`);
        var i;
        var accountdetails = [];
        for (i = 0; i < paymentdata.length; i++) {
            accountdetails.push([paymentdata[i][2], paymentdata[i][1]])
        }

        console.log(accountdetails);
        //   var values = [
        //   { users: "tom", id: 101 },
        //   { users: "george", id: 102 }
        // ];
        var queries = '';

        accountdetails.forEach(function(item) {

            queries += mysql.format("UPDATE accountinformation SET amount = amount + ? WHERE accountname = ?; ", item);
        });
        console.log(queries);

        // con.query(queries,params,callback);

        con.query(queries);


        var insert1 = "INSERT INTO paymenttable(dctype,account,dcamount,vouchertype,transactionno) VALUES ? ";
        con.query(insert1, [paymentdata], function(err, result) {
            // console.log([paymentdata]);
            if (err) throw err;
            // console.log("Number of records inserted: " + result.affectedRows);
            console.log(result);
            // res.json({'transactionno':Number(transactionno)+1});
        });
        var insert2 = "INSERT INTO paymentdetails(transactionno,narration,paymentdate,vouchertype,voucherno) VALUES ? ";
        con.query(insert2, [
            [paymentdatadetails]
        ], function(err, result) {
            // console.log([paymentdata]);
            if (err) console.log(err);
            // console.log("Number of records inserted: " + result.affectedRows);
            console.log(result);
            res.json({ 'transactionno': Number(transactionno) + 1 });
        });
    }
})
app.post('/kaathdata', function(req, res) {
    var gullino = req.body.gullino;
    var accountquery = "SELECT * from kaathaamdani where gullino=?";
    con.query(accountquery, [gullino], function(err, results, fields) {
        res.json({ result: results });
    });
});


app.get('/billing', function(req, res) {
    res.render('pages/billing');
});
app.get('/ghumtikosh', function(req, res) {
    res.render('pages/ghumtikosh');
});

app.get('/upavokta', function(req, res) {

    res.render('pages/upavokta');
});

app.post('/usersubmit', function(req, res) {

    var userformdata = req.body.userformObj;
    res.render('pages/upavokta');
    var insert1 = "INSERT INTO `upavokta`(`userid`,`fname`, `lname`, `address`, `sex`) VALUES ? ";
    con.query(insert1, [userformdata], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        console.log("Submitted");
        // console.log("Number of records inserted: " + result.affectedRows);
        // res.json({'result':'Submitted'});
    });



});




app.post('/kaathentry', function(req, res) {

    console.log(req.body);

    var a = req.body;
    var i;
    var length = a['gullino'].length;
    console.log("Length is " + length);
    var data = [];
    console.log("A is " + a);
    if (length === 1) {
        data.push(a['gullino'], a['kaathname'], a['grade'], a['collectiontype'], a['unit'], a['quantity'])
    } else {
        for (i = 0; i < length; i++) {
            data.push([a['gullino'][i], a['kaathname'][i], a['grade'][i], a['collectiontype'][i], a['unit'][i], a['quantity'][i]])
        }
    }
    console.log(data)
    //   console.log("titleformdata"+titleformdata);
    var insert1 = "INSERT INTO `kaath`(`gullino`, `kaathname`, `grade`, `collectiontype`, `unit`, `quantity`) VALUES ? ";
    con.query(insert1, [data], function(err, result) {
        // console.log([paymentdata]);
        if (err)
            res.json({ 'error': err });
        console.log("Submitted");
        // console.log("Number of records inserted: " + result.affectedRows);
        // res.json({'result':'Submitted'});
    });
});




function collectiontype(value) {
    var collectionlist = { 'ढलापडा': 'dhalapada', 'पुनर्स्थापना': 'punarsthapan', 'गत वर्षकाे माैज्दात': 'previousyearmoujdat', 'उपभाेक्ता भित्र विक्री': 'upavoktabikri', 'पाेल चिरान': 'polchiran', 'जि.ब. आपूर्ति': 'jibika', 'लिलाम प्रक्रिया': 'lilamprocess' };
    return collectionlist[value];
}


var error = '';
app.post('/pay/:id', function(req, res) {
    var id = req.params.id;
    console.log("ID is " + id);
    // var titleformdata= req.body.title;
    //   console.log("titleformdata"+titleformdata);
    // var insert1 = "INSERT INTO title(titlename) VALUES (?) ";
    // con.query(insert1,titleformdata,function(err,result)
    //   {
    //     // console.log([paymentdata]);
    //   if (err) console.log(err);
    //   console.log("Submitted");
    //   // console.log("Number of records inserted: " + result.affectedRows);
    //   // res.json({'result':'Submitted'});
    //   });

    var accountquery = "SELECT * from kagroups; SELECT * from paymenttable;select * from accountinformation;select * from title";
    con.query(accountquery, function(err, results, fields) {
            // console.log(results[0]);
            // console.log(results[1]);

            // console.log(result.length);
            // if (err) throw err;
            // console.log(result[0].accountname);
            // console.log("Number of records inserted: " + result.affectedRows);
            if (results[1].length === 0) {
                transactionno = 0;
            } else {
                for (var i = 0; i < results[1].length; i++) {
                    transactionno = Number(results[1][i]['transactionno']);
                }
            }

            if(id==='3')
            {

            var quantity=getenglish(req.body.quantity);

              if(quantity>0)
            {
              var a= req.body;
              console.log(req.body.collectiontype);
              var collectiontypes= collectiontype(req.body.collectiontype);
              console.log(collectiontypes);
              var getdaura = "SELECT * from daura ;"
              var total;
              // var collectiontypes;
              var insertdaura=mysql.format(`UPDATE dauradetails set ${collectiontypes}=${collectiontypes}+${quantity},totaldaura=totaldaura+${quantity}`);
              con.query(insertdaura);

            }
              // con.query(getdaura,function(err,results)
              // {
              //   collectiontype=results[0].collectiontype;
              //   total= results[0].total;

              // })
          }
            if (id === '1') {
                console.log(req.body);

                var a = req.body;
                var i;
                var testgullino=[req.body.gullino];
                var length=testgullino.length;
                console.log("Length is " + length);
                var data = [];
                var data1 = [];
                var data2 = [];
                var data3 = [];
                var data4 = [];
                console.log("A is " + length);
                if (length === 1) {
                    data.push(getenglish(a['gullino']), a['kaathname'], a['collectiontype'], a['unit'],getenglish(a['quantity']));
                    data1.push(collectiontype(a['collectiontype']));
                    data2.push(Number(getenglish(a['quantity'])));
                    data3.push(a['kaathname']);
                    // data4.push(a['grade']);

                } else {
                    for (i = 0; i < length; i++) {
                        data.push([getenglish(a['gullino'][i]), a['kaathname'][i], a['collectiontype'][i], a['unit'][i], getenglish(a['quantity'][i])]);
                        data1.push(collectiontype(a['collectiontype'][i]));
                        data2.push(Number(getenglish(a['quantity'][i])));
                        data3.push(a['kaathname'][i]);
                        // data4.push(a['grade'][i]);

                    }
                }
                console.log("Data is " + data)
                console.log("Data1 is" + data1)
                console.log("Length1 is" + length)



                //   console.log("titleformdata"+titleformdata);
                var insert1 = "INSERT INTO `kaathaamdani`(`gullino`, `kaathname`, `collectiontype`, `unit`, `quantity`) VALUES (?)";
                con.query(insert1, [data], function(err, result) {
                    // console.log([paymentdata]);
                    if (err) {
                        // console.log(err);
                        // error=err;
                        console.log(err);

                        error = "डाटा राम्रोसँग हान्नुहोस";
                        // res.render('pages/pay',{results:results[0],transactionno:transactionno,accountinformation:results[2],titles:results[3],error:"डाटा राम्रोसँग हान्नुहोस"});
                    }
                    else

                    {

                    console.log("Submitteds");
                  }
                    // console.log("Number of records inserted: " + result.affectedRows);
                    // res.json({'result':'Submitted'});
                });
                for (i = 0; i < data1.length; i++) {
                    var update1 = `UPDATE kaathdetails set ${data1[i]}=${data1[i]}+?,totalkaath=totalkaath+?,remaining=remaining+? where kaathname=?`;
                    con.query(update1, [data2[i],data2[i],data2[i],data3[i]], function(err, result) {
                        if (err) {
                            console.log(err);
                            error = "डाटा राम्रोसँग हान्नुहोस";
                        } else {
                            console.log("Submitted");
                        }


                    });
                    var kaathstatus = [];
                    if (length === 1) {
                        kaathstatus.push([getenglish(a['gullino']), 'बिक्री भाछैन']);
                    } else {
                        for (i = 0; i < length; i++) {
                            kaathstatus.push([getenglish(a['gullino'][i]), 'बिक्री भाछैन']);
                        }
                    }
                    console.log(kaathstatus);
                    var changekaathtransaction = "INSERT into kaathtransaction(gullino,status) values ?";
                    con.query(changekaathtransaction, [kaathstatus], function(e) {
                        if (err) console.log(err)
                        console.log("Status chagn")
                    })
                }
            }


            if (id === '2') {
                console.log(req.body);

                var a = req.body;
                var i;
                data1 = [];
                data2 = [];
                data3 = [];
                data4 = [];
                // var length=a['gullino'].length;
                var length=0;
                var length1=0;
                for(i in testgullino)
                    {
                        if(testgullino[i].length>0)
                        {
                    length=length+1;
                        }
                    }
                    var length1;
                    i=0;
                    for(i in testanye)
                    {
                        if(testanye[i].length>0)
                        {
                    length1=length1+1;
                        }
                    }

var regex = /^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/g;

if(regex.test(req.body.salesdate) && (length>0 || length1>0))
{
                var testgullino= [req.body.gullino];
                var testanye=[req.body.anyename];
                // var length1= testanye.length;
                console.log("Rest"+testgullino);
                // if(testgullino)
                var i;
                    

                // var length= testgullino.length;
                console.log("Length is "+length);
                console.log("Length1 is "+length1);
                var value=a['bikritypes'];
                var data = [];
                console.log("A is " + a);
var getbanpaidawarid=`SELECT * from kagroups where katitle="वन पैदावर"`;
                var banpaidawarid;
                
                
         // alert(value);
  if(value==='उपभाेक्ता भित्र विक्री')
  {
var kaathbikridetailsrecord = [a['bikritypes'],getenglish(a['userid']),a['accountname'],getenglish(a['totalamount']), a['salesdate'],a['billno']];
var insert1 = "INSERT INTO `kaathbikridetails`(`bikritype`,`customerid`,`personname`, `total`, `salesdate`,`billno`) values ?";
con.query(getbanpaidawarid,function(err,result)
                {
                  if(err)  console.log(err);

                  banpaidawarid= result[0].id;
                      console.log("banpaidawarid is"+banpaidawarid);
                })
}
  else if(value === 'पाेल चिरान' || value === 'जि.ब. आपूर्ति' || value === 'लिलाम प्रक्रिया' )
  {
    con.query(getbanpaidawarid,function(err,result)
                {
                  if(err)  console.log(err);

                  banpaidawarid= result[0].id;
                      console.log("banpaidawarid is"+banpaidawarid);
                })
var kaathbikridetailsrecord = [a['bikritypes'],a['accountname'],getenglish(a['totalamount']), a['salesdate'],a['billno']];
var insert1 = "INSERT INTO `kaathbikridetails`(`bikritype`,`personname`, `total`, `salesdate`,`billno`) values ?";
}
  
// var kaathbikridetailsrecord = [a['bikritypes'],getenglish(a['userid']),a['accountname'],getenglish(a['totalamount']), a['salesdate'],a['billno']];
                // if (length===1) {
                //     if (a['gullino'] !== '') {
                //         data.push([getenglish(a['gullino']), a['kaathname'], getenglish(a['quantity']),getenglish(a['per']),getenglish(a['amount'])]);
                //         data1.push(collectiontype(a['bikritypes']));
                //         data2.push(Number(getenglish(a['quantity'])));
                //         data3.push(a['kaathname']);
                //         // data4.push(a['kaathgrade']);
                //     }
                // } else {
                //     loop1: for (i = 0; i < a.totallist; i++) {
                //         if (a['gullino'][i] === '') {
                //             break loop1;
                //         }
                //         data.push([getenglish(a['gullino'][i]), a['kaathname'][i],getenglish(a['quantity'][i]),getenglish(a['per'][i]),getenglish(a['amount'][i])]);
                //         data1.push(collectiontype(a['bikritypes']));
                //         data2.push(Number(getenglish(a['quantity'][i])));
                //         data3.push(a['kaathname'][i]);
                //         // data4.push(a['kaathgrade'][i]);
                //     }
                // }
                // console.log("Data is " + data)
                // console.log("Data1 is" + data1)

                var ghaasbikri="INSERT INTO `ghaasbikri`(`ghaas`, `quantity`, `per`, `amount`, `bikriid`) VALUES ?";
                var daurabikri="INSERT INTO `daurabikri`(`daura`, `quantity`, `per`, `amount`, `bikriid`) VALUES ?";
                var anyebikri="INSERT INTO anyebikri(name,quantity,per,amount,bikriid) values ?";
                var dataghaas=[];
                var datadaura=[];
                
            
                var dataanye=[];
                var paymentdetailskaath=[];

                var checklist=[];
                var paymentfromkaath="INSERT INTO `paymentdetails`( `type`, `subaccount`, `amount`,`paymentdate`) VALUES (?)";
                // var paymentdaura=[];
                // var paymentghaas=[];
                // var paymentanye=[];
                if(length1===1)
                {
                dataanye.push(a['anyename'],getenglish(a['anyequantity']),getenglish(a['anyeper']),getenglish(a['anyetotal']),a['billno']);
                paymentdetailskaath.push(['आम्दानी',a['anyename']+' '+'बिक्री',getenglish(a['anyetotal']),a['salesdate']])
                      console.log("banpaidawarid from anye is"+banpaidawarid);

                checklist.push([a['anyename']+' '+'बिक्री',banpaidawarid]);
                console.log("paymentdetailskaath from anye is"+paymentdetailskaath);

                }
                else if(length1>1)
                {
                for(i=0;i<length1;i++)
                {
                    if(Number(getenglish(a['anyetotal'][i]))>0)
                    {
                    dataanye.push(a['anyename'][i],getenglish(a['anyequantity'][i]),getenglish(a['anyeper'][i]),getenglish(a['anyetotal'][i]),a['billno']);
                    paymentdetailskaath.push(['आम्दानी',a['anyename'][i]+' '+'बिक्री',getenglish(a['anyetotal'][i]),a['salesdate']])
                checklist.push([a['anyename'][i]+' '+'बिक्री',banpaidawarid]);
                console.log("banpaidawarid from anye is"+banpaidawarid);
                console.log("paymentdetailskaath from anye is"+paymentdetailskaath);


                }
                }
            }

                console.log("Dataanye is"+dataanye )
                //   console.log("titleformdata"+titleformdata);
                var lastid;
                var selectlastid= "select * from kaathbikridetails ORDER by id desc";
                var insertintokaathbikri= "INSERT INTO `kaathbikri`(`gullino`, `kaathname`, `unit`, `quantity`, `price`,`bikriid`) VALUES ?";
// var insert1 = "INSERT INTO `kaathbikridetails`(`bikritype`,`customerid`,`personname`, `total`, `salesdate`,`billno`) values ?";
                con.query(insert1, [[kaathbikridetailsrecord]], function(err, result) {
                    // console.log([paymentdata]);
                    if (err) console.log(err);
                    // {
                    //    // console.log(err);
                    //    // error=err;
                    //    console.log(error);

                    //    error="डाटा राम्रोसँग हान्नुहोस";
                    //    // res.render('pages/pay',{results:results[0],transactionno:transactionno,accountinformation:results[2],titles:results[3],error:"डाटा राम्रोसँग हान्नुहोस"});
                    // }

                    console.log("Submitted");
                    console.log("jeed");
                     con.query(selectlastid,function(err,result1,fields)
                   {   
                    if(err) {console.log(err)};
                    console.log("HEllo"+result1);
                    lastid=result1[0].id;
                    console.log("Lastid is "+ lastid);
                    if (length===1) {
                    if (a['gullino'] !== '') {
                        data.push([getenglish(a['gullino']), a['kaathname'], getenglish(a['quantity']),getenglish(a['per']),getenglish(a['amount']),a['billno']]);
                checklist.push([a['kaathname']+' '+'बिक्री',banpaidawarid]);

                        
                        paymentdetailskaath.push(['आम्दानी',a['kaathname']+' '+'बिक्री',getenglish(a['amount']),a['salesdate']]);
                        data1.push(collectiontype(a['bikritypes']));
                        data2.push(Number(getenglish(a['quantity'])));
                        data3.push(a['kaathname']);
                console.log("paymentdetailskaath from gullino is"+paymentdetailskaath);

                        // data4.push(a['kaathgrade']);
                    }
                } else if(length>1) {
                    loop1: for (i = 0; i < a.totallist; i++) {
                        if (a['gullino'][i] === '') {
                            break loop1;
                        }
                        // data.push([getenglish(a['gullino'][i]), a['kaathname'][i],getenglish(a['quantity'][i]),getenglish(a['per'][i]),getenglish(a['amount'][i]),lastid]);
                        data.push([getenglish(a['gullino'][i]), a['kaathname'][i],getenglish(a['quantity'][i]),getenglish(a['per'][i]),getenglish(a['amount'][i]),a['billno']]);
                        paymentdetailskaath.push(['आम्दानी',a['kaathname'][i]+' '+'बिक्री',getenglish(a['amount'][i]),a['salesdate']]);
                checklist.push([a['kaathname'][i]+' '+'बिक्री',banpaidawarid]);

                        data1.push(collectiontype(a['bikritypes']));
                        data2.push(Number(getenglish(a['quantity'][i])));
                        data3.push(a['kaathname'][i]);
                console.log("paymentdetailskaath from gullino is"+paymentdetailskaath);

                        // data4.push(a['kaathgrade'][i]);
                    }
                }
                var ghaastotal=getenglish(a['ghaastotal']);
                var dauratotal=getenglish(a['daauratotal']);

                console.log("ghaastotal IS "+ghaastotal);
                console.log("dauratotal IS "+dauratotal);

                 if(Number(getenglish(a['anyetotal'][0]))>0)
                 {
                      console.log("Anye total");
                console.log("paymentdetailskaath from anyetotal is"+paymentdetailskaath);

                     con.query(anyebikri,[[dataanye]],function(err,result3)
                    {
                        if(err) console.log(err);

                    })
                 }
                 if(Number(ghaastotal)>0)
                {
                    console.log("Ghaas total");
                    dataghaas.push(['घाँस',getenglish(a['ghaasquantity']),getenglish(a['ghaasper']),getenglish(a['ghaastotal']),a['billno']]);
                    paymentdetailskaath.push(['आम्दानी','घाँस बिक्री',getenglish(a['amount']),a['salesdate']]);
                checklist.push(['घाँस बिक्री',banpaidawarid]);
                console.log("paymentdetailskaath from anyetotal is"+paymentdetailskaath);

                     con.query(ghaasbikri,[dataghaas],function(err,result3)
                    {
                        if(err) console.log(err);

                    })
                }
                if(Number(dauratotal)>0)
                {
                    console.log("Daura total");
                    datadaura.push(['दाउरा',getenglish(a['daauraquantity']),getenglish(a['daauraper']),getenglish(a['daauratotal']),a['billno']])
                    paymentdetailskaath.push(['आम्दानी','दाउरा बिक्री',getenglish(a['amount']),a['salesdate']]);
                checklist.push(['दाउरा बिक्री',banpaidawarid]);

                    con.query(daurabikri,[datadaura],function(err,result3)
                    {
                        if(err) console.log(err);

                    })
                }
               if(length>0 || length1>0)
               {
                console.log("checklist is " +checklist)
                console.log("checklist length  is " +checklist.length)

                for(i=0;i<checklist.length;i++)
                {
                    var checkitemlist= "SELECT * from accountinformation where accountname=?";
                 
                    console.log("CHEcklist "+checklist);
                    console.log("CHEcklist name "+checklist[i][0]);

                    con.query(checkitemlist,[checklist[i][0]],function(err,result5,fields)
                    {
                        console.log("Result5 is "+ result5.length);
                        if(err) console.log("EX1 is "+ err);
                        // if(err)
                        // {
                            if(result5.length===0)
                            {
                            con.query("INSERT INTO accountinformation(accountname,title) values (?)",[checklist[0]],function(err,result6)
                            {
                                console.log("Result6 is "+result6)
                                if(err) console.log("EX is"+ err);

                            });
                        }
                        // }
                        
                    })

                  }
                  console.log("Payment details kaath is "+ paymentdetailskaath);
                   con.query(paymentfromkaath,paymentdetailskaath,function(err,results)
                    {
                      if(err)  console.log(err);
                        console.log("Successfully inserted ");
                    })
                 con.query(insertintokaathbikri,[data],function(err,result2)
              
                {
                    if(err) console.log(err);

                   
                });
                }
                })
                // console.log(data1);
                // console.log(data2);
                // console.log(data3);
                // console.log(data4);
                // data.push(1);

                 

                 
               

                    console.log("Number of records inserted: " + result.affectedRows);
                    // res.json({'result':'Submitted'});
                });

                 console.log(data1);
                console.log(data2);
                console.log(data3);
                console.log("Data is " + data)
                // var lastid;
                // var selectlastid= "select * from kaathbikridetails ORDER by id desc limit 1";
                // con.query(selectlastid,function(err,result,fields)
                // {
                //     lastid=result.id;
                // })
                // console.log(data1);
                // console.log(data2);
                // console.log("Lastid is "+ lastid);
                // console.log(data3);
                // // console.log(data4);
                // // data.push(1);

                //  if (length===1) {
                //     if (a['gullino'] !== '') {
                //         data.push([getenglish(a['gullino']), a['kaathname'], getenglish(a['quantity']),getenglish(a['per']),getenglish(a['amount']),lastid]);
                //         data1.push(collectiontype(a['bikritypes']));
                //         data2.push(Number(getenglish(a['quantity'])));
                //         data3.push(a['kaathname']);
                //         // data4.push(a['kaathgrade']);
                //     }
                // } else {
                //     loop1: for (i = 0; i < a.totallist; i++) {
                //         if (a['gullino'][i] === '') {
                //             break loop1;
                //         }
                //         data.push([getenglish(a['gullino'][i]), a['kaathname'][i],getenglish(a['quantity'][i]),getenglish(a['per'][i]),getenglish(a['amount'][i]),lastid]);
                //         data1.push(collectiontype(a['bikritypes']));
                //         data2.push(Number(getenglish(a['quantity'][i])));
                //         data3.push(a['kaathname'][i]);
                //         // data4.push(a['kaathgrade'][i]);
                //     }
                // }
                // console.log("Data is " + data)
                //  var insertintokaathbikri= "INSERT INTO `kaathbikri`(`gullino`, `kaathname`, `unit`, `quantity`, `price`,`bikriid`) VALUES ?";
                // con.query(insertintokaathbikri,[data],function(err,result)
                // {
                //     if(err) console.log(err);
                // });

                for (i = 0; i < data1.length; i++) {
                    var update1 = `UPDATE kaathdetails set ${data1[i]}=${data1[i]}+?,totalbikri=totalbikri+?,remaining=totalkaath-totalbikri where kaathname=? `;
                    con.query(update1, [data2[i],data2[i],data3[i]], function(err, result) {
                        if (err) throw err;
                        // {
                        //   console.log(err);
                        //   error="डाटा राम्रोसँग हान्नुहोस";
                        // }
                        // else
                        // {
                        //   console.log("Submitted");
                        // }


                    });
                    var gullino = [];
                    var kaathstatus = [];
                    if (data1.length === 1) {
                        gullino.push([a['gullino']]);
                        kaathstatus.push(['बिक्री भयो']);
                    } else {
                        for (i = 0; i < data1.length; i++) {
                            gullino.push([a['gullino'][i]]);

                            kaathstatus.push(['बिक्री भयो']);
                        }
                    }
                    // var changekaathtransaction = "INSERT into kaathtransaction(gullino,status) values ?";
                    kaathstatus.forEach(function(result, counter) {
                        var changekaathtransaction = "UPDATE kaathtransaction set status=? where gullino= ?";

                        con.query(changekaathtransaction, [kaathstatus[i], gullino[i]], function(e) {
                            if (err) console.log(err)
                            console.log("Status chagn")
                        })
                    })
                }
              

              }
            
        

}
        console.log(transactionno);
        return res.redirect('/kaathdaura'); 

        // res.render('pages/kaathdaura', { results: results[0], transactionno: transactionno, accountinformation: results[2], titles: results[3], error: error });
    });


});


app.post('/banpaidawar',function(req,res)
{

console.log(req.body);

var getdetailkaath="SELECT sum(kb.price) as price,kb.kaathname,kbd.salesdate FROM `kaathbikri` as kb inner join kaathbikridetails as kbd on kb.bikriid=kbd.billno where kbd.salesdate between ? and ? group by kaathname,salesdate;SELECT sum(db.amount) as price,db.daura,kbd.salesdate FROM `daurabikri` as db inner join kaathbikridetails as kbd on db.bikriid=kbd.billno where kbd.salesdate between ? and ? group by db.daura,kbd.salesdate;SELECT sum(gb.amount) as price,gb.ghaas,kbd.salesdate FROM `ghaasbikri` as gb inner join kaathbikridetails as kbd on gb.bikriid=kbd.billno where kbd.salesdate between ? and ? group by gb.ghaas,kbd.salesdate;SELECT sum(ab.amount) as price,ab.name,kbd.salesdate FROM `anyebikri` as ab inner join kaathbikridetails as kbd on ab.bikriid=kbd.billno where kbd.salesdate between ? and ? group by ab.name,kbd.salesdate";
var status=0;
con.query(getdetailkaath,[req.body.banpaidawarinitialdate,req.body.banpaidawarfinaldate,req.body.banpaidawarinitialdate,req.body.banpaidawarfinaldate,req.body.banpaidawarinitialdate,req.body.banpaidawarfinaldate,req.body.banpaidawarinitialdate,req.body.banpaidawarfinaldate],function(err,result)
{
    if(err) console.log(err);
    console.log("Result is"+ result);
    console.log(result[0]);
    console.log(result[1]);
    for(i=0;i<4;i++)
    {
    for(j=0;j<result[i].length;j++)
    {
        result[i][j].price=getnepali(result[i][j].price);
        status=1;
    }
}
    console.log(result[2]);

    res.render('pages/banpaidawar',{'status':status,'result0':result[0],'result1':result[1],'result2':result[2],'result3':result[3],'initialdate':req.body.banpaidawarinitialdate,'finaldate':req.body.banpaidawarfinaldate})
})
})

app.get('/banpaidawar',function(req,res)
{


// var kaathdaurarecord="SELECT * from kaathbikri;select * from ghaasbikri;select * from daurabikri;SELECT * from kaathnamelist";
// con.query(kaathdaurarecord,function(err,result)
// {
//     if(err) console.log(err);
//     res.render('pages/banpaidawar',{'kaath':result[0],'ghaas':result[1],'daura':result[2],'kaathname':result[3]})
// })
res.render('pages/banpaidawar',{'result0':[],'status':0,'result1':[],'result2':[]});
})

app.post('/upavoktakhoj', function(req, res) {

    var upavoktakhojformdata = [req.body.upavoktakhojformObj];
    console.log(upavoktakhojformdata);
    console.log(upavoktakhojformdata[0]['upavoktakhojaddress'])
    if (upavoktakhojformdata[0]['upavoktakhojaddress'] === '0' && upavoktakhojformdata[0]['upavoktakhojsex'] === '2') {
        var select1 = "SELECT * from upavokta";
        con.query(select1, function(err, result, fields) {
            console.log(result);
            res.json({ 'result': result })
        })
    } else {

        // var testdata2=[[upavoktakhojformdata[0]['upavoktakhojaddress']]]
        // var testdata3=[[upavoktakhojformdata[0]['upavoktakhojsex']]]


        // ,upavoktakhojformdata[0]['upavoktakhojname'],upavoktakhojformdata[0]['upavoktakhojsex']]]
        // console.log(testdata1);
        if (upavoktakhojformdata[0]['upavoktakhojaddress'] !== '0' && upavoktakhojformdata[0]['upavoktakhojsex'] !== '2') {
            var select2 = " SELECT * from upavokta where address= ? and sex= ?";
            var testdata1 = [upavoktakhojformdata[0]['upavoktakhojaddress'], upavoktakhojformdata[0]['upavoktakhojsex']]
        } else if (upavoktakhojformdata[0]['upavoktakhojaddress'] === '0' && upavoktakhojformdata[0]['upavoktakhojsex'] !== '2') {
            var select2 = " SELECT * from upavokta where sex= ?";
            var testdata1 = [upavoktakhojformdata[0]['upavoktakhojsex']];
        } else {
            var select2 = " SELECT * from upavokta where address= ?";
            var testdata1 = [upavoktakhojformdata[0]['upavoktakhojaddress']]
        }
        con.query(select2, testdata1, function(err, result, fields) {
            console.log(result);
            res.json({ 'result': result })
        })
    }
})

app.post('/upavoktadel', function(req, res) {
    var userid = [req.body.ids];
    console.log(`ID is ${userid}`);
    var deletequery = "DELETE from upavokta where userid = ?";
    con.query(deletequery, [
        [userid]
    ], function(err, result) {
        if (err) throw err;
        console.log("Deleted successfully");
        res.json({ 'result': 'successfully' })
    })
})

app.post('/modifyusersubmit', function(req, res) {
    var data1 = req.body.data1;
    console.log(data1);
    var deletequery = "UPDATE upavokta SET fname=?,lname=?,address=?,sex=? where userid = ?";
    con.query(deletequery, data1, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Deleted successfully");
        res.json({ 'result': 'successfully' })
    })
})



app.post('/padhadhikaarisubmit', function(req, res) {

    var padhadhikaariformdata = req.body.padhadhikaariformObj;
    // res.render('pages/upavokta');
    var insert1 = "INSERT INTO `padhadhikari`(`upavoktaname`, `post`, `samiti`, `startdate`, `samitino`) VALUES ? ";
    con.query(insert1, [padhadhikaariformdata], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        console.log("Submitted");
        // console.log("Number of records inserted: " + result.affectedRows);
        // res.json({'result':'Submitted'});
    });



});

app.post('/padhadhikaarikhoj', function(req, res) {

    var samitino = req.body.samitino;
    var samitinonext = getnepali(Number(getenglish(req.body.samitino)) + 1);
    var enddate = '-------';

    console.log(samitino);
    var select1 = "SELECT id,upavoktaname,post,samiti,samitino,DATE_FORMAT(startdate,'%Y-%m-%d') as startdate from padhadhikari where samitino=?";
    var select2 = "SELECT id,upavoktaname,post,samiti,samitino,DATE_FORMAT(startdate,'%Y-%m-%d') as startdate from padhadhikari where samitino=?";
    con.query(select1, [samitino], function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        con.query(select2, [samitinonext], function(err, results) {
            console.log(results);

            if (results.length > 0) {
                enddate = results[0].startdate;
                console.log("Enddate is " + enddate)

                res.json({ 'result': result, 'enddate': enddate });

            } else {
                res.json({ 'result': result, 'enddate': enddate });

            }
        })

    })
})


app.post('/padhadhikaaridel', function(req, res) {
    var userid = [req.body.ids];
    console.log(`ID is ${userid}`);
    var deletequery = "DELETE from padhadhikari where id = ?";
    con.query(deletequery, userid, function(err, result) {
        if (err) throw err;
        console.log("Deleted successfully");
        res.json({ 'result': 'successfully' })
    })
})

app.post('/modifypadhadhikaarisubmit', function(req, res) {
    var data1 = req.body.data1;
    console.log(data1);
    var deletequery = "UPDATE padhadhikari SET upavoktaname=?,post=?,samiti=?,startdate=? where id = ?";
    con.query(deletequery, data1, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Deleted successfully");
        res.json({ 'result': 'successfully' })
    })
})
// res.render('pages/upavokta');
// var insert1 = "INSERT INTO `upavokta`(`fname`, `lname`, `address`, `sex`) VALUES ? ";
// con.query(insert1,[userformdata],function(err,result)
//   {
//     // console.log([paymentdata]);
//   if (err) throw err;
//   console.log("Submitted");
//   // console.log("Number of records inserted: " + result.affectedRows);
//   // res.json({'result':'Submitted'});
//   });



app.get('/pay', function(req, res) {
    var accountquery = "SELECT * from kagroups; select * from accountinformation as ai inner join kagroups as kg on ai.title=kg.id ;select * from title";
    con.query(accountquery, function(err, results, fields) {
        // console.log(results[0]);
        // console.log(results[1]);

        // console.log(result.length);
        // if (err) throw err;
        // console.log(result[0].accountname);
        // console.log("Number of records inserted: " + result.affectedRows);
        // if (results[1].length === 0) {
        //     transactionno = 0;
        // } else {
        //     for (var i = 0; i < results[1].length; i++) {
        //         transactionno = Number(results[1][i]['transactionno']);
        //     }
        // }
        transactionno=1;

        console.log(transactionno);
        res.render('pages/pay', { error: '', results: results[0],accountinformation:results[1], transactionno: transactionno});
    });
    // res.render('pages/payment',);
});

// about page 
app.get('/payment', function(req, res) {
    var accountquery = "SELECT * from groups; SELECT * from paymenttable";
    con.query(accountquery, function(err, results, fields) {
        // console.log(results[0]);
        // console.log(results[1]);

        // console.log(result.length);
        // if (err) throw err;
        // console.log(result[0].accountname);
        // console.log("Number of records inserted: " + result.affectedRows);
        if (results[1].length === 0) {
            transactionno = 0;
        } else {
            for (var i = 0; i < results[1].length; i++) {
                transactionno = Number(results[1][i]['transactionno']);
            }
        }

        console.log(transactionno);
        res.render('pages/payment', { results: results[0], error: '', transactionno: transactionno });
    });
    // res.render('pages/payment',);
});

app.get('/reserve', function(req, res) {
    res.render('pages/reserve');
});
app.post('/accountsubmit', (req, res) => {
    console.log(req.body.accountdataarray);
    var accountdata = [req.body.accountdataarray];
    // paymentdata=paymentdata[0];
    // console.log(paymentdata);
 
        console.log("Hello");
        var accountquery = "INSERT INTO accountinformation(accountname,title) VALUES ? ";
        con.query(accountquery, [accountdata], function(err, result) {
            if (err) console.log(err);

            // console.log("Number of records inserted: " + result.affectedRows);
            res.json({ 'result': 'Submitted' });
            // return res.redirect('/pay');
        });
    
})
// app.get('/billings',(req,res)=>

// {
// res.sendFile(__dirname + '/public/billing.html');
// });
// app.get('/reserve',(req,res)=>

// {
// res.sendFile(__dirname + '/public/reserve1.html');
// });
app.post('/accountreturn', (req, res) => {
    console.log(req.body.a);
    var accountquery = "SELECT accountname from accountinformation where accountname like ? ";
    con.query(accountquery, '%' + req.body.a + '%', function(err, result, fields) {
        // console.log(result.length);
        // if (err) throw err;
        // console.log(result[0].accountname);
        // console.log("Number of records inserted: " + result.affectedRows);
        res.json({ result });
    });
})
// DATE_FORMAT(paymentdate,'%Y-%m-%d') as
var accountinformation;
var newdata;

app.get('/edit/:title/:id', (req, res) => {
    var transactionno = req.params.id;
    var title = req.params.title;
    var totalcredit = 0;
    var totaldebit = 0;
    console.log(title);
    console.log(transactionno);
    if (title === 'pay' || title === 'receipt' || title === 'journal') {
        var latest = "select * from accountinformation";
        con.query(latest, function(err, result, fields) {

            accountinformation = result;
        })
        var detaildata = "SELECT pd.transactionno,pd.narration,DATE_FORMAT(pd.paymentdate,'%Y-%m-%d') as paymentdate,pd.vouchertype,pd.voucherno,pd.chequeno,pt.dctype,pt.account,pt.dcamount from paymentdetails as pd inner join paymenttable as pt on pd.transactionno=pt.transactionno where pd.transactionno =? ";

        con.query(detaildata, [transactionno], function(err, result, fields) {
            for (i = 0; i < result.length; i++) {
                if (result[i].dctype === 'के') {

                    totalcredit = totalcredit + Number(result[i].dcamount);
                } else {
                    totaldebit = totaldebit + Number(result[i].dcamount);
                }

                result[i].dcamount = getnepali(result[i].dcamount)
            }
            totalcredit = getnepali(totalcredit);
            console.log(totalcredit);
            totaldebit = getnepali(totaldebit);
            console.log(totalcredit);


            res.render('pages/prj', { result: result, accountinformation: accountinformation, totalcredit: totalcredit, totaldebit: totaldebit })
        })
    }

})

app.get('/daybookreturn', (req, res) => {
    var latest = "select * from title";

    con.query(latest, function(err, result, fields) {
        accountinformation = result;
        console.log(accountinformation);
        res.render('pages/daybooknew', { accountinformation: accountinformation });
    })


})

app.post('/daybookkhoj',(req,res) =>
{
    var date1 = req.body.initialdate;
    var date2 = req.body.finaldate;
    console.log(date1);
    var accountquery = "SELECT DATE_FORMAT(paymentdate,'%Y-%m-%d') as paymentdate,subaccount,type,amount,narration from paymentdetails where paymentdate between ? and ?";
    // var innerquery= "SELECT * from paymenttable where transactionno=?";
    // var daybookdict={};
    // var count=0;
    con.query(accountquery,[date1,date2],function(err,result)
    {   
        console.log(result);
        for(i=0;i<result.length;i++)
        {
            result[i].amount=getnepali(result[i].amount);
        
        }
        res.json({'results':result});
    })
    
})
app.post('/daybookreturn', (req, res) => {

    var date1 = req.body.initialdate;
    var date2 = req.body.finaldate;
    console.log(date1);
    var latest = "select * from title";
    var total = 0;

    var query1 = `SELECT pd.transactionno,pd.narration,DATE_FORMAT(pd.paymentdate,'%Y-%m-%d') as paymentdate,pt.dcamount,pd.vouchertype,pd.voucherno,pd.chequeno from paymentdetails as pd inner join paymenttable pt on pd.transactionno = pt.transactionno where pd.paymentdate between ? and ?`;
    con.query(latest, function(err, result, fields) {

        accountinformation = result;
    })

    con.query(query1, [date1, date2], function(err, results, fields) {
        console.log(err);
        if (results.length > 0) {
            for (i = 0; i < results.length; i++) {
                total = total + Number(results[i].dcamount);
                console.log(total);
                results[i].dcamount = getnepali(results[i].dcamount)
            }
        }
        newdata = results;
        total = getnepali(total);
        console.log("Title is " + newdata);
        res.json({ newdata: newdata, accountinformation: accountinformation });

    });



    // console.log(req.body.a);
    // res.writeHead(200,{'Content-Type':'text/html'})
    // var accountquery = "SELECT * from paymenttable where paymentdate between ? and ? ";


    // var accountquery = "SELECT dctype,account,dcamount,DATE_FORMAT(paymentdate,'%Y-%m-%d') as paymentdate,transactionno,narration from paymenttable";
    // var accountquery1 = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";
    //   var totalcredit=0,totaldebit=0;


    //   var accountquery1 = "SELECT DATE_FORMAT(paymentdate,'%Y-%m-%d') as  paymentdate,narration,transactionno,id from paymentdetails";
    //   // var accountquery1 = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";

    //       // res.write('<table><tr><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th>Narration</th></tr>');

    // // var daybooktable='';
    // // var a ;
    // var i;
    // var count=0;
    // var tabledata='';
    //   con.query(accountquery1,function(err,results,fields)
    //     {
    //   // res.writeHead(200,{'Content-Type':'text/html'})
    //   // res.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>');
    //   var newdata='';
    //   newdata+='<table BORDERCOLOR=BLACK border=1  class="table "><tr ><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th colspan="2">Narration</th></tr>';
    //   console.log("newdata is " + newdata);
    //   var olddata=newdata;
    //   // res.write('<table border="1" cellspacing="0" cellpadding="5"><tr><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th colspan="2">Narration</th></tr>');
    //     // console.log(results.length);
    //     // console.log(results);

    //     console.log(results);
    //     // a= results[0].narration;
    //     // console.log("A is " + a);
    //     var b;
    //     b=results;
    //     // console.log("B is"+b[0].paymentdate);
    //     // console.log()

    //   for(i=0;i<results.length;i++)
    //   {
    // console.log("I is "+i);


    // // count=i;

    // var accountsubquery= 'SELECT * from paymenttable where transactionno = ?';

    // con.query(accountsubquery,[results[i].transactionno],function(err,result,fields)
    // {

    //   // var a= 
    //   // console.log("A is " + a);
    // paymentmonth=b[count].paymentdate.split('-')[1];
    // console.log("Paymentdate is "+ b[count].paymentdate);

    //  // if(err) console.log(err);
    //   // console.log(`Result is ${result}`);
    // // console.log("Count is "+count);
    //   if(result[0].dctype === 'के')
    //   {
    //   // console.log(result[0]);
    //   // res.write('<tr><td>Hello</td><td>Hello1</td><td>Hello3</td></tr>');
    //   olddata+=`<tr class="month-row month transactionid-${b[count].transactionno}" data-month='${paymentmonth}' id="accountid-${result[0].id}"><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].account}</td><td>${result[0].dcamount}<td><td rowspan=${result.length}>${b[count].narration}</td></tr>`;
    //   // res.write( `<tr><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].account}</td><td>${result[0].dcamount}<td><td rowspan=${result.length}>${b[count].narration}</td></tr>`);
    // }
    // else
    // {
    //   olddata+=`<tr  class="month-row month transactionid-${b[count].transactionno}" data-month='${paymentmonth}' id="accountid-${result[0].id}"><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].accountname}</td><td>${result[0].dcamount}</td><td>${b[count].narration}</td></tr>`;
    //       // res.write(`<tr><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].accountname}</td><td>${result[0].dcamount}</td><td>${b[count].narration}</td></tr>`);
    // }


    //   for(var j=1;j<result.length;j++)
    //   {
    // if(result[j].dctype === 'के')
    //   {
    //     olddata+=`<tr class="month transactionid-${b[count].transactionno} " data-month='${paymentmonth}' id="accountid-${result[j].id}" ><td>${result[j].accountname}</td><td>${result[j].dcamount}</td><td></td></tr>`;
    //   // res.write(`<tr><td>${result[j].accountname}</td><td>${result[j].dcamount}</td><td></td></tr>`);
    // }
    // else
    // {
    //   olddata+= `<tr class="month transactionid-${b[count].transactionno} " data-month='${paymentmonth}' id="accountid-${result[j].id}"><td>${result[j].account}</td><td></td><td>${result[j].dcamount}</td></tr>`;
    //       // res.write(`<tr><td>${result[j].account}</td><td></td><td>${result[j].dcamount}</td></tr>`);
    // }
    // }
    // count++;
    // console.log("Count is "+ count);


    //   newdata=olddata;
    //   tabledata=newdata;
    //   var accountinformation;
    //   // console.log("Newdata is" + newdata);
    //   if(count===results.length)
    //   {
    //    var latest="select * from title";
    //    con.query(latest,function(err,results,fields)
    //    {
    // accountinformation=results;
    // res.render('pages/daybooks',{newdata:newdata,accountinformation:accountinformation});
    //    })

    //   }

    // })

    // // console.log(res);
    //   // console.log(daybooktable);

    // }

    // // res.write(daybooktable);
    // //     for(var key in results)
    // //     {
    // //       // console.log("Key is "+key);
    // //       if(results[key]['']==='c')
    // //     {
    // //       totalcredit=totalcredit+results[key]['total'];
    // //     }
    // //     else
    // //     {
    // //       totaldebit=totaldebit+results[key]['total'];
    // //     }
    // //     }
    // //   });
    // //   });

    // //     // con.query(accountquery,[req.body.date1],[req.body.date2],function(err,result,fields)
    // //   con.query(accountquery,function(err,result,fields)
    // //     {
    // //     var i=0;
    // //     // var transactionno=[];
    // //     var results={};
    // //     const grouped = result.reduce((groups, cur) => {
    // //       console.log(groups);
    // //       console.log(cur);
    // //     var key = cur.transactionno;
    // //     // console.log(key);
    // //     const key1=cur.paymentdate;
    // //    // groups[key]={'1':(groups[key] || 0) + 1};
    // //     groups[key] = (groups[key] || 0) + 1;



    // //     return groups;
    // // }, {});
    // //     // console.log(grouped);
    // //     // console.log(results);

    // // // const totaltransaction = resulr.reduce((groups, cur) => {
    // // //   console.log(groups);
    // // //       console.log(cur);
    // // // if(groups[cur.titles]==undefined)
    // // // {
    // // //   groups[cur.transactionno]=0;
    // // // }
    // // // const key = cur.transactionno;

    // // // groups[key] = groups[key]+ 1;
    // // // return groups;
    // // // }, {});

    // // const totaltransaction= Object.keys(grouped).map(key => ({transactionno: key, total: grouped[key]}));
    // // console.log(totaltransaction);
    //     // for(i=1;i<result.length;i++)
    //     // {

    //     // }
    //     // var resulttable="<table><tr><th>S.N</th><th>Account Name</th><th>Debit</th><th>Credit</th></tr>";
    //     // for(i=1;i<result.length;i++)
    //     // {
    //     //  resulttable+=`<tr><td>${i}</td><td>result[i].account</td>`
    //     // }
    //     // // console.log(result.length);
    //     // // if (err) throw err;
    //     // // console.log(result[0].accountname);
    //     // // console.log("Number of records inserted: " + result.affectedRows);
    //     // // console.log(result);
    //     //     res.render('pages/daybook',{results:result,totaltransaction:totaltransaction,totaldebit:totaldebit,totalcredit:totalcredit});
    //     // console.log(daybooktable);
    //  // res.write('<table>');
    //  //    res.end();
    //     });



});
app.get('/daybookmodify', (req, res) => {
    // console.log(req.body.a);
    // res.writeHead(200,{'Content-Type':'text/html'})
    // var accountquery = "SELECT * from paymenttable where paymentdate between ? and ? ";
    var accountinformation;

    // var accountquery = "SELECT dctype,account,dcamount,DATE_FORMAT(paymentdate,'%Y-%m-%d') as paymentdate,transactionno,narration from paymenttable";
    // var accountquery1 = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";
    var totalcredit = 0,
        totaldebit = 0;


    var accountquery1 = "SELECT DATE_FORMAT(paymentdate,'%Y-%m-%d') as paymentdate,narration,transactionno,id from paymentdetails";
    // var accountquery1 = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";

    // res.write('<table><tr><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th>Narration</th></tr>');

    // var daybooktable='';
    // var a ;
    var i;
    var count = 0;
    var tabledata = '';
    con.query(accountquery1, function(err, results, fields) {
        // res.writeHead(200,{'Content-Type':'text/html'})
        // res.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>');
        var newdata = '';

        newdata += '<table border="1" bordercolor=black class="table"><tr ><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th colspan="2">Narration</th></tr>';
        console.log("newdata is " + newdata);
        var olddata = newdata;
        // res.write('<table border="1" cellspacing="0" cellpadding="5"><tr><th>Date</th><th>Accountname</th><th>Credit</th><th>Debit</th><th colspan="2">Narration</th></tr>');
        // console.log(results.length);
        // console.log(results);

        console.log(results);
        // a= results[0].narration;
        // console.log("A is " + a);
        var b;
        b = results;
        // console.log()

        for (i = 0; i < results.length; i++) {
            console.log("I is " + i);


            // count=i;

            var accountsubquery = 'SELECT * from paymenttable where transactionno = ?';

            con.query(accountsubquery, [results[i].transactionno], function(err, result, fields) {

                // var a= 
                // console.log("A is " + a);
                paymentmonth = b[count].paymentdate.split('-')[1];

                if (err) console.log(err);
                // console.log(`Result is ${result}`);
                console.log("Count is " + count);
                if (result[0].dctype === 'के') {
                    // console.log(result[0]);
                    // res.write('<tr><td>Hello</td><td>Hello1</td><td>Hello3</td></tr>');
                    olddata += `<tr  class="month-row month transactionid-${b[count].transactionno}" data-month='${paymentmonth}' id="accountid-${result[0].id}"><td rowspan=${result.length}>${b[count].paymentdate} <div class="addbutton"><button  class="btn btn-danger bg-danger deletebutton-${b[count].transactionno}" id="deletebutton-${b[count].transactionno}"><i class="fa text-white fa-trash"></i></button><button class="btn btn-info ml-1" id="modifybutton-${b[count].transactionno}" ><i class="fa text-white fa-edit "></i></button><button class="btn btn-success ml-1 submitbutton-${b[count].transactionno}" style="display:none;" id="submitbutton-${b[count].transactionno}"><i class="fa text-white fa-paper-plane"  ></i></button><button  style="display:none;" class="btn btn-danger ml-1 cancelbutton-${b[count].transactionno}" id="cancelbutton-${b[count].transactionno}"><i class="fa text-white fa-times"></i></button></div> </td><td><input class="border-0 p-0 m-0 w-100" value="${result[0].account}" id="accountname-${b[count].transactionno}" disabled><input id="editaccountname-${b[count].transactionno}"  class="border-0 p-0 m-0 w-100"  style="display:none;" list="accounttype" type="text" /></td><td id="credit">${result[0].dcamount}</td><td class="khali"></td><td id="narration-${b[count].transactionno}" rowspan=${result.length}>${b[count].narration}</td></tr>`;
                    // res.write( `<tr><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].account}</td><td>${result[0].dcamount}<td><td rowspan=${result.length}>${b[count].narration}</td></tr>`);
                } else {

                    // olddata+=`<tr  class="month-row month transactionid-${b[count].transactionno}" data-month='${paymentmonth}' id="accountid-${result[0].id}"><td rowspan=${result.length}>${b[count].paymentdate} <div class="addbutton"><button  class="btn btn-danger bg-danger deletebutton-${b[count].transactionno}" id="deletebutton-${b[count].transactionno}"><i class="fa text-white fa-trash"></i></button><button class="btn btn-info ml-1" id="modifybutton-${b[count].transactionno}" ><i class="fa text-white fa-edit "></i></button><button class="btn btn-success ml-1 submitbutton-${b[count].transactionno}" style="display:none;" id="submitbutton-${b[count].transactionno}"><i class="fa text-white fa-paper-plane"  ></i></button><button  style="display:none;" class="btn btn-danger ml-1 cancelbutton-${b[count].transactionno}" id="cancelbutton-${b[count].transactionno}"><i class="fa text-white fa-times"></i></button></div> </td><td><input value="${result[0].account}" id=`accountname-${b[count].transactionno}`><input id=`editaccountname-${b[count].transactionno}` style="display:none;" list="accounttype" type="text" /></td><td>${result[0].dcamount}</td><td rowspan=${result.length}>${b[count].narration}</td></tr>`;
                    olddata += `<tr class="month-row month transactionid-${b[count].transactionno}" data-month='${paymentmonth}' id="accountid-${result[0].id}"><td rowspan=${result.length}>${b[count].paymentdate}<button class="btn btn-danger bg-danger"><i class="fa fa-trash text-white"></i></button><button class="btn btn-info"><i class="fa text-white fa-edit"></i></button></td><td>${result[0].account} <div class="addbutton"></div></td><td>${result[0].dcamount}</td><td>${b[count].narration}</td></tr>`;
                    // res.write(`<tr><td rowspan=${result.length}>${b[count].paymentdate}</td><td>${result[0].accountname}</td><td>${result[0].dcamount}</td><td>${b[count].narration}</td></tr>`);
                }


                for (var j = 1; j < result.length; j++) {
                    if (result[j].dctype === 'के') {
                        olddata += `<tr class="month transactionid-${b[count].transactionno} " data-month='${paymentmonth}' id="accountid-${result[j].id}" ><td> <input value="${result[j].account}"  class="border-0 p-0"  id='accountname-${b[count].transactionno}' disabled><input  class="border-0 p-0 w-100"  id='editaccountname-${b[count].transactionno}' style="display:none;" list="accounttype" type="text" /></td><td id="credit">${result[j].dcamount}</td><td></td></tr>`;
                        // res.write(`<tr><td>${result[j].accountname}</td><td>${result[j].dcamount}</td><td></td></tr>`);
                    } else {
                        olddata += `<tr class="month transactionid-${b[count].transactionno} " data-month='${paymentmonth}' id="accountid-${result[j].id}"><td><input  class="border-0 p-0 w-100" disabled  value='${result[j].account}' id='accountname-${b[count].transactionno}'><input  class="border-0 p-0 w-100"  id='editaccountname-${b[count].transactionno}' style="display:none;" list="accounttype" type="text" /></td><td></td><td id="debit">${result[j].dcamount}</td></tr>`;
                        // res.write(`<tr><td>${result[j].account}</td><td></td><td>${result[j].dcamount}</td></tr>`);
                    }

                    console.log("Olddata is " + olddata);
                }
                count++;
                newdata = olddata;

                tabledata = newdata;
                console.log("Newdata is" + newdata);

                if (count === results.length) {

                    var latest = "select * from accountinformation";
                    con.query(latest, function(err, results, fields) {
                        accountinformation = results;
                        console.log("Account informatiion is " + accountinformation);
                        res.render('pages/daybooks', { newdata: newdata, accountinformation: accountinformation });

                    });


                }

            });

        }



        // console.log(res);
        // console.log(daybooktable);



        // res.write(daybooktable);
        //     for(var key in results)
        //     {
        //       // console.log("Key is "+key);
        //       if(results[key]['']==='c')
        //     {
        //       totalcredit=totalcredit+results[key]['total'];
        //     }
        //     else
        //     {
        //       totaldebit=totaldebit+results[key]['total'];
        //     }
        //     }
        //   });
        //   });

        //     // con.query(accountquery,[req.body.date1],[req.body.date2],function(err,result,fields)
        //   con.query(accountquery,function(err,result,fields)
        //     {
        //     var i=0;
        //     // var transactionno=[];
        //     var results={};
        //     const grouped = result.reduce((groups, cur) => {
        //       console.log(groups);
        //       console.log(cur);
        //     var key = cur.transactionno;
        //     // console.log(key);
        //     const key1=cur.paymentdate;
        //    // groups[key]={'1':(groups[key] || 0) + 1};
        //     groups[key] = (groups[key] || 0) + 1;



        //     return groups;
        // }, {});
        //     // console.log(grouped);
        //     // console.log(results);

        // // const totaltransaction = resulr.reduce((groups, cur) => {
        // //   console.log(groups);
        // //       console.log(cur);
        // // if(groups[cur.titles]==undefined)
        // // {
        // //   groups[cur.transactionno]=0;
        // // }
        // // const key = cur.transactionno;

        // // groups[key] = groups[key]+ 1;
        // // return groups;
        // // }, {});

        // const totaltransaction= Object.keys(grouped).map(key => ({transactionno: key, total: grouped[key]}));
        // console.log(totaltransaction);
        // for(i=1;i<result.length;i++)
        // {

        // }
        // var resulttable="<table><tr><th>S.N</th><th>Account Name</th><th>Debit</th><th>Credit</th></tr>";
        // for(i=1;i<result.length;i++)
        // {
        //  resulttable+=`<tr><td>${i}</td><td>result[i].account</td>`
        // }
        // // console.log(result.length);
        // // if (err) throw err;
        // // console.log(result[0].accountname);
        // // console.log("Number of records inserted: " + result.affectedRows);
        // // console.log(result);
        //     res.render('pages/daybook',{results:result,totaltransaction:totaltransaction,totaldebit:totaldebit,totalcredit:totalcredit});
        // console.log(daybooktable);
        // res.write('<table>');
        //    res.end();
    });



});

app.get('/trialbalance', (req, res) => {
    var accountquery = "SELECT  a.accountname,SUM(a.amount) as total ,g.groupcategory,a.accountgroup from accountinformation as a inner join groups as g on a.accountgroup= g.groupid group by a.accountname,a.accountgroup,g.groupcategory";

    // var accountquery = "SELECT p.account,SUM(p.dcamount) as total,p.dctype from paymenttable as p inner join accountinformation on  group by account,dctype";
    con.query(accountquery, function(err, results, fields) {
        if (err) console.log(err);
        // console.log(results.length);
        // console.log(results);
        var totalcredit = 0,
            totaldebit = 0;
        for (var key in results) {
            // console.log("Key is "+key);
            if (results[key]['groupcategory'] === 'के' || results[key]['groupcategory'] === 'c') {
                totalcredit = totalcredit + results[key]['total'];
            } else {
                totaldebit = totaldebit + results[key]['total'];
            }
        }
        // console.log("Total amount"+totaldebit);
        // console.log("Total amount"+totalcredit);

        // if (err) throw err;
        // console.log(result[0].accountname);
        // console.log("Number of records inserted: " + result.affectedRows);
        res.render('pages/trialbalance', { results: results, totaldebit: totaldebit, totalcredit: totalcredit });
    });
});
app.post('/paymentsubmit',function(req, res) {
    // console.log(req.body.op);
    var paymentdata = req.body.o;

    // var paymentdatadetails = req.body.paymentdetails;

    console.log(paymentdata);
    paymentdata[3]=Number(getenglish(paymentdata[3]));
    console.log(paymentdata);

    // paymentdata=paymentdata[0];
    // console.log(paymentdata);
    // var transactionno = paymentdata[0][4];
    // console.log(`Transaction no is ${transactionno}`);
    var i;
    var accountdetails = [];
    // for (i = 0; i < paymentdata.length; i++) {
        // accountdetails.push([paymentdata[i][2], paymentdata[i][1]])
    // }

    // console.log(accountdetails);

    //   var values = [
    //   { users: "tom", id: 101 },
    //   { users: "george", id: 102 }
    // ];
    // var queries = '';

    // accountdetails.forEach(function(item) {

        // queries += mysql.format("UPDATE accountinformation SET amount = amount + ? WHERE accountname = ?; ", item);
    // });
    // console.log(queries);

    // // con.query(queries,params,callback);

    // con.query(queries);


    var insert1 = "INSERT INTO paymentdetails(type,paymentdate,subaccount,amount,narration) VALUES (?) ";
    con.query(insert1, [paymentdata], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        // console.log("Number of records inserted: " + result.affectedRows);
        console.log(result);
        console.log("He");

        res.json({'transactionno':Number(transactionno)+1});
    });
     // return res.redirect('/pay');
    


})
app.post('/submitcontra', (req, res) => {
    // console.log(req.body.op);
    // var paymentdata=req.body.op;
    // paymentdata=paymentdata[0];
    // console.log(paymentdata);
    var contrafinaldata = req.body.contrafinaldata;
    console.log(contrafinaldata);
    var inser = "INSERT INTO contratable(bankname,accountno,accountgroup) VALUES ? ";
    con.query(inser, [
        [contrafinaldata]
    ], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        // console.log("Number of records inserted: " + result.affectedRows);
        res.json({ 'result': 'Submitted' });
    });


})


app.get('/padhadhikaari', (req, res) => {
    res.render('pages/padhadhikaari');
})
app.post('/billsubmit', (req, res) => {
    // console.log(req.body.op);
    // var paymentdata=req.body.op;
    // paymentdata=paymentdata[0];
    // console.log(paymentdata);
    var billformObj = req.body.billformObj;
    console.log(billformObj);

    var billdetailstable = req.body.billdetailstable;
    console.log(billdetailstable);
    // console.log(contrafinaldata);
    var insert1 = "INSERT INTO `billtable`(`itemname`, `itemquantity`, `units`, `price`, `amount`, `billno`) VALUES ? ";
    var insert2 = "INSERT INTO `billdetailtable`(`billno`, `customername`, `number`, `type`, `total`, `servicecharge`, `taxableamount`, `discountamount`, `tax`, `grandtotal`) VALUES ? ";

    con.query(insert1, [billformObj], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        console.log("Submitted");
        // console.log("Number of records inserted: " + result.affectedRows);
        // res.json({'result':'Submitted'});
    });

    con.query(insert2, [billdetailstable], function(err, result) {
        // console.log([paymentdata]);
        if (err) throw err;
        console.log("Submitted");
        // console.log("Number of records inserted: " + result.affectedRows);
        // res.json({'result':'Submitted'});
    });

    res.json({ 'result': 'Submitted' });
})


// app.get('/',(req,res) =>{
//     res.sendFile(__dirname + '/public/payment.html');
//     // res.send()
//  // res.send('Hello world');
//  // console.log("HEll");
// });
app.listen(3000, () =>
    console.log('Listening on port 3000')
)

// var open = require("open");
// open("http:localhost:3000/pay");