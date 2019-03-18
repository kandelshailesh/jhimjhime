for (var i = 1; i < 2; i++) {
	

    $('.padhadhikaaritable').append(`<tr  class=" m-0  row text-center">
			<td id="sn" class="col-md-2">${i}</td>
			<td   class="col-md-4 p-0"><input id="padhadhikaariname-${i}" name="padhadhikaariname-${i}" style="text-align-last:center;" type="text" class="form-control" autocomplete="off" /><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none list-group"></ul>
			<td  class="col-md-3 p-0"><select onchange="postchange(event)" name='post-${i}' style="text-align-last:center; text-align:center;" id='post-${i}' class='form-control'><option selected='selected' value='0'>-------------------</option><option value='1'>अध्यक्ष</option><option  value='2'>उपाध्यक्ष</option><option  value='3'>सचिव</option><option  value='4'>सह सचिव</option><option value='5'>सदस्य</option><option value='6'>सल्लाहकार</option><option value='7'>संयाेजक</option><option value='8'>कास</option><option value='9'>वन हेरालु</option></select></td>
			<td  class="col-md-3 p-0">
			<select onkeypress="createnew(event)" id="samiti-${i}" onchange="createnew(event)" class="form-control" style="text-align-last:center; text-align: center; " name="samiti-${i}" >
			<option selected='selected' value='0'>---------------------</option><option  value='1'>कार्य समिति</option><option  value='2'>लेखा समिति </option><option  value='3'>कर्मचारी विवरण</option>
			
        </select></td>
		
		
		</tr>`);
}


// <td class="col-md-1 p-0"><button type="button" id="itemdel-${i}" class="btn btn-sm btn-danger">
//     <i class="fa fa-trash"></i> Del
// </button></td>
// $('[id^=amount]').on('keydown',function(e)
// {


function returnpost(value)
{


var post = {'1':'अध्यक्ष','2':'उपाध्यक्ष','3':'सचिव','4':'सह सचिव','5':'सदस्य','6':'सल्लाहकार','7':'संयाेजक','8':'कास','9':'वन हेरालु'};


return post[value];
}

function returnsamiti(value)
{

var samiti = {'1':'कार्य समिति','2':'लेखा समिति','3':'कर्मचारी विवरण'};
return samiti[value];
}

function returnsex(value)
{
	
var sex = {'0':'पुरुष','1':'महिला'};
return sex[value];
}
	function createnew(e)
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
	if($(`#padhadhikaariname-${i}`).length === 0 && e.keyCode===
		13)
  {
    $('.padhadhikaaritable').append(`<tr  class=" m-0 extraadded  row text-center">
			

			<td id="sn" class="col-md-2 ">${i}</td>
			<td   class="col-md-4 p-0"><input id="padhadhikaariname-${i}" name="padhadhikaariname-${i}" style="text-align-last:center;" type="text" class="form-control" autocomplete="off" /><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none list-group"></ul>
			<td  class="col-md-3 p-0"><select onchange="postchange(event)" onkeypress="postchange(event)" name='post-${i}' style="text-align-last:center; text-align:center;" id='post-${i}' class='form-control'><option selected='selected' value='0'>-------------------</option><option value='1'>अध्यक्ष</option><option  value='2'>उपाध्यक्ष</option><option  value='3'>सचिव</option><option  value='4'>सह सचिव</option><option value='5'>सदस्य</option><option value='6'>सल्लाहकार</option><option value='7'>संयाेजक</option><option value='8'>कास</option><option value='9'>वन हेरालु</option></select></td>
			<td  class="col-md-3 p-0">
			<select onkeypress="createnew(event)" id="samiti-${i}" onchange="createnew(event)" class="form-control" style="text-align-last:center; text-align: center; "  >
			<option selected='selected' value='0'>---------------------</option><option  value='1'>कार्य समिति</option><option  value='2'>लेखा समिति </option><option  value='3'>कर्मचारी विवरण</option>
			
        </select></td>
		
		</tr>`);
	
}
// }


