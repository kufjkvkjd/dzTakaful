<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Mail\DeleteSubscriberProfile;
use App\Mail\NewSubscriberProfile;
use App\Mail\UpdateSubscriberProfile;
use App\Models\Profile;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function createProfile(CreateProfileRequest $request)
    {
        $subscriberId = auth('subscriber')->id();
        $subscriber = Subscriber::findOrFail($subscriberId);

        if (Profile::where('subscriber_id', $subscriberId)->exists()) {
            return response()->json(['error' => 'لديك بروفايل مسبقًا'], 409);
        }

        $data = $request->validated();
        $data['subscriber_id'] = $subscriberId;

        if ($request->hasFile('national_card_image')) {
            $data['national_card_image'] = $request->file('national_card_image')->store('cards', 'public');
        }

        if ($request->hasFile('commercial_register_copy')) {
            $data['commercial_register_copy'] = $request->file('commercial_register_copy')->store('registers', 'public');
        }

        if ($request->hasFile('medical_report')) {
            $data['medical_report'] = $request->file('medical_report')->store('medical_reports', 'public');
        }

        if ($request->hasFile('activity_proof_documents')) {
            $data['activity_proof_documents'] = $request->file('activity_proof_documents')->store('activity_proofs', 'public');
        }

        $profile = Profile::create($data);
        Mail::to($subscriber->email)->send(new NewSubscriberProfile($subscriber));

        return response()->json(['message' => 'تم إنشاء البروفايل', 'profile' => $profile], 201);
    }

    public function showProfile()
    {
        $subscriberId = auth('subscriber')->id();
        $profile = Profile::where('subscriber_id', $subscriberId)->firstOrFail();
        return response()->json($profile, 200);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $subscriberId = auth('subscriber')->id();
        $subscriber = Subscriber::findOrFail($subscriberId);

        $profile = Profile::where('subscriber_id', $subscriberId)->firstOrFail();
        $profileData = $request->validated();

        if ($request->hasFile('commercial_register_copy')) {
            if ($profile->commercial_register_copy && Storage::disk('public')->exists($profile->commercial_register_copy)) {
                Storage::disk('public')->delete($profile->commercial_register_copy);
            }
            $profileData['commercial_register_copy'] = $request->file('commercial_register_copy')->store('registers', 'public');
        }

        if ($request->hasFile('national_card_image')) {
            if ($profile->national_card_image && Storage::disk('public')->exists($profile->national_card_image)) {
                Storage::disk('public')->delete($profile->national_card_image);
            }
            $profileData['national_card_image'] = $request->file('national_card_image')->store('cards', 'public');
        }

        if ($request->hasFile('medical_report')) {
            if ($profile->medical_report && Storage::disk('public')->exists($profile->medical_report)) {
                Storage::disk('public')->delete($profile->medical_report);
            }
            $profileData['medical_report'] = $request->file('medical_report')->store('medical_reports', 'public');
        }

        if ($request->hasFile('activity_proof_documents')) {
            if ($profile->activity_proof_documents && Storage::disk('public')->exists($profile->activity_proof_documents)) {
                Storage::disk('public')->delete($profile->activity_proof_documents);
            }
            $profileData['activity_proof_documents'] = $request->file('activity_proof_documents')->store('activity_proofs', 'public');
        }

        $profile->update($profileData);
        Mail::to($subscriber->email)->send(new UpdateSubscriberProfile($subscriber));

        return response()->json(['message' => 'تم التحديث', 'updatedProfile' => $profile], 200);
    }

    public function deleteProfile()
    {
        $subscriberId = auth('subscriber')->id();
        $subscriber = Subscriber::findOrFail($subscriberId);
        $profile = Profile::where('subscriber_id', $subscriberId)->firstOrFail();

        // حذف جميع الملفات إن وُجدت
        foreach (['national_card_image', 'commercial_register_copy', 'medical_report', 'activity_proof_documents'] as $field) {
            if ($profile->$field && Storage::disk('public')->exists($profile->$field)) {
                Storage::disk('public')->delete($profile->$field);
            }
        }

        $profile->delete();
        Mail::to($subscriber->email)->send(new DeleteSubscriberProfile($subscriber));

        return response()->json(['message' => 'تم حذف البروفايل'], 200);
    }

    public function index()
    {
        $user = auth('subscriber')->user();

        if (!$user || !$user->profile || $user->profile->role !== 'admin') {
            return response()->json(['message' => 'غير مصرح لك'], 403);
        }

        return response()->json(Profile::all(), 200);
    }
}
