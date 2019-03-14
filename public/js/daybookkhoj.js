
var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();
$('#daybookinitialdate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'})
$('#daybookfinaldate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});
$("#daybookkhoj").on('click',function(e)
{
	var initialdate = $("#daybookinitialdate").val();
	console.log(initialdate);
	var finaldate = $("#daybookfinaldate").val();
	console.log(finaldate);
	if(initialdate !== '' && finaldate !== '')
	{
		$.ajax({
			url:'/daybookkhoj',
		    type:'post',
		    data:{
		    	'initialdate':initialdate,
		    	'finaldate':finaldate
		    },
		    success:function(data)
		    {
		    console.log(data);
		    if(data.results.length>0)
{
	$('.daybookdiv').html('');
	 $('.daybookdiv').append(`<table class="table table-bordered table-hover daybooktable">
                        <tr>
                            <th> मिति</th>
                            <th> प्रकार</th>
                            <th> उपशीर्षक</th>
                            <th> मूल्य</th>

                            <th> सारांश </th>
                        </tr>
                    </table>`);
data.results.forEach(function(result)
{ 
	// console.log(result);

	
    $('.daybooktable').append(`<tr class="row-${result.transactionno}">
    <td >  ${result.paymentdate} </td>    
    <td > ${result.type} </td>
    <td> ${result.subaccount} </td>
    <td> ${result.amount} </td>
    <td> ${result.narration} </td>
   </tr> `)
});
}
else
{
	$('.daybookdiv').html('');
	$('.daybookdiv').append('<p> डाटा उपलब्ध भयन </p>');
}
}
// $('.daybooktable').append('</tr></table>');
		    
		})
		    
		}
		})
	