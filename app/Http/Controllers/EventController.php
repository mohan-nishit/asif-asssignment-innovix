<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Ticket;
use JWTAuth;
use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;



class EventController extends Controller
{
    function list(Request $request){
        $query = $request->query('pagesize');
        $data = Event::orderBy("created_at","desc")->paginate($query);
        return response()->json($data);
    }

    public function details($event_id){
        $data = Event::where('id',$event_id)->first();
        return response()->json(['data'=>$data]);
    }

    public function book($event_id){
        $data = Event::where('id',$event_id)->first();
        $current_date = now()->format('Y-m-d');
        if($data){
           Ticket::create(['event_id'=>$event_id,'user_id'=>JWTAuth::user()->id,'status'=>'active','purchase_date'=>$current_date]);
           Event::where('id', $event_id)->decrement('tickets_count');

           return response()->json(['message'=>'Ticket booked successfully']);
        }
        return response()->json(['message'=>'Event not found'],404);
    }

    public function orderList(Request $request){
        $user_id = JWTAuth::user()->id;
        $query = $request->query('pagesize');
        $data = Ticket::with('user')->with('event')->where('user_id',$user_id)->orderBy("created_at","desc")->paginate($query);
        return response()->json($data);
    }
}
