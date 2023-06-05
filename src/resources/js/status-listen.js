window.Echo.channel("order-status.")
    .listen(".order.status.event", (e) => {
        console.log(e);
    });
