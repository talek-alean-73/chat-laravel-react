import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pusher from 'pusher-js';
import _ from 'lodash';
//require('dotenv').load();

const ADMIN_NAME='Админ.by'
const ADMIN_ID=1

export default class ChatApp extends Component {
    constructor(props) {
        super();
        this.state = {
          message:[],
        //   messageAll:{  nameChanal:"",
        //                 nameUser:"",
        //                 massage:[],
                        
        //             },
          oneMessage1:"",
          oneMessage2:"",
          oneMessage3:"",
         // oneMessageName:[],
         // oneMessage:{},
          //channel:[]
        };
        this.localHost="";
        this.onClick = this.onClick.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.userInputMessage = this.userInputMessage.bind(this);
        
        this.user=null;
        this.users=null;
        
        
    }
    componentDidMount()
    {
        this.localHost=this.props.localHost;
        
        this.user=JSON.parse(this.props.user);
        const users=JSON.parse(this.props.users);
       // console.log("Mounted component message= ",this.localHost);
        // Enable pusher logging - don't include this in production
      //  Pusher.logToConsole = true;

        let pusher = new Pusher('2c9ad856485948a8ecc6', {
        cluster: 'eu',
        forceTLS: true
        });
        const this2 = this;
        if (this.user.name===ADMIN_NAME){
            _.map(users,(item,index)=>{
               // console.log('users=',user1)
                let channel = pusher.subscribe(`my-channel${item.id}`);
                channel.bind('my-event', function(data) { 
            // console.log('0000000000000  data=',data)
                // console.log('0000000000000  message=',data.message)
                // const infoMessage=data.message;
                const message = this2.state.message;
                message.push(data.message);
              //  this2.setState({message:message})
                this2.setState(() => { return {message:message}});
               // this2.setState((state) => { return {channel:{...state.channel,infoMessage}}})
                }); 
                return null
            })

        }else{
            let channel = pusher.subscribe(`my-channel${this.user.id}`);
            channel.bind('my-event', function(data) { 
                // console.log('0000000000000  data=',data)
               // console.log('00000300000000  message=',data.message)
                const message = this2.state.message;
                message.push(data.message);

                this2.setState(() => { return {message:message}});
            })
        }
        
        
    }
    async sendMessage(numUser){
        const url=`${this.localHost}messages`;
        await Promise.resolve(axios({
            method: 'POST',
            url: url,
            data:{message:this.state[`oneMessage${numUser}`],numChannel:`${numUser}`}

    
        }).then((res)=>{
            this.setState(() => { return {[`oneMessage${numUser}`]:""}})

        }))
    }
    onClick(numUser){
            this.sendMessage(numUser);
    }

    changeInput(e,numUser){
        const value=(e.target.value)
                        ?e.target.value
                        :"";
        this.setState(() => { return {[`oneMessage${numUser}`]:value}});
    }
    userInputMessage(){
        
        const users=JSON.parse(this.props.users);
        const user=JSON.parse(this.props.user);

        if(user.id===ADMIN_ID){

            return _.map(users,(item,index)=>{


               // let sss=this.state.oneMessage1
                let value =this.state[`oneMessage${item.id}`];
                return <div className=" mt-3" key={index}>
                                <div >
                                    Для пользователя № {item.id}
                                </div>

                                <input  type="text" 
                                        name="message" 
                                        className="form-control input-sm" 
                                        placeholder="..." 
                                        onChange={(e)=>this.changeInput(e,item.id)}
                                        value={value}  />

                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-sm"  
                                            onClick={(e)=>this.onClick(item.id)}>
                                        Send
                                    </button>
                                </span>

                            
                        </div>

            })
        }else{
            
            let value =this.state[`oneMessage${user.id}`];
            return <div className="">
                                <div className="mt-3"> 
                                    Для администратора
                                </div>
                                <input  type="text" 
                                        name="message" 
                                        className="form-control input-sm" 
                                        placeholder="..."
                                        onChange={(e)=>this.changeInput(e,user.id)} 
                                        value={value } />

                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-sm"  
                                            onClick={(e)=>this.onClick(user.id)}>
                                        Send
                                    </button>
                                </span>
                    </div>
        }


    }
    render() {
        const users=JSON.parse(this.props.users);
       // console.log('spisok=',spisok)


        return (
          <div className="container border border-danger">
              <p> 
                  <b>Список пользователей</b>
                </p>
            {
                _.map(users,(item,index)=>{
                    return <p key={index}>
                                {item.name}  {'это Пользователь № '}{item.id}
                            </p> 

                })
            }
            <div className="border border-dark">
                <p> 
                  <b>Чат:</b>
                </p>
                {
                this.state.message.map((msg,index)=>{

                    const classN=(msg.user_id===this.user.id)
                        ?" ml-0 mr-auto "
                        :" ml-auto mr-0";
                    const userText=(msg.user_id===this.user.id)
                        ?`мое сообщение:  ${msg.message} `
                        :`От пользователя № ${msg.user_id}  сообщение: ${msg.message}`;

                    return( 
                        <div className="d-flex flex-row " key={index}>
                            <div className={`d-flex mt-1 mb-1 ${classN}`} >
                                 {userText}
                            </div> 
                        
                        </div>
                        
                                
                    )
                })
                }
            </div>
            
            
                    {/* <div className="input-group">
                        <input  type="text" name="message" className="form-control input-sm" placeholder="Type your message here..."
                        onChange={(e)=>this.changeInput(e,1)} value={value1 } />

                        <span className="input-group-btn">
                            <button className="btn btn-primary btn-sm"  onClick={(e)=>this.onClick(1)}>
                                Send
                            </button>
                        </span>
                    </div>
                    <div className="input-group">
                        <input  type="text" name="message" className="form-control input-sm" placeholder="Type your message here..."
                        onChange={(e)=>this.changeInput(e,2)} value={value2 } />

                        <span className="input-group-btn">
                            <button className="btn btn-primary btn-sm"  onClick={(e)=>this.onClick(2)}>
                                Send
                            </button>
                        </span>
                    </div>
                    <div className="input-group">
                        <input  type="text" name="message" className="form-control input-sm" placeholder="Type your message here..."
                        onChange={(e)=>this.changeInput(e,3)} value={value3 } />

                        <span className="input-group-btn">
                            <button className="btn btn-primary btn-sm"  onClick={(e)=>this.onClick(3)}>
                                Send
                            </button>
                        </span>
                    </div> */}
                    {this.userInputMessage()}
          </div>
        );
    }
}

ChatApp.defaultProps = {
    user:'',
//    seepaginate:true,
    users:[],
    localHost:"http://localhost:8000/"
};
