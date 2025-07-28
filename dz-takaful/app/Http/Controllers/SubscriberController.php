<?php
namespace App\Http\Controllers;

use App\Http\Requests\CreateSubscriberRequest;
use App\Mail\WelcomeSubscriber;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class SubscriberController extends Controller
{
    public function create(CreateSubscriberRequest $request)
    {
        $subscriber = Subscriber::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Mail::to($subscriber->email)->send(new WelcomeSubscriber($subscriber));

        return response()->json([
            'message' => 'تم تسجيل المشترك بنجاح',
            'subscriber' => $subscriber,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth('subscriber')->attempt($credentials)) {
            return response()->json(['message' => 'بيانات الدخول غير صحيحة'], 401);
        }

        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'token' => $token,
        ]);
    }

    public function logout()
    {
        auth('subscriber')->logout();

        return response()->json([
            'message' => 'تم تسجيل الخروج بنجاح',
        ]);
    }
}
