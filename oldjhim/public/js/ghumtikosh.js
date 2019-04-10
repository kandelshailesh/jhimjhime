for (var i = 1; i < 2; i++) {

    $('.ghumtikoshtable').append(`<tr  class=" m-0 row row-${i} text-center">
      <td id="sn" class="col-md-3 p-1  ">${i}</td>
      <td   class="col-md-4 p-0">
      <input class="form-control text-center" name="useriddisplay" id="userid-${i}" type="text"/>
<input class="form-control text-center" style="display:none;" name="userid" id="useriddummy-${i}" disabled/>
      </td>
      <td  class="col-md-5 p-0"><input onkeydown="createnew(event)" oninput="javascript:checktotaldc(event);" name="totalamountdisplay" id="price-${i}"  type="text" pattern="[०-९]*" class="form-control text-center" />
            <input name="totalamount" style="display:none;" id="pricedummy-${i}" disabled/>
            </td>
       
     
    </tr>`);
}


function removedisable()
{
  alert("REMove disabl");
var useridtag = $("[id^=useriddummy-]");
alert(useridtag.length);
alert(useridtag[0].value);
 var amounttag = $("[id^=pricedummy]");
 for(i=0;i<useridtag.length;i++)
 {

useridtag[i].removeAttribute('disabled','disabled')
 useridtag[i].style.display="block";
 amounttag[i].removeAttribute('disabled','disabled');
 amounttag[i].style.display="block";

 // $("[id^=pricedummy-]").find(i).removeAttr('disabled','disabled');
 // $("[id^=pricedummy-]").find(i).removeClass('d-none');


  // amounttag[i].removeAttr('disabled','disabled');
 
 }
  return true;
}
$(document).on('keyup','[id^=userid]',function(e)
{
console.log("Pir");
var targetid= event.target.id.split('-')[1];
$("#useriddummy-"+targetid).val(calendarFunctions.getNumberByNepaliNumber($("#userid-"+targetid).val()));
console.log($("#useriddummy-"+targetid).val());
     if(event.altKey && event.key === "c")
    {
        console.log("HEllo");
        console.log($(`table .row-${targetid}`))
        $(`table .row-${targetid}`).remove();
        $(`table .row-${targetid-1} #price-${targetid-1}`).focus();
        // checktotaldc();
    }
});
$(document).on('keyup','[id^=price]',function(e)
{
  var totalpricelist= $("[id^=price]");
  var totalprice=0;
var targetid= event.target.id.split('-')[1];

  $("#pricedummy-"+targetid).val(calendarFunctions.getNumberByNepaliNumber($("#price-"+targetid).val()));
console.log($("#pricedummy-"+targetid).val());

  for(i=0;i<totalpricelist.length;i++)
  {
    if(totalpricelist.eq(i).val()>0)
    {
    totalprice=totalprice+parseInt(totalpricelist.eq(i).val());
    }
  }
  if($("#total").text()==='NaN')
  {
  $("#total").text('रू '+0);
  }
else
{
  $("#total").text('रू '+totalprice);
}
})

function createnew(e)
{
  
    var i = parseInt(e.target.id.split('-')[1])+1;
    console.log('Pressed');
   
    // if(e.keyCode===13)
    // {
    if($(`#accounttype-${i}`).length === 0 && e.keyCode===
        13)
  {
      $('.ghumtikoshtable').append(`<tr  class=" m-0 row row-${i} text-center">
      <td id="sn" class="col-md-3 p-1  ">${i}</td>
      <td   class="col-md-4 p-0">
      <input class="form-control text-center" name="useriddisplay" id="userid-${i}" type="text"/>
<input class="form-control text-center" style="display:none;" name="userid" id="useriddummy-${i}" disabled/>
      </td>
      <td  class="col-md-5 p-0"><input onkeydown="createnew(event)" oninput="javascript:checktotaldc(event);" name="totalamountdisplay" id="price-${i}"  type="text" pattern="[०-९]*" class="form-control text-center" />
            <input name="totalamount" style="display:none;" id="pricedummy-${i}" disabled/>
            </td>
       
     
    </tr>`);
    
}
// }
 

// e.preventDefault();
     // $(`#padhadhikaariname-${i}`).focus();

}


$('.ghumtikoshinitialform').on('keydown', 'input', function(e) {

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

var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();
$('#datechange').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'})
$('#daybookfinaldate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});