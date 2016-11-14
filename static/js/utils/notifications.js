function notifications(message, type, myClass){
  switch (type) {
  //LOGIN NOTIFICATIONS
    case 'Login_Error':
      $('.notification-login')
      .empty()
      .css('visibility','visible')
      .append('<h4 style="margin: 0;">'+message+'</h4>');
      break;

    case 'Login_Failed':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<h4 style="margin: 0;">'+message+'</h4>')
      break;

    case 'Login_Success':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<h4 style="margin: 0;">'+message+'</h4>')
      break;

  // SEARCHBAR NOTIFICATIONS
    case 'Searchbar_Isolated':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','lightgreen')
      break;

    case 'Searchbar_Massive':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','lightcoral')
      break;

    case 'Searchbar_NIS_Without_Problems':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','powderblue')
      break;

    case 'Searchbar_Without_SED':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','red')
      break;

    case 'Searchbar_NIS_Not_Found':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','yellow')
      break;

    case 'Searchbar_Error':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong class="searchbar__notifications-text">'+message+'</strong>')
      .css('background-color','yellow')
      break;

    //AP MODULE CASES
    case 'AP_ROTULO_NOTFOUND':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong>'+message+'</strong>')
      .css('background-color','lightcoral')
      break;

    case 'AP_ROTULO_VALUENOTFOUND':
      $(myClass)
      .empty()
      .css('visibility','visible')
      .append('<strong>'+message+'</strong>')
      .css('background-color','yellow')
      break;

    default:


  }
}

export {notifications};
