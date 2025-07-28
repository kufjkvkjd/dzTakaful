<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscriber_id')->unique()->constrained('subscribers');
            $table->enum('role', ['admin', 'individual', 'professional', 'entreprise'])->default('individual');

            $table->string('address')->nullable();
            $table->string('phone')->nullable();

            $table->string('national_id_number')->nullable();
            $table->string('establishment_name')->nullable();
            $table->string('nrc')->nullable();
            $table->string('national_card_image')->nullable();
            $table->string('commercial_register_copy')->nullable();

            $table->string('rib')->nullable();
            $table->string('medical_report')->nullable();

            $table->string('activity_proof_documents')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
