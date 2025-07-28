<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $profile = auth('subscriber')->user()?->profile;

        $role = $this->input('role') ?? $profile?->role;

        $rules = [
            'role' => 'sometimes|in:admin,individual,professional,entreprise',
            'address' => 'sometimes|string|max:100',
            'phone' => 'sometimes|string|min:5|max:20',
        ];

        if ($role === 'individual') {
            $rules['national_id_number'] = 'sometimes|string|min:5|max:30';
            $rules['national_card_image'] = 'sometimes|mimes:pdf,jpg,jpeg,png|max:2048';
            $rules['rib'] = 'sometimes|string|max:30';
            $rules['medical_report'] = 'sometimes|mimes:pdf,jpg,jpeg,png|max:2048';
        }

        if ($role === 'professional') {
            $rules['national_id_number'] = 'sometimes|string|min:5|max:30';
            $rules['national_card_image'] = 'sometimes|mimes:pdf,jpg,jpeg,png|max:2048';
            $rules['establishment_name'] = 'sometimes|string|max:50';
            $rules['nrc'] = 'sometimes|string|max:50';
            $rules['commercial_register_copy'] = 'sometimes|mimes:pdf|max:2048';
        }

        if ($role === 'entreprise') {
            $rules['establishment_name'] = 'sometimes|string|max:50';
            $rules['nrc'] = 'sometimes|string|max:50';
            $rules['commercial_register_copy'] = 'sometimes|mimes:pdf|max:2048';
            $rules['activity_proof_documents'] = 'sometimes|mimes:pdf,jpg,jpeg,png|max:2048';
        }

        return $rules;
    }
}