// e.preventDefault();
	 $(`#padhadhikaariname-${i}`).focus();

}


function typechange(event)
{
	$("#rthno").focus();
}
function postchange(event)
{
	event.preventDefault();
	var id= event.target.id.split('-')[1];
	if(event.keyCode==='13')
	{
	$(`#samiti-${id}`).focus();
}
$(`#samiti-${id}`).focus();
}

var gc = $.calendars.instance('nepali','ne'); 
var currentdate=gc.newDate();
      var currenttime=new Date();
      var currenttime=currenttime.toLocaleTimeString();
      var random =parseInt(Math.floor((Math.random()*1000000000) +1));

      $('.dates').append("<label class='ml-1 d-inline'>"+currentdate+"</label>");
        $('.times').append("<label class='timeupdate ml-1 d-inline'>"+currenttime+"</label>");
        $('.billno').append("<label class='ml-1 d-inline'>"+random+"</label>");

    
	



$('.padhadhikaariaddform').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } 
            else
            {
            	$('#billsubmit').click();
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
        } 
        else
        {
           $('#billsubmit').click();
            	

        }
        return false;
    }
});

$('.padhadhikaariaddform').on('submit',function(e)
{
	// alert("INserted");
	e.preventDefault();
	var padhadhikaariformObj=[];
	var padhadhikaariname= $("[id^=padhadhikaariname");
	var post= $("[id^=post");
	var samiti= $("[id^=samiti-");
    var startdate= $("#startdate").val();
    var samitino = $("#samitino").val();
	for(i=0;i<padhadhikaariname.length;i++)
	{

	if($(padhadhikaariname).eq(i).val()!=='' && $(post).eq(i).val()!=='' && $(samiti).eq(i).val()!==''&& startdate!=='')
	{
	console.log("NOt");
	alert("डाटा राम्रो सँग हान्नुहोस");
}
else
{
	return false;
}
}
for(i=0;i<padhadhikaariname.length;i++)
	{
	padhadhikaariformObj.push([$(padhadhikaariname).eq(i).val(), $(post).eq(i).val(),$(samiti).eq(i).val(),startdate,samitino]);
		console.log(padhadhikaariformObj);
		console.log($(samiti).eq(i).val());
	}
$.ajax({
	type:'post',
	url:'padhadhikaarisubmit',
	data:{padhadhikaariformObj:padhadhikaariformObj},
	success:function(data){
		console.log(data.result);
		console.log("Submitted");

		$('#resetpadhadhikaariaddform').click();
			$('.extraadded').remove();
		// $(".billprint").printArea({ mode: 'popup', popClose: true });

	}

});
	
	



console.log(padhadhikaariformObj);
	
})



// $('[id$=amount]').on('change',function(e))
// {}


$("[id^=padhadhikaariform]").on('click',function(e)
{
	console.log("Eh");
	var id=event.target.id.split('-')[1];
	console.log(id);
	for(var i=1;i<4;i++)
	{
				if(id==i)
				{
					if($(`.padhadhikaariformshow-${i}`).hasClass('d-none'))
					{
					$(`.padhadhikaariformshow-${i}`).removeClass('d-none');
				}
				}
				else
				{ 
					if(!$(`.padhadhikaariformshow-${i}`).hasClass('d-none'))
					{
						$(`.padhadhikaariformshow-${i}`).addClass('d-none');
				}
	}
}
})



