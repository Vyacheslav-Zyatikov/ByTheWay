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
        Schema::create('dish', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('section')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('image')->nullable();
            $table->decimal('price', $precision = 11, $scale = 2);
            $table->boolean('availability')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dish');
    }
};
