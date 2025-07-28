<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
         protected $fillable = [
                'subscriber_id',
                'role',
                'address',
                'phone',
                'national_id_number',
                'establishment_name',
                'nrc',
                'national_card_image',
                'commercial_register_copy',
                'rib',
                'medical_report',
                'activity_proof_documents'
            ];



        public function subscriber()
        {
            return $this->belongsTo(Subscriber::class);
        }
}
