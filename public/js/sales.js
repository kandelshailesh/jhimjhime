function returnnumber(value) {
    return calendarFunctions.getNumberByNepaliNumber(value)
}

function returnnepalinumber(value) {
    return calendarFunctions.getNepaliNumber(value)
}

 function collectiontype(value) {
    var collectionlist = { 'ढलापडा': 'dhalapada', 'पुनर्स्थापना': 'punarsthapan', 'गत वर्षकाे माैज्दात': 'previousyearmoujdat', 'उपभाेक्ता भित्र विक्री': 'upavoktabikri', 'पाेल चिरान': 'polchiran', 'जि.ब. आपूर्ति': 'jibika', 'लिलाम प्रक्रिया': 'lilamprocess' };
    return collectionlist[value];
}


$(document).on('keydown keyup keypress','#userid',function(e)
{

  var userid= returnnumber(e.target.value);
  console.log(userid);
  console.log(e.keyCode);
  $.ajax({
    url:'returnusername',
    method:'post',
    data:{userid:userid},
    success:function(data)
    {
      console.log(data);
      $('#username').val(data.result[0].fname+' '+data.result[0].lname);
    }
  })


})
$('input#bikritypes').on('input',function(e)
{
  // alert('S');
  var value=e.target.value;
  // alert(value);
  if(value==='उपभाेक्ता भित्र विक्री')
  {
    $('.salespurchase').html('');
  $('.salespurchase').append(`<label style="font-size:15px;" class="ml-2">उपभाेक्ता नं </label>
        <input type="text" name="userid" id="userid" style="width:50px;" class="form-control d-inline ml-2 mr-2" autofocus>         
        <label style="font-size:15px;">नाम</label>
        <input type="text" name="accountname" id="username" class="form-control w-25 d-inline ml-2" autofocus>`);
  }
  else if(value === 'पाेल चिरान')
  {
    $('.salespurchase').html('');

    $('.salespurchase').append(`<label style="font-size:15px;">नाम</label>
        <input type="text" name="accountname" id="accountname" class="form-control w-25 d-inline ml-2" autofocus>`);
  }
  else if(value === 'जि.ब. आपूर्ति')
  {
    $('.salespurchase').html('');

    $('.salespurchase').append(`<label style="font-size:15px;" class="ml-2">उपभाेक्ता नं </label>
        <input type="text" name="userid" id="userid" style="width:50px;" class="form-control d-inline ml-2 mr-2" autofocus>         
        <label style="font-size:15px;">नाम</label>
        <input type="text" name="accountname" id="accountname" class="form-control w-25 d-inline ml-2" autofocus>`);
  }
   else if(value === 'लिलाम प्रक्रिया')
  {
    $('.salespurchase').html('');

   $('.salespurchase').append(`<label style="font-size:15px;">नाम</label>
        <input type="text" name="accountname" id="accountname" class="form-control w-25 d-inline ml-2" autofocus><label style="font-size:15px;">ठेगाना</label>
        <input type="text" name="address" id="address" class="form-control w-25 d-inline ml-2" autofocus>`);
  }
})


