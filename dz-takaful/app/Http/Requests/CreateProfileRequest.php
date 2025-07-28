<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $role = $this->input('role');

        $rules = [
            'role' => 'required|in:admin,individual,professional,entreprise',
            'address' => 'required|string|max:100',
            'phone' => 'required|string|min:5|max:20',
        ];

        if ($role === 'individual') {
            $rules['national_id_number'] = 'required|string|min:5|max:30';
            $rules['national_card_image'] = 'required|mimes:pdf,jpg,jpeg,png|max:2048';
            $rules['rib'] = 'required|string|max:30';
            $rules['medical_report'] = 'required|mimes:pdf,jpg,jpeg,png|max:2048';
        }

        if ($role === 'professional') {
            $rules['national_id_number'] = 'required|string|min:5|max:30';
            $rules['national_card_image'] = 'required|mimes:pdf,jpg,jpeg,png|max:2048';
            $rules['establishment_name'] = 'required|string|max:50';
            $rules['nrc'] = 'required|string|max:50';
            $rules['commercial_register_copy'] = 'required|mimes:pdf|max:2048';
        }

        if ($role === 'entreprise') {
            $rules['establishment_name'] = 'required|string|max:50';
            $rules['nrc'] = 'required|string|max:50';
            $rules['commercial_register_copy'] = 'required|mimes:pdf|max:2048';
            $rules['activity_proof_documents'] = 'required|mimes:pdf,jpg,jpeg,png|max:2048';
        }

        return $rules;
    }
}
