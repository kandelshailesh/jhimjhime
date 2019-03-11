Cookies.set('name', 'Shailesh', { expires: 1 });
console.log(Cookies.get('name'));
// Cookies.remove('paymentno');
    // Cookies.set('salesno', 0, { expires: 1,path: 'localhost:3000'});
    // Cookies.set('transactionno', 2, { expires: 1,path: 'localhost:3000'});
    // Cookies.set('purchaseno', 0, { expires: 1 ,path: 'localhost:3000'});
    // Cookies.set('paymentno', 2, { expires: 1,path: 'localhost:3000' });
    // Cookies.set('receiptno', 0, { expires: 1,path: 'localhost:3000' });
    // Cookies.set('contrano', 0, { expires: 1,path: 'localhost:3000' });

function submittitles(e)
{
     var titlename= $('#titlename').val();
     var type=$('#titletype').val();
     alert(type);
     alert(titlename);
    $.ajax({
        url:'/addtitle',
        type:'post',
        data:{
            titlename:titlename,
            type:type
        },
        success:function(data)
        {
            alert(data.msg);
            $('#closecreatetitle').click();
        }
    })

}


   



if (Cookies.get('salesno') == undefined) {
    Cookies.set('salesno', 0, { expires: 1,path: 'localhost:3000'});
}
if (Cookies.get('transactionno') == undefined) {
    Cookies.set('transactionno', 0, { expires: 1,path: 'localhost:3000'});
}
if (Cookies.get('purchaseno') == undefined) {
    Cookies.set('purchaseno', 0, { expires: 1 ,path: 'localhost:3000'});
}

if (Cookies.get('paymentno') == undefined) {
    Cookies.set('paymentno', 0, { expires: 1,path: 'localhost:3000' });
}

if (Cookies.get('receiptno') == undefined) {
    Cookies.set('receiptno', 0, { expires: 1,path: 'localhost:3000' });
}
if (Cookies.get('contrano') == undefined) {
    Cookies.set('contrano', 0, { expires: 1,path: 'localhost:3000' });
}
if (Cookies.get('journalno') == undefined) {
    Cookies.set('journalno', 0, { expires: 1,path: 'localhost:3000'});
}


$("[id^=month-]").on('click',function(e)
{
var month =event.target.id.split('-')[1];
var monthdata=$(event.target.data).data(month);
console.log(monthdata);
})


$("#report").click(function() {
    $(".reportlist").toggle();
});
console.log(Cookies.get('paymentno'));
var paymentno = Cookies.get('paymentno');
$(".paymentno").text(paymentno);
for (var i = 1; i < 2; i++) {

    $('.paymenttable').append(`<tr  class=" m-0 row row-${i} text-center">
      <td id="sn" class="col-md-2 p-1  ">${i}</td>
      <td   class="col-md-1 p-0"><input class="form-control" name="dctype" id="dctype-${i}" type="text"  onkeyup="javascript:oninputdctype(event);" />

      <td  class="col-md-5 p-0"><input list="accounttype"  name="accounttype-${i}" onkeydown="accounttype(event)" id="accounttype-${i}" type="text" class="form-control" disabled /></td>
      <td  class="col-md-2 p-0"><input onkeypress="createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="debit" id="debit-${i}"  type="text" pattern="[०-९]*" class="form-control" disabled /></td>
      <td   class="col-md-2 p-0"><input onkeypress="createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="credit" id="credit-${i}"  type="text" pattern="[०-९]*" class="form-control" disabled/></td>
    </tr>`)
}


