<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'session_id' => $this->session_id,
            'total' => $this->total,
            'status' => $this->status,
        ];
    }
}