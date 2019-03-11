
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
		    
		}
		})
	}
})