function createnewpayment(e)
{
  
    var i = parseInt(e.target.id.split('-')[1])+1;
    console.log('Pressed');
    if(e.altKey && e.key === "c")
    {
        console.log("EJ");
        $('#totalamount').focus();
    }
    // if(e.keyCode===13)
    // {
    if($(`#accounttype-${i}`).length === 0 && e.keyCode===
        13)
  {
       $('.paymenttable').append(`<tr  class=" m-0 row row-${i} text-center">
      <td id="sn" class="col-md-2 p-1  ">${i}</td>
      <td   class="col-md-1 p-0"><input class="form-control" name="dctype" id="dctype-${i}" type="text"  onkeyup="javascript:oninputdctype(event);" />

      <td  class="col-md-5 p-0"><input list="accounttype"  name="accounttype-${i}" onkeydown="accounttype(event)" id="accounttype-${i}" type="text" class="form-control" disabled /></td>
      <td  class="col-md-2 p-0"><input onkeypress="createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="debit" id="debit-${i}"  type="text" pattern="[०-९]*" class="form-control" disabled /></td>
      <td   class="col-md-2 p-0"><input onkeypress="createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="credit" id="credit-${i}"  type="text" pattern="[०-९]*" class="form-control" disabled/></td>
    </tr>`)
    
}
// }
 

// e.preventDefault();
     // $(`#padhadhikaariname-${i}`).focus();

}


function checktotaldc(event) {
    // event.preventDefault();
    var credittag = $("[id^=credit]");
    var debitamount = 0;
    var creditamount = 0;
    var debittag = $("[id^=debit]");
    for (var i = 0; i < credittag.length; i++) {
        if (credittag[i].value !== '') {
            console.log(credittag[i].value);
            // debittag[i].value == 0;
            // var subcredit = parseInt(credittag[i].value);
            
            var subcredit = calendarFunctions.getNumberByNepaliNumber(credittag[i].value); 


            creditamount = creditamount + subcredit;

            console.log(creditamount);

        }
    // $("#totalcredit").text('Rs ' +calendarfunctions.getNepaliNumber(creditamount));

    }

    for (var i = 0; i < debittag.length; i++) {
        if (debittag[i].value !== '') {
            console.log(debittag[i].value);
            // debittag[i].value == 0;
            // var subdebit = parseInt(debittag[i].value);
            var subdebit = parseInt(calendarFunctions.getNumberByNepaliNumber(debittag[i].value)); 
   
            debitamount = debitamount + subdebit;
            console.log(debitamount);
        }
    // $("#totaldebit").text('Rs ' + calendarfunctions.getNepaliNumber(debitamount));

    }
    $("#totalcredit").text('रू ' +calendarFunctions.getNepaliNumber(creditamount));
    $("#totaldebit").text('रू ' + calendarFunctions.getNepaliNumber(debitamount));

    // $("#totalcredit").text('Rs ' + creditamount);
    // $("#totaldebit").text('Rs ' + debitamount);

}

