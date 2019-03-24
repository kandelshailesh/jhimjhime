i=1;
var selectlocation=`<select onkeypress="addresschange(event)"  onchange="addresschange(event)"  style="text-align-last:center; text-align: center; " name="upavoktaaddress-${i}" id="upavoktaaddress-${i}" class="w-100" >`;


	$.ajax({
		url:'/allselectlist',
		type:'post',
		success:function(data)
		{
				console.log(data);
				console.log(data.locationlist);

				for(j=0;j<data.locationlist.length;j++)
				{
		 selectlocation+=`<option value='${data.locationlist[j].id}'>${data.locationlist[j].name}</option>`
		}

		selectlocation+='</select>'
			

    $('.upavoktatable').append(`<tr  class=" m-0  row text-center">
			<td id="sn"  class="col-md-1 p-0"><input type="text" class=" form-control w-100 text-center" id="upavoktaid-${i}"></td>
			<td   class="col-md-3 p-0"><input id="upavoktaname-${i}" name="upavoktaname-${i}" style="text-align-last:center;" type="text" class="form-control" autocomplete="off" /><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none list-group"></ul>
			<td  class="col-md-3 p-0"><input style="text-align-last:center;" type="text" name="upavoktacaste-${i}"  id="upavoktacaste-${i}"   class="form-control" /></td>
			<td  class="col-md-3 p-0">${selectlocation}</td>
			<td   class="col-md-2 p-0"><select onkeypress="createnew(event)" id="upavoktasex-${i}" name="upavoktasex-${i}"  type="text" style="text-align-last:center; text-align: center; " class="form-control"> <option value='0'>पुरुष</option>
            <option value='1'>महिला</option>
          </select></td>
		
		</tr>`);
}
})


// <td class="col-md-1 p-0"><button type="button" id="itemdel-${i}" class="btn btn-sm btn-danger">
//     <i class="fa fa-trash"></i> Del
// </button></td>
// $('[id^=amount]').on('keydown',function(e)
// {

	function returnnumber(value)
{
	return calendarFunctions.getNumberByNepaliNumber(value)
}
function returnnepalinumber(value)
{
	return calendarFunctions.getNepaliNumber(value)
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
	if($(`#upavoktaname-${i}`).length === 0)
  {
 
var selectlocation=`<select onkeypress="addresschange(event)"  onchange="addresschange(event)"  style="text-align-last:center; text-align: center; " name="upavoktaaddress-${i}" id="upavoktaaddress-${i}" class="w-100" >`;


	$.ajax({
		url:'/allselectlist',
		type:'post',
		success:function(data)
		{
				console.log(data);
				console.log(data.locationlist);

				for(j=0;j<data.postlist.length;j++)
				{
		 selectlocation+=`<option value='${data.locationlist[j].id}'>${data.location[j].name}</option>`
		}

		selectlocation+='</select>'
			

    $('.upavoktatable').append(`<tr  class=" m-0  row text-center">
			<td id="sn"  class="col-md-1 p-0"><input type="text" class=" form-control w-100 text-center" id="upavoktaid-${i}"></td>
			<td   class="col-md-3 p-0"><input id="upavoktaname-${i}" name="upavoktaname-${i}" style="text-align-last:center;" type="text" class="form-control" autocomplete="off" /><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none list-group"></ul>
			<td  class="col-md-3 p-0"><input style="text-align-last:center;" type="text" name="upavoktacaste-${i}"  id="upavoktacaste-${i}"   class="form-control" /></td>
			<td  class="col-md-3 p-0">${selectlocation}</td>
			<td   class="col-md-2 p-0"><select onkeypress="createnew(event)" id="upavoktasex-${i}" name="upavoktasex-${i}"  type="text" style="text-align-last:center; text-align: center; " class="form-control"> <option value='0'>पुरुष</option>
            <option value='1'>महिला</option>
          </select></td>
		
		</tr>`);
}
})
}
// }


// e.preventDefault();
	 $(`#upavoktaid-${i}`).focus();

}


function typechange(event)
{
	$("#rthno").focus();
}
function addresschange(event)
{
	event.preventDefault();
	var id= event.target.id.split('-')[1]
	$(`#upavoktasex-${id}`).focus();
}

