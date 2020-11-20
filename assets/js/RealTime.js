$(() => {

    // Success Function
    const successMsg = (msg) => {
        $(".notificationSuccess")
            .html(
                `
 <div class="cancelNotificationSuccess text-white" id="cancelNotificationSuccess">x</div>
<audio autoplay class="d-none">
<source src="
/assets/sounds/notification.mp3" type="audio/mpeg">
</audio>
<h4 class="text-white">إشعار</h4>
<p class="mb-0 text-white" style="font-size: 14px">${msg}</p>
 `
            )
            .show(100)
            .delay(5000)
            .hide(100);
    }


    // Error Function
    const errorMsg = (msg) => {
        $(".notificationError")
            .html(
                `
 <div class="cancelNotificationError text-white" id="cancelNotificationError">x</div>
<audio autoplay class="d-none">
<source src="
/assets/sounds/notification.mp3" type="audio/mpeg">
</audio>
<h4 class="text-white">إشعار</h4>
<p class="mb-0 text-white" style="font-size: 14px; color: white">${msg}</p>
 `
            )
            .show(100)
            .delay(5000)
            .hide(100);
    }
  // Connection to Socket
  const socket = io("http://socket.wezara.me");

    // If socket is connected
    socket.on("connect", () => {
        console.log("Connection to Socket");
        fetch('/request/socketID', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ socketID: socket.id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode === 500) {
                    errorMsg(data.message);
                    window.location.reload();
                } else {
                    errorMsg(data.message);
                }
            })
            .catch((err) => {
                console.error(err.message);
            });
    });

    // If socket is disconnected
    socket.on("disconnect", () => {
        console.log("Disconnected from Socket");
    });

    // If socket is reconnected
    socket.on("reconnect", function () {
        setTimeout(() => {
            console.log("Reconnection to Socket");
        }, 4000);
    });

    // If socket is reconnect_failed
    socket.on("reconnect_failed", function () {
        console.log("Reconnection has been failed");
        window.location.reload();
    });

    // Recieve acceptance Notification
    socket.on("acceptance", (data) => {
        console.log(data);
        if (data.acceptance === true) {
            successMsg(data.message);
            setTimeout(() => {
                window.location.assign('/requests');
            }, 6000);
        } else if (data.acceptance === false) {
            errorMsg(data.message);
            setTimeout(() => {
                window.location.assign('/profile');
            }, 6000);
        } else console.log('Whats Up!');

    });

    // Handle Error from Server
    socket.on("error", (data) => {
        console.log(data.errMessage);
    });
});