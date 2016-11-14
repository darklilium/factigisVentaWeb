import React from 'react';
import {notifications} from '../utils/notifications';
import { factigisLogin } from '../services/login-service';
import cookieHandler from 'cookie-handler';

class LoginApp extends React.Component {
  constructor(){
    super();

  }

  onClick(){
    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;
    //If they dont put any username or password
    if (userValue=="" || passValue==""){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    //For domain users
    if (userValue.includes('vialactea\\')){
      console.log("Trying to access REACT_FACTIGIS_DESA_DASHBOARD");
      factigisLogin(userValue, passValue);
      return;

    }else {
      console.log("Trying to access REACT_FACTIGIS_DESA_DASHBOARD");
      userValue =  'vialactea\\'+this.refs.username.value;
      factigisLogin(userValue, passValue);
    }
  }

  componentWillMount(){
    localStorage.removeItem('token');
    cookieHandler.remove('myLetter');
    cookieHandler.remove('usrprfl');
    cookieHandler.remove('usrprmssns');
    cookieHandler.remove('wllExp');
    cookieHandler.remove('tkn');
  }

  componentDidMount(){
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    //let randomPicSrc = "css/images/login_images/loginwall"+ randomPicNumber+ ".jpg"; //prod
    let randomPicSrc = "dist/css/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
    $('.login_wrapper').css("background-image", "url("+randomPicSrc+")");
  }

  handleKeyPress(target){
    if(target.charCode==13){

        this.onClick();

    }
  }

  render(){

      return (

          <div className="login_wrapper">
            <section id="myLogin" className="myLogin">
              <div className="login_wrapper_content">
                <article className="login_article">
                  <input className="login__input" ref="username" type="text" placeholder="miusuario"  />
                  <input className="login__input" ref="password" type="password" placeholder="password" onKeyPress={this.handleKeyPress.bind(this)}  />

                  <button onClick={this.onClick.bind(this)}
                    className="login__submit" title="Entrar " type="button" >
                    <span><i className="fa fa-plus"></i> Entrar</span>
                  </button>

                </article>
                <aside className="login_aside">
                    <div className="aside_div">
                      <img className="login_aside__img" />
                    </div>
                </aside>
              </div>
            </section>
            <footer className="login_footer">
              <h4 className="notification-login backgroundColorNotification"></h4>
              <div className="login_footer__div">
                  <img className="login_footer__img" src="dist/css/images/chq_i.png" />
                  <p className="footer__div__p">&copy; 2016 Pérdidas y GIS</p>
              </div>
            </footer>
          </div>

    );
  }
}

export default LoginApp;