function oninputdctype(event) {
    event.preventDefault();
    console.log(event.key);
    var targetid = event.target.id.split('-')[1];
    if (event.target.value != 'के' || event.target.value != 'डे') {
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).attr('disabled', 'disabled');
        $("#credit-" + targetid).attr('disabled', 'disabled');
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#narration-" + targetid).attr('disabled', 'disabled');
    }
     if(event.altKey && event.key === "i")
    {
        console.log("HEllo");
        console.log($(`table .row-${targetid}`))
        $(`table .row-${targetid}`).remove();
        checktotaldc();
        return false;
        // $(`table .row-${targetid-1} #quantity-${targetid-1}`).focus();
        // checktotaldc();
    }
    // event.target.value = event.target.value.replace(/[^cd]/, '');
    // targetid=event.target.id.split('-')[1];


    console.log(targetid);
    if (targetid !== 1 && (event.target.value === 'के' || event.target.value === 'डे')) {
        var checkprevious = $(`#dctype-${targetid-1}`).val();
        console.log(checkprevious);
        if (checkprevious === 'के') {

            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#credit-${targetid-1}`).val() === '') {
                $(`#credit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#credit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#credit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
        if (checkprevious === 'd') {


            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#debit-${targetid-1}`).val() === '') {
                $(`#debit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#debit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#debit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
    }


    if (event.target.value === 'के') {


        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
        $("#debit-" + targetid).val('');
        checktotaldc('event');

        $("#credit-" + targetid).removeAttr('disabled', 'disabled');
        // $("#debit-"+targetid).addClass('bg-white');
        $("#narration-" + targetid).removeAttr('disabled', 'disabled');
    }


    if (event.target.value === 'डे') {
        if (targetid !== 1) {
            $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
            $("#narration-" + targetid).removeAttr('disabled', 'disabled');
            checktotaldc('event');

            $("#debit-" + targetid).removeAttr('disabled', 'disabled');
            $("#credit-" + targetid).attr('disabled', 'disabled');
            $("#credit-" + targetid).val('');

            // $("#credit-"+targetid).addClass('bg-white');
        }
    }
}

function createpopup(event) {
    event.preventDefault();
    $("#master").addClass('bg-dark');


}

function keypresshandler(event) {
    event.preventDefault();
    var charCode = event.keyCode;
    // var targetid = event.target.id.split('-');
    // var targetid= targetid[1];
    // console.log(targetid);
    console.log(charCode);
    //Non-numeric character range
    if (charCode === 47 || charCode === 48)
        //   {
        //    if(charCode===47)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');
        //    }
        //    if(charCode===48)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');

        //    }

        // }
        return false;
}

function paymentform() {
    $("#transactiontitle").text('भुक्तानी');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    $("#accountname").focus();
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }

    var paymentno = Cookies.get('paymentno');
    $(".paymentno").text(paymentno);

}

function receiptform() {
    $("#transactiontitle").text('प्राप्ति ');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }
    var receiptno = Cookies.get('receiptno');
    $(".paymentno").text(receiptno);


}

function journalform(event) {
    $("#transactiontitle").text('जर्नल');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }

    var receiptno = Cookies.get('journalno');
    $(".paymentno").text(journalno);


}

function contraform(event) {
    $("#transactiontitle").text('कन्ट्रा');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }
     var receiptno = Cookies.get('contrano');
    $(".paymentno").text(contrano);

}


function salesform(event) {
    $("#transactiontitle1").text('बिक्री');
    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    $("#accountname").focus();

    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');
    }
     var receiptno = Cookies.get('salesno');
    $(".paymentno").text(salesno);


}

function purchaseform(event) {
    $("#transactiontitle1").text('खरीद');
    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    $("#accountname").focus();

    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');
    }
     var purchaseno = Cookies.get('purchaseno');
    $(".paymentno").text(purchaseno);

}


// function submitdata(event) {
    $('form#paymenttranscation').on('submit',function(e)
    {
    e.preventDefault();
    var paymentform = $("#paymenttranscation").serializeArray();
    console.log($("#paymenttranscation").serializeArray());
    var o = [];
    var op = [];
    //  $.each(paymentform, function() {
    //        if (o[this.name]) {
    //            if (!o[this.name].push) {
    //                o[this.name] = [o[this.name]];
    //            }
    //            o[this.name].push(this.value || '');
    //        } else {
    //            o[this.name] = this.value || '';
    //        }
    //    }); 
    // console.log(o);
    var count = 0;
    var paymentlength = $("[id^=accounttype]:enabled").length;
    console.log(paymentlength);

    for (i = 0; i < paymentlength * 3; i = i + 3) {
        console.log("Paymentform" + paymentform[i]);
        if ((paymentform[i]['value'] == 'के' && paymentform[i + 2]['value'] !== '') && paymentform[i + 1]['value'] !== "") {
            console.log([paymentform[i]['value'], paymentform[i + 1]['value'], calendarFunctions.getNumberByNepaliNumber(paymentform[i + 2]['value']), $("#transactiontitle").text(), parseInt($("#transactionid").text()) + 1]);
            op.push([paymentform[i]['value'], paymentform[i + 1]['value'], calendarFunctions.getNumberByNepaliNumber(paymentform[i + 2]['value']), $("#transactiontitle").text(), parseInt(Cookies.get('transactionno'))+ 1]);
            // op[count]={"dctype":paymentform[i]['value'],"accounttype":paymentform[i+1]['value'],"dcamount":paymentform[i+3]['value'],"narration":paymentform[i+4]['value']};
            count++;
        }
        if ((paymentform[i]['value'] == 'डे' && paymentform[i + 2]['value'] !== '') && paymentform[i + 1]['value'] !== "") {
            console.log([paymentform[i]['value'], paymentform[i + 1]['value'], calendarFunctions.getNumberByNepaliNumber(paymentform[i + 2]['value']), parseInt($("#transactionid").text()) + 1]);
            op.push([paymentform[i]['value'], paymentform[i + 1]['value'], calendarFunctions.getNumberByNepaliNumber(paymentform[i + 2]['value']), $("#transactiontitle").text(), parseInt(Cookies.get('transactionno')) + 1]);
            // op[count]={"dctype":paymentform[i]['value'],"accounttype":paymentform[i+1]['value'],"dcamount":paymentform[i+2]['value'],"narration":paymentform[i+4]['value']};
            count++;
        }

    }
    // op.push($("#transactiontitle").text());
    console.log(op);
     var transactiontitle = $("#transactiontitle").text();
    if (($("#totalcredit").text() === $("#totaldebit").text()) && ($("[id^=accounttype]:enabled").length > 1)) {
        if(transactiontitle === 'भुक्तानी')
        {
        var paymentdetails= [parseInt(Cookies.get('transactionno')) + 1,$("#narrationbox").val(),$("#datemodify").val(),$("#transactiontitle").text(),parseInt(Cookies.get('paymentno')) + 1];
    }
            
     if(transactiontitle === 'कन्ट्रा')
        {
        var paymentdetails= [parseInt(Cookies.get('transactionno')) + 1,$("#narrationbox").val(),$("#datemodify").val(),$("#transactiontitle").text(),parseInt(Cookies.get('contra')) + 1];
    }
     if(transactiontitle === 'बिक्री')
        {
        var paymentdetails= [parseInt(Cookies.get('transactionno')) + 1,$("#narrationbox").val(),$("#datemodify").val(),$("#transactiontitle").text(),parseInt(Cookies.get('sales')) + 1];
    }
     if(transactiontitle === 'खरीद')
        {
        var paymentdetails= [parseInt(Cookies.get('transactionno')) + 1,$("#narrationbox").val(),$("#datemodify").val(),$("#transactiontitle").text(),parseInt(Cookies.get('purchase')) + 1];
    }
     if(transactiontitle === 'प्राप्ति')
        {
        var paymentdetails= [parseInt(Cookies.get('transactionno')) + 1,$("#narrationbox").val(),$("#datemodify").val(),$("#transactiontitle").text(),parseInt(Cookies.get('receipt')) + 1];
    }
    

        $.ajax({
            type: 'post',
            url: 'paymentsubmit',
            data: { op:op,paymentdetails:paymentdetails },
            error: function(data) {
                // var data=JSON.parse(data);
                console.log(data.result);
            },
            success: function(data) {
                console.log(data);
               
                if (transactiontitle === 'बिक्री') {
                    if (Cookies.get('salesno') == undefined) {
                        Cookies.set('salesno', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('salesno')) + 1;
                        Cookies.set('salesno', paymentnovalue, { expires: 1 });
                    }
                } else if (transactiontitle === 'भुक्तानी') {
                    if (Cookies.get('paymentno') == undefined) {
                        Cookies.set('paymentno', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('paymentno')) + 1;
                        Cookies.set('paymentno', paymentnovalue, { expires: 1 });
                    }
                } else if (transactiontitle === 'प्राप्ति ') {
                    if (Cookies.get('receipt') == undefined) {
                        Cookies.set('receipt', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('receipt')) + 1;
                        Cookies.set('receipt', paymentnovalue, { expires: 1 });
                    }

                }
                else if ( transactiontitle ==='कन्ट्रा')
                {
                     if (Cookies.get('contra') == undefined) {
                        Cookies.set('contra', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('contra')) + 1;
                        Cookies.set('contra', paymentnovalue, { expires: 1 });
                    }
                }

                // console.log(Cookies.get('paymentno'));
                console.log(data);
                console.log(data.transactionno);
                $("#transactionid").text(data.transactionno);
                $('.resetpayment').click();
                // $('.paymenttable').not([id^=dctype]).attr('disabled','disabled');
                $('.paymenttable td input').attr('disabled', 'disabled');
                $("[id^=dctype]").removeAttr('disabled', 'disabled');

                var paymentno = Cookies.get('paymentno');
                $(".paymentno").text(paymentno);
                $("#totalcredit").text('Rs. 0')
                $("#totaldebit").text('Rs. 0')
            }

        });
    }


    // var a= JSON.stringify(paymentform);
    // console.log(a);
});

$(document).on('click','datalist option',function(e)
{
    var targetid = e.target.id.split('-')[1];  
    console.log(e.target.innerText);
    console.log("instance"+e.target.id);

    $(`#accounttype-${targetid}`).val(e.target.innerText);
    var accountnamedetails= $(".accountnamedetails li");
    for(i=0;i<accountnamedetails.length;i++)
    {
        $(".accountnamedetails a").removeClass(`selected bg-info accountlist-${targetid}`);
        $(".accountnamedetails a").removeAttr('id',`accountlist-${targetid}`);
    }
        $('.accountnamedetails').css('margin-left','-300px');

if($(`#dctype-${targetid}`).val()==='के')
{
     $(`#credit-${targetid}`).focus();
}
else
{
     $(`#debit-${targetid}`).focus();

}
})





$("[id^=credit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).removeClass('border-danger')
            // checktotaldc('event');

        }
    } else {
        if (!$(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }
});

