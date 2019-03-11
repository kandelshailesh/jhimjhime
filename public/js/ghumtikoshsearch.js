function returnnumber(value) {
return calendarFunctions.getNumberByNepaliNumber(value)
}

// function returnnepalinumber(value) {
// return calendarFunctions.getNepaliNumber(value)
// }

function returnnepalinumber(value)
{
    value=value.toString();
    var count= value.split('.');
    console.log(count.length);
    console.log(count[0]);
    var num1; var num2; var length= count.length;
    if(length>1)
    {
        num1= calendarFunctions.getNepaliNumber(parseInt(count[0]));
        num2= calendarFunctions.getNepaliNumber(parseInt(count[1]));
        value=num1+'.'+num2;
    }
    else
        {
         value=calendarFunctions.getNepaliNumber(parseInt(value))
     } return value;
 }


$.ajax({
    url: '/ghumtikoshsearchdata',
    type: 'post',
    data: { userid: 1 },
    success: function(data) {
        // var data= JSON.parse(data);
        console.log(data.result.length);
        console.table(data.result[0]);
        // 			flname
        // totalamount
        // paidamount
        // remainingamount
        // paymentdate
    for(i=0;i<data.result.length;i++)
    {
        var paidamount = data.result[i].totalamount - data.result[i].remainingamount;
        console.log(paidamount)
        var totalamount = data.result[i].totalamount;
        console.log(totalamount);
        $("table.ghumtikoshsearchtable").append(`<tr class="row m-0">
		<td class="col-md-2">${returnnepalinumber(data.result[i].userid)} </td>

		<td class="col-md-3">${data.result[i].fname +' '+ data.result[i].lname} </td>
		<td class="col-md-3">${returnnepalinumber(data.result[i].totalamount)}</td>	
		<td class="col-md-2">${returnnepalinumber(paidamount)}</td>	

		<td class="col-md-2">${returnnepalinumber(data.result[i].remainingamount)}</td>
		</tr>`);
    }
    }




})