for( var i=1;i<2;i++)
{

 $('.salestable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1">${i}</td>
      <td class="col-md-1 p-0"><input class="form-control text-center" name="gullino" id="gullino-${i}" type="text" /></td>
      <td   class="col-md-4 p-0"><input class="form-control text-center" name="kaathname" id="kaathname-${i}" type="text" /></td>
      
      <td  class="col-md-2 p-0"><input  name="quantity" id="quantity-${i}" type="text" class="form-control text-center"  /></td>
      <td   class="col-md-2 p-0"><input name="per" id="per-${i}"  type="text" class="form-control text-center"  value='०' /></td>
      <td   class="col-md-2 p-0"><input  name="amount" onkeydown="createnewitem(event)" id="amount-${i}"  value='०' class="form-control text-center"   /></td>
    </tr>`)

  }

$(document).on('keyup','[id^=per]',function(e)
{
var targetid=event.target.id.split('-')[1];
var value= returnnumber(event.target.value);
console.log(value);
// var totalamount=0;
if(value>0)
{
var amountinnepali=returnnumber($(`#quantity-${targetid}`).val()) * returnnumber($(`#per-${targetid}`).val());
console.log(amountinnepali);
amountinnepali=returnnepalinumber(amountinnepali);
console.log(amountinnepali);

$(`#amount-${targetid}`).val(amountinnepali);
var amountlist=$("[id^=amount");
var totalamount=0;
console.log(amountlist.length);
var i;
for(i=0;i<amountlist.length;i++)
{
totalamount=totalamount+parseInt(returnnumber($(`#amount-${i}`).val()));
console.log(totalamount);
console.log("AMout is "+parseInt(returnnumber($(`#amount-${i}`).val() )));
}
console.log("Total amount is "+totalamount);
totalamount= returnnepalinumber(totalamount);
console.log("totalamount is "+totalamount);
$("#totalamount").val(`रू ${totalamount}`);
}
})

$(document).on('keyup','[id^=gullino]',function(e)
{
// e.preventDefault();
console.log(e.keyCode);
  // if(e.keyCode === 13)
  // {
       

var gullino=returnnumber(e.target.value);
var targetid=e.target.id.split('-')[1];
console.log(gullino);
$(`#kaathname-${targetid}`).val('');
    // $(`#kaathgrade-${targetid}`).val('');
    $(`#quantity-${targetid}`).val('');
    $(`#per-${targetid}`).val('');
    $(`#amount-${targetid}`).val('');
$.ajax({
  url:'/kaathdata',
  method:'post',
  data:{gullino:gullino},
  success:function(data)
  {
    console.log(data);
    console.log(data.result);
    if(data.result.length>0)
    {
    $(`#kaathname-${targetid}`).val('');
    // $(`#kaathgrade-${targetid}`).val('');
    $(`#quantity-${targetid}`).val('');
    $(`#kaathname-${targetid}`).val(data.result[0].kaathname);
    // $(`#kaathgrade-${targetid}`).val(data.result[0].grade);
    $(`#quantity-${targetid}`).val(returnnepalinumber(data.result[0].quantity));
}

  }
})


})

function createnewitem(e)
{
  
    var i = parseInt(e.target.id.split('-')[1])+1;
    console.log('I is '+i);
    console.log('Pressed' + i);
    if(e.altKey && e.key === "c")
    {
        console.log("EJ");
        $('#totalamount').focus();
    }

    if($(`#kaathname-${i}`).length === 0 && e.keyCode===
        13)
  { $('.salestable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1">${i}</td>
      <td class="col-md-1 p-0"><input class="form-control text-center" name="gullino" id="gullino-${i}" type="text" /></td>
      <td   class="col-md-4 p-0"><input class="form-control text-center" name="kaathname" id="kaathname-${i}" type="text" /></td>
      
      <td  class="col-md-2 p-0"><input  name="quantity" id="quantity-${i}" type="text" class="form-control text-center"  /></td>
      <td   class="col-md-2 p-0"><input name="per" id="per-${i}" class="form-control text-center" /></td>
      <td   class="col-md-2 p-0"><input readonly name="amount" onkeydown="createnewitem(event)" id="amount-${i}"  class="form-control text-center"   /></td>
    </tr>`)
 
 $("#totallist").val(`${i}`);
    
}
// }


// e.preventDefault();
     // $(`#padhadhikaariname-${i}`).focus();

}
$('#salespurchasetransaction').on('keydown', 'input', function(zEvent) {

        var self = $(this),
            form = self.parents('form:eq(0)'),
            focusable, next, prev;

        if (zEvent.shiftKey) {
            if (zEvent.keyCode == 13) {

                focusable = form.find('input,a,select,button,textarea').filter(':enabled');
                prev = focusable.eq(focusable.index(this) - 1);

                if (prev.length) {
                    prev.focus();
                } else {
                    form.submit();
                }
            }
        } else
        if (zEvent.keyCode == 13) {
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


$('#salesdate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'})