var gc = $.calendars.instance('nepali','ne'); 
var currentdate=gc.newDate();
      var currenttime=new Date();
      var currenttime=currenttime.toLocaleTimeString();
      var random =parseInt(Math.floor((Math.random()*1000000000) +1));

      $('.dates').append("<label class='ml-1 d-inline'>"+currentdate+"</label>");
        $('.times').append("<label class='timeupdate ml-1 d-inline'>"+currenttime+"</label>");
        $('.billno').append("<label class='ml-1 d-inline'>"+random+"</label>");

    
	



$('.upavoktaaddform').on('keydown', 'input', function(e) {

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

$('.upavoktaaddform').on('submit',function(e)
{
	// alert("INserted");
	e.preventDefault();

	var userformObj=[];
	var upavoktaname = $("[id^=upavoktaname");
	var upavoktaid = $("[id^=upavoktaid");

	var upavoktacaste= $("[id^=upavoktacaste");
	var upavoktaaddress= $("[id^=upavoktaaddress");
	var upavoktasex= $('[id^=upavoktasex');
	
	for(i=0;i<upavoktaname.length;i++)
	{

	if($(upavoktaname).eq(i).val()!=='' && $(upavoktacaste).eq(i).val()!=='' && $(upavoktaaddress).eq(i).val()!==''&& $(upavoktasex).eq(i).val()!=='')
	{
	console.log("NOt");
}
else
{
	return false;
}
}
for(i=0;i<upavoktaname.length;i++)
	{
		userformObj.push([returnnumber($(upavoktaid).eq(i).val()),$(upavoktaname).eq(i).val(), $(upavoktacaste).eq(i).val(),$(upavoktaaddress).eq(i).val(),$(upavoktasex).eq(i).val()]);
		
	}
$.ajax({
	type:'post',
	url:'usersubmit',
	data:{userformObj:userformObj},
	success:function(data){
		console.log(data.result);
		console.log("Submitted");

		$('#resetuserform').click();
			$('.extraadded').remove();
		// $(".billprint").printArea({ mode: 'popup', popClose: true });

	}

});
	
	



console.log(userformObj);
	
})



// $('[id$=amount]').on('change',function(e))
// {}


$("[id^=upavoktaform]").on('click',function(e)
{
	console.log("Eh");
	var id=event.target.id.split('-')[1];
	console.log(id);
	for(var i=1;i<4;i++)
	{
				if(id==i)
				{
					if($(`.upavoktaformshow-${i}`).hasClass('d-none'))
					{
					$(`.upavoktaformshow-${i}`).removeClass('d-none');
				}
				}
				else
				{ 
					if(!$(`.upavoktaformshow-${i}`).hasClass('d-none'))
					{
						$(`.upavoktaformshow-${i}`).addClass('d-none');
				}
	}
}
})

function returnaddress(value)
{
	
var address ={'1':'झिमझिमिया गाउटोल','2':'काेटियाथान टोल','3':'शान्ति टोल','4':'बेम्तहनी टोल'}
return address[value];
}

function returnaddressvalue(value)
{
	
var address = {'झिमझिमिया गाउटोल':'1','काेटियाथान टोल':'2','शान्ति टोल':'3','बेम्तहनी टोल':'4'}
return address[value];
}


function returnsex(value)
{
	
var sex = {'0':'पुरुष','1':'महिला'};
return sex[value];
}

function returnsexvalue(value)
{
	
var sex = {'पुरुष':'0','महिला':'1'};
return sex[value];
}

$('.upavoktakhojbutton').on('click',function(e)
{
	 var upavoktakhojformObj = {};
	 $('.appendsearch').html('');
	var upavoktakhojdata= $('.upavoktakhojform').serializeArray();
    
    console.log(upavoktakhojdata);
    $.each(upavoktakhojdata, function (i, input) {
        upavoktakhojformObj[input.name] = input.value;
    });
console.log(upavoktakhojformObj);
    if(!$.isEmptyObject(upavoktakhojformObj))
    {
    console.log(upavoktakhojformObj);
   $.ajax({
   	type:'post',
    url:'upavoktakhoj',
    data:{upavoktakhojformObj:upavoktakhojformObj},
    success:function(data)
    {
    	console.log(data.result);
    	var result=data.result;
    	if(result.length>0)
    	{

    	$('.appendsearch').html('');
    	$('.appendsearch').append(`<p class="text-center text-danger mt-2"> जम्मा रेकर्ड ${returnnepalinumber(result.length)} </p> <br/>`);


    	$('.appendsearch').append(`<table border="1" class=" upavoktatablekhoj  table-sm">
                        <tr class=" m-0  row text-center">
                                               
                            <th class="col-md-1">उपभाेक्ता नं</th>
                            <th class="col-md-3">नाम</th>
                            <th class="col-md-2">थर </th>
                            <th class="col-md-2">ठेगाना</th>
                            <th class="col-md-2">लिङ्ग</th>
                            <th class="col-md-2"></th>
                        </tr>`);
                  
    		for(var i=0;i<result.length;i++)
    		{
    			$('.upavoktatablekhoj').append(`<tr id="user-${result[i].userid}" class=" m-0 extraadded  row text-center">
			<td class="col-md-1">${returnnepalinumber(result[i].userid)}</td>
			<td   class="col-md-3" id='fnamekhoj-${result[i].userid}'>${result[i].fname}</td>
			<td  class="col-md-2 " id='lnamekhoj-${result[i].userid}'>${result[i].lname}</td>
			<td class="col-md-2 p-0 " >
			<input class='w-100' id='addresskhoj-${result[i].userid}' value='${returnaddress(result[i].address)}' >

			<select onkeypress="addresschange(event)"  onchange="addresschange(event)"  style="text-align-last:center; display:none; text-align: center; " name="upavoktaaddress-${result[i].userid}" id="upavoktaaddress-${result[i].userid}" class="w-100" >
			
			<option value='1'>झिमझिमिया गाउटोल</option>
			<option value='2'>काेटियाथान टोल</option>
			<option value='3'>शान्ति टोल</option>
			<option value='4'>बेम्तहनी टोल</option>
		
        </select></td>
			<td class="col-md-2 p-0 ">
			<input class='w-100' id='sexkhoj-${result[i].userid}' value=${returnsex(result[i].sex)}>

			<select  id="upavoktasex-${result[i].userid}" name="upavoktasex-${result[i].userid}"  type="text" style="text-align-last:center; text-align: center; display:none; " class="form-control"> <option value='0'>पुरुष</option>
            <option value='1'>महिला</option>
          </select></td>
			<td class="col-md-2"><button  onclick="deluser(event)" class="deletebutton-${result[i].userid} border-0  bg-danger btn-sm" id="${result[i].userid}"><i class="fa text-white fa-trash"></i></button><button class="modifybutton-${result[i].userid}  bg-success btn-sm ml-1"  onclick="modifyuser(event)" id="${result[i].userid}"><i class="fa fa-edit text-white"></i></button><a href="#" class="modifysubmitbutton-${result[i].userid} btn-sm border-0 bg-white" style="display:none;" onclick="javascript:modifyusersubmit(event)" id="${result[i].userid}"><i class="fa fa-paper-plane text-success"></i></a><button style="display:none;" onclick="cancel(event)" class="cancel-${result[i].userid} ml-2 border-0 bg-white" id="${result[i].userid}"><i class="text-danger fa fa-times"></i></button></td>
			</tr>`);
    		}

    		$('.appendsearch').append('<table>');
    	}
    	else
    	{ 
    		$('.appendsearch').html('');

    		$('.appendsearch').append(`<p class="text-center">डाटा उपलब्ध भएन</p>`);
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
		url:'upavoktadel',
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
	$(`select#upavoktaaddress-${id}`).show();
	$(`select#upavoktasex-${id}`).show();

   	$(`select#upavoktaaddress-${id}`).val(returnaddressvalue($(`#addresskhoj-${id}`).val())).change();
   	$(`select#upavoktasex-${id}`).val(returnsexvalue($(`#sexkhoj-${id}`).val())).change();
	$(`select#upavoktasex-${id}`).show();
	$(`#addresskhoj-${id}`).hide();
	$(`#sexkhoj-${id}`).hide();



	$(`#fnamekhoj-${id}`).attr('contenteditable','true');
	$(`#lnamekhoj-${id}`).attr('contenteditable','true');
	// $(`#addresskhoj-${id}`).attr('contenteditable','true');
	// $(`#sexkhoj-${id}`).attr('contenteditable','true');
	$(`.deletebutton-${id}`).hide();
	$(`.modifybutton-${id}`).hide();
	$(`.modifysubmitbutton-${id}`).show();	// $(`#user-${id}`).attr('contenteditable','true');
	$(`.cancel-${id}`).show();

}

function modifyusersubmit(event)
{
    event.preventDefault();

// $(`.postwrite-${id}`).text(returnpost($(`select#postkhoj-${id}`).val()));
// 	$(`.postwrite-${id}`).show();	
// 	$(`.samitiwrite-${id}`).show();
// 	console.log($(`select#postkhoj-${id}`).val());
// 	$(`.postwrite-${id}`).text(returnpost($(`select#postkhoj-${id}`).val()));
// 	$(`.samitiwrite-${id}`).text(returnsamiti($(`select#samitikhoj-${id}`).val()));
// 	  $(`select#postkhoj-${id}`).hide();
// 	$(`select#samitikhoj-${id}`).hide();


	var id = event.target.id;
	$(`#addresskhoj-${id}`).show();

	$(`#sexkhoj-${id}`).show();	

	$(`#sexkhoj-${id}`).val(returnsex($(`select#upavoktasex-${id}`).val()));
		$(`#addresskhoj-${id}`).val(returnaddress($(`select#upavoktaaddress-${id}`).val()));

	$(`select#upavoktaaddress-${id}`).hide();
	$(`select#upavoktasex-${id}`).hide();

		var data1=[[$(`#fnamekhoj-${id}`).text()],[$(`#lnamekhoj-${id}`).text()],[returnaddressvalue($(`#addresskhoj-${id}`).val())],[returnsexvalue($(`#sexkhoj-${id}`).val())],[id]];

    console.log($(`#fnamekhoj-${id}`));
    console.log(id);


    console.log(data1);
	$.ajax({
		type:'post',
		url:'modifyusersubmit',
		data:{data1:data1},
		success:function(data){
			$(`#fnamekhoj-${id}`).attr('contenteditable','false');
	$(`#lnamekhoj-${id}`).attr('contenteditable','false');
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

$(`#addresskhoj-${id}`).show();
$(`#fnamekhoj-${id}`).attr('contenteditable','false');
	$(`#lnamekhoj-${id}`).attr('contenteditable','false');
	$(`#sexkhoj-${id}`).show();	
$(`select#upavoktaaddress-${id}`).hide();
	$(`select#upavoktasex-${id}`).hide();}



	$('#locationModal').on('shown.bs.modal', function (e) {
  // do something...
  $('#locationModal').find('[autofocus]').focus();
})




$('.upavoktalocations').on('submit',function(e)
{
	// alert("Entered");
	// e.preventDefault();
	e.preventDefault();
	var formdata= $('.upavoktalocations').serializeArray();

	var formobj=[];
	$.each(formdata,function(i,input)
	{
		formobj.push(input.value);
	})
	console.log(formobj);
$.ajax({
	url:'/upavoktalocationcreate',
	type:'post',
	data:{formobj:formobj},
	success:function(data)
	{
	alert("ठेगाना जोडियो");
	$('.upavoktalocations').trigger('reset');

	$('#locationModal').find('button').get(0).click();
  window.location.reload();


	// $('#titleModal').find('button.close').click();
	// $('#titleModal').modal("hide");
	// $('#titleModal').hide();
	// $('body').removeClass('modal-open')
	// $('div.modal-backdrop').removeClass('show');
	// $('.samitititles').trigger('reset');

	},
	error:function(data)
	{
	console.log(data.responseText);
	alert(data.responseText);

	// $('#titleModal').modal('show');
	// alert("यो पद पहिल्यै छ");
	}

})

	// e.preventDefault();

})
