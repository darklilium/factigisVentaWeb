
function AllCapitalizeString(str) {
  return str.replace(/\w\S*/g, function(mystr) {
    return mystr.charAt(0).toUpperCase() + mystr.substr(1).toLowerCase();
  });
}

export default AllCapitalizeString;
