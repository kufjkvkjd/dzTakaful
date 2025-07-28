<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Subscriber extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // same as $this->id;
    }

    /**
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
