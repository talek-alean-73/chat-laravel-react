<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Message;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Log;

class ChatsController extends Controller
{
    

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();   //where('id', '!=', auth()->user()->id)->get();
       // $pol1=User::find(1);
     //   $is_active = $pol1->active;
        
        return view('chatApp',compact('users'));
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    // public function fetchMessages()
    // {
    //     return Message::with('user')->get();
    // }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        
        $user = Auth::user();
        

        

        if ($request->has('message')){
            
            $data=$request->get('message');
            $numChannel=$request->get('numChannel');

           $message = $user->messages()->create([
             'message' => $data
             ]);

            $newMessage=new MessageSent($user,$message,$numChannel);
            broadcast($newMessage);//->toOthers();
            //broadcast(new MessageSent($user,$message,$numChannel))->toOthers();
            return ['status' => 'Message OK'];
            
        }
        
        

        return ['status' => 'Message Error'];
    }
}
