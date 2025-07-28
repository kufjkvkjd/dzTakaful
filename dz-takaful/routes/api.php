<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [SubscriberController::class, 'create']);      // تسجيل مستخدم جديد
Route::post('/login', [SubscriberController::class, 'login']);          // تسجيل الدخول

Route::middleware('auth:subscriber')->group(function () {

    Route::post('/logout', [SubscriberController::class, 'logout']);

    Route::post('/registerProfile', [ProfileController::class, 'createProfile']);
    Route::put('/updateProfile', [ProfileController::class, 'updateProfile']);
    Route::delete('/deleteProfile', [ProfileController::class, 'deleteProfile']);
    Route::get('/showProfile', [ProfileController::class, 'showProfile']);

    Route::get('/profiles', [ProfileController::class, 'index']);
});