function selectaccount(event) {
    console.log("Clicked list");
    console.log(event.which);
    console.log($('li.selected').text());
    $('#accounttype-1').val($('li.selected').text());
    $("#accountlist-1").text('');

}
$("[id^=debit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).removeClass('border-danger')
        }
        checktotaldc('event');

    } else {
        if (!$(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }

})

var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();

$('.dates').append(`<input  id='datemodify' class='ml-1 border-0 d-inline' value=${currentdate}>`);
$('.times').append("<h6 class='timeupdate ml-1 d-inline'>" + currenttime + "</h6>");
$('#datemodify').calendarsPicker({ calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});

$("[id^=items]").on('keyup', function(event) {
    var ids = event.target.id.split('-');
    var id = ids[1];
    // console.log(id);
    var quantity = $('#itemsquantity-' + id).val();
    var price = $('#itemsprice-' + id).val();
    var totalamount = parseInt(quantity) * parseInt(price);
    $('#amount-' + id).val(totalamount);
    var amountlist = $("[id^=amount]");
    console.log(amountlist[0].value);
    var total = 0;
    var j;
    for (var i = 0; i < amountlist.length; i++) {
        console.log(j);
        var subtotal;
        subtotal = amountlist[i].value;
        console.log(subtotal);
        total = parseInt(total) + parseInt(subtotal);
        console.log(total);

    }
    $("#totalamount").text(total);
});


