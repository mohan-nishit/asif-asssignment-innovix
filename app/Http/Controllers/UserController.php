<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use JWTAuth;



class UserController extends Controller
{
    public function register(Request $request){
        try{
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }
                
                $user = User::create([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                ]);
        
                return response()->json(['user' => $user, 'message' => 'User Registred successfully'], 201);
        }
        catch (\Exception $e) {$e->getMessage();
            return response()->json(['error' =>$e->getMessage()], 500);
        }

        
        

    }

    public function login(Request $request){
        try{
            $credentials = request(['email', 'password']);

            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            // $payload = JWTAuth::decode($token);
            // $expires_at = date('d M Y h:i', $payload->get('exp')); 
            // dd($payload->get('exp'));
            //return $this->respondWithToken($token);
            return response()->json([
                'message'=>'User loggined successfully',
                'token' => $token,
                 'expiresIn'=>3600,
                 'userId'=>JWTAuth::user()->id
                
            ]);
        }
        catch (\Exception $e) {$e->getMessage();
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
}
