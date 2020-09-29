import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import ReactFunc from './Components/ReactFunc';
import ChatApp from './Components/ChatApp';


//import './index.css';







// if (document.getElementById('reactExample')) {
//   //  console.log('Example   ---');
//     var div = document.getElementById("reactExample");
//     var assetPathHost = div.getAttribute('assetPathHost');
    
//   //  var reactPages= div1.getAttribute('reactPages');
//     console.log('ReactApp   2---');

//    // ReactDOM.render(<ReactFunc assetPath={assetPath} assetPathHost={assetPathHost} reactPages={'reactPages'}  />, document.getElementById('react'));
//     ReactDOM.render(<ReactFunc  assetPathHost={assetPathHost}   />, document.getElementById('reactExample'));
// }



if (document.getElementById('chatApp')) {
  //  console.log('Example   ---');

  var div = document.getElementById("chatApp");
  var localHost = div.getAttribute('localHost');
  var user = div.getAttribute('user');
  
  var users = div.getAttribute('users');
  
  //  var reactPages= div1.getAttribute('reactPages');
    

   // ReactDOM.render(<ReactFunc assetPath={assetPath} assetPathHost={assetPathHost} reactPages={'reactPages'}  />, document.getElementById('react'));
    ReactDOM.render(<ChatApp  localHost={localHost}  user={user} users={users}/>, document.getElementById('chatApp'));
}