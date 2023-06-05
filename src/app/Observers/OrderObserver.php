<?php

namespace App\Observers;

use App\Events\OrderStatusEvent;
use App\Models\Order;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        event(new OrderStatusEvent($order->id, $order->session_id,$order->status));
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        event(new OrderStatusEvent($order->id, $order->session_id,$order->status));
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