const addprice = (event, id) => {
    var items = [{ 'item': 'Momo', 'price': 100 }, { 'item': 'Chicken', 'price': 100 }, { 'item': 'Coffee', 'price': 55 }, { 'item': 'Tea', 'price': 30 }, { 'item': 'Rice', 'price': 250 }, { 'item': 'Chowmein', 'price': 100 }];
    console.log(event.target.textContent);

    var itemselected = event.target.textContent;
    $("#itemlist-" + id).hide();
    $("#itemname-" + id).val(`${itemselected}`);
    for (var i in items) {
        if (items[i]['item'] === itemselected) {
            $("#itemsprice-" + id).val(`${items[i]['price']}`);
        }
    }

}

function submitaccount(event) {
    // event.preventDefault();
    alert(event);
    var accountdata = $(".accountinformations").serializeArray();
    console.log(accountdata);
    var accountdataarray = [];
    var previousyeardate = $("#previousyear").val().split('-');
    var converteddate = '';
    for (var i = 0; i < 3; i++) {
        if (i < 2) {
            // console.log(calendarFunctions.getNumberByNepaliNumber("१२५"));
            converteddate = converteddate + calendarFunctions.getNumberByNepaliNumber(previousyeardate[i]) + '-';
        } else {
            converteddate = converteddate + calendarFunctions.getNumberByNepaliNumber(previousyeardate[i]);
        }
        console.log(converteddate);

    }
    for (i = 0; i < accountdata.length; i++) {
        if (accountdata[i]['value'] === "") {
            accountdata[i]['value'] = 0;
            console.log(accountdata[i]);
        }
        if (accountdata[i]['name'] == 'previousyear') {
            accountdata[i]['value'] = converteddate;
            console.log(accountdata[i]);
        }
        accountdataarray.push(accountdata[i].value);
    }

    console.log(accountdata);
    console.log(accountdataarray);
    $.ajax({
        type: 'post',
        url: 'accountsubmit',
        data: { accountdataarray },
        success: function(data) {
            console.log(data.result);
            $("#closecreateaccount").click();
        }
    });


}

