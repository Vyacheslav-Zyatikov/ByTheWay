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
        Schema::create('dish_session', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('session')->onDelete('cascade');
            $table->foreignId('dish_id')->constrained('dish')->onDelete('cascade');
            $table->decimal('price', $precision = 11, $scale = 2);
            $table->unsignedTinyInteger('count');
            $table->decimal('value', $precision = 11, $scale = 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dish_session');
    }
};