$('.padhadhikaarikhojbutton').on('click',function(e)
{
	var samitino= $("#samitino1").val();
	alert(samitino);
    if(samitino!==null)
    {
   $.ajax({
   	type:'post',
    url:'padhadhikaarikhoj',
    data:{samitino:samitino},
    success:function(data)
    {
    	console.log(data.result);
    	var result=data.result;

    	if(result.length>0)
    	{
        console.table(result);
    	$('.appendsearch').html('');
    	$('.appendsearch').append(`
    		<div class="text-center"><label  class="ml-4 samitinokhoj"> समिति नं</label> <input type="text" style="height:25px !important; width:30px !important;" id="samitino" value='${result[0]['samitino']}' autofocus class="d-inline ml-2 border-0 bg-white" disabled><label class="ml-1 " style="font-size:15px;"> सुरु मिति</label> <input type="text" style="height:25px !important;" id="startdate" value='${result[0]['startdate']}' class="d-inline ml-2 startdatekhoj border-0 bg-white" disabled><label style="font-size:15px;"> अन्तिम मिति</label> <input type="text" style="height:25px !important;" id="startdate" value='${data.enddate}' class="d-inline ml-2 startdatekhoj border-0 bg-white" disabled></div>`);

    	$('.appendsearch').append(`<table border="1" class=" padhadhikaaritablekhoj  table-sm">
                        <tr class=" m-0  row text-center">
                            <th class="col-md-4">नाम</th>
                            <th class="col-md-3">पद</th>
                            <th class="col-md-3">समिति</th> 
                            <th class="col-md-2"></th> 
                            </tr>`);
                  
    		for(var i=0;i<result.length;i++)
    		{
    			$('.padhadhikaaritablekhoj').append(`<tr id="user-${result[i].id}" class=" m-0 extraadded  row text-center">
			<td   class="col-md-4" id='namekhoj-${result[i].id}'>${result[i].upavoktaname}</td>
			<td class="col-md-3 p-0" id='postkhoj-${result[i].id}'>
			<label class="postwrite-${result[i].id} mt-1">${returnpost(result[i].post)}</label>
			<select name='post-${result[i].id}' style="text-align-last:center; display:none; text-align:center;" id='postkhoj-${result[i].id}'>
<option  value='0'>-------------------</option><option value='1'>अध्यक्ष</option><option  value='2'>उपाध्यक्ष</option><option  value='3'>सचिव</option><option  value='4'>सह सचिव</option><option value='5'>सदस्य</option><option value='6'>सल्लाहकार</option><option value='7'>संयाेजक</option><option value='8'>कास</option><option value='9'>वन हेरालु</option></select>
			</td>
			<td class="col-md-3 p-0 " id='samitikhoj-${result[i].id}'>
			<label class="samitiwrite-${result[i].id} mt-1">${returnsamiti(result[i].samiti)}</label>

			<select id="samitikhoj-${result[i].id}" class="form-control" style="text-align-last:center; text-align: center; display:none;" >
			<option value='0'>---------------------</option>
			<option  value='1'>कार्य समिति</option>
			<option  value='2'>लेखा समिति </option>
			<option  value='3'>कर्मचारी विवरण</option>
			
        </select></td>

			<td class="col-md-2"><button  onclick="deluser(event)" class="deletebutton-${result[i].id} border-0 bg-white btn-sm" id="${result[i].id}"><i class="fa text-danger fa-trash"></i></button><a class="modifybutton-${result[i].id} border-0 bg-white btn-sm"  href="#" onclick="javascript:modifyuser(event)" id="${result[i].id}"><i class="fa fa-edit text-info"></i></a><a href="#" class="modifysubmitbutton-${result[i].id} btn-sm border-0 bg-white" style="display:none;" onclick="javascript:modifyusersubmit(event)" id="${result[i].id}"><i class="fa fa-paper-plane text-success"></i></a><button style="display:none;" onclick="cancel(event)" class="cancel-${result[i].id} ml-2 border-0 bg-white" id="${result[i].id}"><i class="text-danger fa fa-times"></i></button></td>
			</tr>`);
    				$('.appendsearch').find($(`select#postkhoj-${result[i].id} option`)).eq(`${result[i].post}`).attr('selected','selected');
    				$('.appendsearch').find($(`select#samitikhoj-${result[i].id} option`)).eq(`${result[i].samiti}`).attr('selected','selected');

    		// console.log(selected);

    		}
    	
    		$('.appendsearch').append('<table>');
    	}
    	else
    	{ 
    		$('.appendsearch').html('');

    		$('.appendsearch').append(`<p class="text-center">डाटा उपलब्ध भयन</p>`);
    	}
    }
   })
}

});