function handle(el) {
    $('.accountnamedetails').scrollTop(60);
    $('.accountnamedetails').animate({ scrollTop: el.position().top });
}

function accountselect(event)
{
// $("[id^=accounttype]").on('input',function(e) {
   var li = $('li#accounttype');
   var text=event.target.value;
 for (var i = 0; i < li.length; i++) {
        console.log(li[i]);
        var litext = li[i].textContent;
        console.log(litext);
        if (litext.indexOf(text) !== -1) {
          console.log("Inserted");
           
            if (!$(`li:eq(${i})`).hasClass('selected')) {
                $(`li#accounttype:eq(${i})`).addClass('selected');
                 $(`li#accounttype:eq(${i})`).css('background-color', 'blue');
            }


        } else {
           if ($(`li:eq(${i})`).hasClass('selected')) {
            $(`li#accounttype:eq(${i})`).removeClass('selected');

            $(`li#accounttype:eq(${i})`).css('background-color', 'white');
}
        }

    }

    handle($('li#accountype.selected'));
    if ($('li#accounttype.selected').length < 1) {
        alert("Spelling error");

    }
  // });
}

$('#paymenttranscation').on('keyup', 'input', function(e) {
      e.preventDefault();
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;
    console.log("PRessed n");
    if (e.shiftKey) {
        if (e.keyCode == 13) {
            e.preventDefault();
            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
        return false;
    } else if(e.altKey && e.keyCode ===13)
     {
        $("#narrationbox").focus();
        return false;
     }
else
    if (e.keyCode == 13) {
        e.preventDefault();
        $('[id^=accountlist]').html('');

        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

$('.accountinformations').on('keydown', 'input', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {
            e.preventDefault();
            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
    } else
    if (e.keyCode == 13) {
        e.preventDefault();
        // $('[id^=accountlist]').html('');

        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
    
});

$('#newaccount').on('click', function(e) {
    e.preventDefault();

});



$('#myModal').on('shown.bs.modal', function() {
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});
$('#itemModal').on('shown.bs.modal', function() {
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});
$('#itemgroupModal').on('shown.bs.modal', function() {
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

// Form control on enter
$('.contraform').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
    } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();
            next.select();
        } else {
            form.submit();
        }
        return false;
    }
});

function submitcontra(event) {
    event.preventDefault();
    var contradata = $('.contraform').serializeArray();
    var contrafinaldata = [];
    for (var i = 0; i < 3; i++) {
        contrafinaldata.push(contradata[i]['value']);
    }
    console.log(contrafinaldata);
    $.ajax({
        type: 'post',
        url: 'submitcontra',
        data: { contrafinaldata },
        success: function(data) {
            console.log("Inserted Successfully");
        }
    });
}

$('#contraentry').on('shown.bs.modal', function(e) {
    e.preventDefault();
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

function changeaccounttype(event) {
    var value = event.target.value;
    console.log(value);
    if (value > 0 && value < 4) {
        $("#accountnodiv").show();
        $("#accountno").removeAttr('disabled', 'disabled');
    } else {
        $("#accountnodiv").hide();
        $("#accountno").attr('disabled', 'disabled');
    }
}
var currentDate = new Date();
var currentNepaliDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
var formatedNepaliDate = calendarFunctions.bsDateFormat("%y-%m-%d", currentNepaliDate.bsYear, currentNepaliDate.bsMonth, currentNepaliDate.bsDate);



$("#previousyear").nepaliDatePicker({
    dateFormat: "%y-%m-%d",
    closeOnDateSelect: true,
    minDate: "२०७०-१-२०",
    maxDate: formatedNepaliDate
});





$("#clear-bth").on("click", function(event) {


    $(".bod-picker").val('');

});