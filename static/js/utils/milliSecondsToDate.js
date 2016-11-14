function formatDate(badDate){
  //console.log(badDate);
      if(badDate == null){
        return str="";
      }
      if(typeof badDate === 'number'){
        badDate = new Date(badDate);
      }

      var d = new Date();

      d.setDate(badDate.getUTCDate());
      d.setMonth(badDate.getUTCMonth());
      d.setYear(badDate.getUTCFullYear());
      d.setHours(badDate.getUTCHours());
      d.setMinutes(badDate.getUTCMinutes());
      d.setSeconds(badDate.getUTCSeconds());
      d.setMilliseconds(badDate.getUTCMilliseconds());


      var str = "day/month/year, hour:minute:second"
        .replace('day', d.getDate() <10? '0'+ d.getDate() : d.getDate())
        .replace('month', d.getMonth()+1 <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
        .replace('year', d.getFullYear())
        .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
        .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
        .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());


    return str;
}

function getFormatedDateNow(){
  var d = new Date();

  var str = "day/month/year, hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate() : d.getDate())
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log(str);
  return str;
}

export default formatDate;
export {getFormatedDateNow};