function deluser(event)
{
	event.preventDefault();
	var id = event.target.id;

	$.ajax({
		type:'post',
		url:'padhadhikaaridel',
		data:{ids:id},
		success:function(data){
			$('.appendsearch').find($(`#user-${id}`)).remove();

			console.log("Deleted");
		}

	})

	
}
function modifyuser(event)
{
	event.preventDefault();
	var id = event.target.id;
	console.log(id);
	$(`select#postkhoj-${id}`).show();
	$(`select#samitikhoj-${id}`).show();


	$(`.postwrite-${id}`).hide();
	$(`.samitiwrite-${id}`).hide();


	$(`#namekhoj-${id}`).attr('contenteditable','true');
	$(`#postkhoj-${id}`).attr('contenteditable','true');
	$(`#samitikhoj-${id}`).attr('contenteditable','true');
	$(`.deletebutton-${id}`).hide();
	$(`.modifybutton-${id}`).hide();
	$(`.modifysubmitbutton-${id}`).show();	
	// $(`#user-${id}`).attr('contenteditable','true');
	$(`.cancel-${id}`).show();

}

function modifyusersubmit(event)
{
    event.preventDefault();
	var id = event.target.id;
    console.log(id);
  
	$(`.postwrite-${id}`).text(returnpost($(`select#postkhoj-${id}`).val()));
	$(`.postwrite-${id}`).show();	
	$(`.samitiwrite-${id}`).show();
	console.log($(`select#postkhoj-${id}`).val());
	$(`.postwrite-${id}`).text(returnpost($(`select#postkhoj-${id}`).val()));
	$(`.samitiwrite-${id}`).text(returnsamiti($(`select#samitikhoj-${id}`).val()));
	  $(`select#postkhoj-${id}`).hide();
	$(`select#samitikhoj-${id}`).hide();
		var data1=[[$(`#namekhoj-${id}`).text()],[$(`select#postkhoj-${id}`).val()],[$(`select#samitikhoj-${id}`).val()],[$('.startdatekhoj').val()],[id]];
console.log(data1);
    // console.log($(`#namekhoj-${id}`));
    // console.log(id);
    // console.log(data1);

    // console.log(data1);
	$.ajax({
		type:'post',
		url:'modifypadhadhikaarisubmit',
		data:{data1:data1},
		success:function(data){
			$(`.deletebutton-${id}`).show();
			$(`.modifybutton-${id}`).show();
			$(`.modifysubmitbutton-${id}`).hide();
			$(`.cancel-${id}`).hide();
			console.log("Modified");
	


		}

	});

}

function cancel(event)
{
	event.preventDefault();
	var id = event.target.id;
    console.log("Clicked");
    console.log(id);
	$(`.deletebutton-${id}`).show();
	$(`.modifybutton-${id}`).show();
	$(`.modifysubmitbutton-${id}`).hide();
	$(`.cancel-${id}`).hide();

$(`select#postkhoj-${id}`).hide();
	$(`select#samitikhoj-${id}`).hide();


	$(`.postwrite-${id}`).show();
	$(`.samitiwrite-${id}`).show();
}


var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();

// $('.dates').append(`<input  id='datemodify' class='ml-1 border-0 d-inline' value=${currentdate}>`);
// $('.times').append("<h6 class='timeupdate ml-1 d-inline'>" + currenttime + "</h6>");
$('#startdate').calendarsPicker({ calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});
$('#startdate').attr('class','text-center ml-2');
$('#startdate').val(currentdate);