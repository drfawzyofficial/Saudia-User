$(() => {

	$(".messages").animate({ scrollTop: 20000000 }, "slow");

	// Our variables
	const socket = io();
	var chatSound = JSON.parse(localStorage.getItem("chatSound"));
	var roomID = localStorage.getItem("roomID");
	const pageLang = $("html").attr("lang");


	if(chatSound === null) {
		localStorage.setItem("chatSound", true);
		chatSound = true;
	} else if(chatSound === false) $(".custom-control-input").removeAttr("checked");


	// If there is a roomID, the user will join to the room and we will fetch the messages between him and Admin
	if (roomID) {
		socket.emit('joinUser', { roomID: roomID });
		socket.on('resetLocalStorage', (data) => {
			localStorage.setItem("roomID", data.roomID);
			roomID = data.roomID;
		})
		fetch('/fetchMessages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ roomID: roomID }),
		})
			.then(response => response.json())
			.then(data => {
				$.each(data, (index, data) => {
					$(".messages").append(`
		  ${ (data.isAdmin) ? `
			<div class="${ data.from }Message mt-2 d-flex animated bounceIn">
			<div class="${ data.from }Image">
				<img title="botImage" alt="botImage" src="/assets/Images/Avatar/${ data.from }.png" style="height: 50px; width: 50px; border-radius: 50%;"/>
			</div>
			<div class="${ data.from }Content bg-light p-2 ml-2" style="border-radius: 4px; width: calc(100% - 50px)">
				<h6>${ data.from }</h6>
				<p class="mb-0" style="font-size: 14px">${ data.message }</p>
				<span class="bot_timestamp" style="font-size: 12px">${ moment(data.createdAt).fromNow() } </span>
			</div>
		</div>
		  ` : `
		  <div class="${ data.from }Message mt-2 d-flex animated bounceIn">
		  <div class="${ data.from }Image">
			  <img title="botImage" alt="botImage" src="/assets/Images/Avatar/${ data.from}.png" style="height: 50px; width: 50px; border-radius: 50%;"/>
		  </div>
		  <div class="${ data.from }Content bg-light p-2 ml-2" style="border-radius: 4px; width: calc(100% - 50px)">
			  <h6>${ data.from}</h6>
			  <p class="mb-0" style="font-size: 14px">${ data.message}</p>
			  <span class="bot_timestamp" style="font-size: 12px">${ moment(data.createdAt).fromNow()} </span>
		  </div>
	  </div>
		  ` }
		  `)
		
				})
				$(".chatArea .messages").animate({ scrollTop: 20000000 }, "slow");
				

			})
			.catch((error) => {
				console.error('Error:', error);
			});
			
	}

	// If socket is disconnected
	socket.on('disconnect', () => {
		$('.inputMessage').prop('disabled', true);
		$('.inputMessage').prop('placeholder', "Connection Lost! Reconnecting...");
	});

	// If socket is reconnected
	socket.on('reconnect', function () {
		setTimeout(() => {
			$('.inputMessage').prop('disabled', false);
			$('.inputMessage').prop('placeholder', "Type your message..");
		}, 4000);
	});

	// If socket is reconnect_failed
	socket.on('reconnect_failed', function () {
		$('.inputMessage').prop('placeholder', "No active connection. Please refresh page...");
	});

	// botTypting
	const botTyping = () => {
		$(".messages").append(`
		<div class="botTyping mt-2 animated pulse">
		${ chatSound ? `<audio class="d-none" controls autoplay>
		<source src="/assets/sounds/notify.ogg" type="audio/ogg">
		<source src="/assets/sounds/notify.mp3" type="audio/mpeg">
		Your browser does not support the audio element.
		</audio>` : ''}
			<div class="botTypting-div">
				<img src="/assets/Images/Bot/bot.png" title="botImage" alt="botImage" style="height: 50px; width: 50px; border-radius: 50%;" />
				<img src="/assets/Images/Bot/typing.gif" title="botImage" alt="botImage" style="height: 50px; width: 50px; border-radius: 50%; margin-left: 5px" />
			</div>
		</div>`
		);
		$(".messages").animate({ scrollTop: 20000000 }, "slow");
	}

	// botMessages
	const botMessage = (msg, partsFound) => {
		setTimeout(() => {
			$(".botTyping").remove();
			$(".messages").append(`
		<div class="botMessage mt-2 d-flex animated bounceIn">
			${ chatSound ? `<audio class="d-none" controls autoplay>
			<source src="/assets/sounds/notify.ogg" type="audio/ogg">
			<source src="/assets/sounds/notify.mp3" type="audio/mpeg">
			Your browser does not support the audio element.
		</audio>` : ``}
			<div class="botImage">
				<img title="botImage" alt="botImage" src="/assets/Images/Bot/bot.png" style="height: 50px; width: 50px; border-radius: 50%;"/>
			</div>
			<div class="botContent bg-light p-2 ml-2" style="border-radius: 4px; width: calc(100% - 50px)">
				<h6>Tatx Botter</h6>
				<div>${ msg}</div>
				<span class="bot_timestamp" style="font-size: 12px">${ moment(Date.now()).fromNow()} </span>
			</div>
		</div>
	`);
			$(".messages").animate({ scrollTop: 20000000 }, "slow");
		}, 3000)
	}

	// clientMessage
	const clientMessage = (msg) => {
		$(".messages").append(`
	<div class="ClientMessage mt-2 d-flex animated bounceIn">
		<div class="ClientImage">
			<img title="botImage" alt="botImage" src="/assets/Images/Avatar/User.png" style="height: 50px; width: 50px; border-radius: 50%;"/>
		</div>
		<div class="ClientContent bg-light p-2 ml-2" style="border-radius: 4px; width: calc(100% - 50px)">
			<h6>User</h6>
			<p class="mb-0" style="font-size: 14px">${ msg}</p>
			<span class="bot_timestamp" style="font-size: 12px">${ moment(Date.now()).fromNow()} </span>
		</div>
	</div>
`);
		$(".messages").animate({ scrollTop: 20000000 }, "slow");
		$(".inputMessage").val("").focus();
	}

	// select feature from the user
	// $('body').on('click', (event) => {
	// 	if ((event.target.className).split(" ")[0] === "aboutPart") {
	// 		botTyping();
	// 		botMessage('<p class="mb-0" style="font-size: 14px">To know more about Tatx you can visit the following link <a href="/about" target="_blank">Learn more about Tatx <i class="fab fa-accusoft"></i></a></p>');
	// 	} else if ((event.target.className).split(" ")[0] === "appsPart") {
	// 		botTyping();
	// 		botMessage('<p class="mb-0" style="font-size: 14px">To know more about Tatx Apps you can visit the following link <a href="/apps" target="_blank">Learn more about Tatx Apps <i class="fab fa-sketch"></i></a></p>');
	// 	} else if ((event.target.className).split(" ")[0] === "faqPart") {
	// 		botTyping();
	// 		botMessage('<p class="mb-0" style="font-size: 14px">To ask Question you can visit the following link <a href="/faq" target="_blank">Ask Question <i class="far fa-question-circle"></i></a></p>')
	// 	} else if ((event.target.className).split(" ")[0] === "partnerPart") {
	// 		botTyping();
	// 		botMessage('<p class="mb-0" style="font-size: 14px">To be partner of Tatx Delivery you can visit the following link <a href="/partner" target="_blank">Be partner <i class="far fa-handshake"></i></a></p>')
	// 	} else if ((event.target.className).split(" ")[0] === "agentPart") {
	// 		botTyping();
			
	// 	}
	// });

	// add the user to special roomID to talk to one of the admins
	$("body").on("click", ".fullnameSubmit", () => {
		if ($('.fullnameInput').val().trim()) {
			socket.emit('addUser', { fullname: $('.fullnameInput').val().trim() });
			let userFullname = $('.fullnameInput').val().trim();
			$(".messages").empty();
			botTyping();
			if(pageLang === "en") botMessage(`<p class="mb-0" style="font-size: 14px">Welcome ${ userFullname }. Please wait until one of our admins contacts with you</p>`);
			else  botMessage(`<p class="mb-0" style="font-size: 14px">مرحبًا ${ userFullname }. انتظر حتى يتواصل معك أحد من المسئولين</p>`)
		} 
	})

	// give the user special roomID to talk to one of the admins
	socket.on('roomID', (data) => {
		localStorage.setItem("roomID", data.roomID);
		roomID = data.roomID;
	});



	// open the chat box
	$('.openBox').click(() => {
		$('.chatArea').toggle(250);
		if ($(".openBox").hasClass("animated")) {
			$(".openBox").removeClass("animated");
		} else {
			$(".openBox").addClass("animated");
		}
		if (!roomID) {
			botTyping();
			if(pageLang === 'en') {
				botMessage(`<p class="mb-0" style="font-size: 14px">I'm a bot programmer. Tatx welcomes you so much</p>`);
				botMessage(`
				<div class="input-group input-group-sm mt-1 mb-0">
					<input required type="text" class="fullnameInput form-control" placeholder="Fullname"/>
					<div class="input-group-append">
						<button class="fullnameSubmit btn btn-primary"><i class="fas fa-check"></i></button>
					</div>
				</div>
				`)
			} 
			else {
				botMessage(`<p class="mb-0" style="font-size: 14px">أنا بوتر لدى تاتكس. تاتكس ترحب بك كثيرًا</p>`);
				botMessage(`
				<div class="input-group input-group-sm mt-1 mb-0">
					<input required type="text" class="fullnameInput form-control" placeholder="اسمك"/>
					<div class="input-group-append">
						<button class="fullnameSubmit btn btn-primary"><i class="fas fa-check"></i></button>
					</div>
				</div>
				`)
			}
			
		}
	});

	socket.on('adminConnected', (data) => {
		$(".messages").append(`
			<div class="adminConnected mt-2 animated bounceIn text-center">
				<p style="font-size: 12px">${ data.msg }</p>
			</div>
		`);
	});

	socket.on('leaving', (data) => {
		if(data.leavingFrom === "Admin")  {
			$(".messages").append(`
			<div class="adminLeft mt-2 animated bounceIn text-center">
				<p style="font-size: 12px">${ data.msg }</p>
			</div>
		`);
		}
	});

	$('.closeChatArea').click(() => {
		$('.chatArea').hide(250);
		$(".openBox").addClass("animated");
	});

	$('.custom-control-input').on('click', () => {
		localStorage.setItem("chatSound", !chatSound);
		chatSound = !chatSound
	})

	// Send message to the admin if there is roomID. if there is not roomID, the botter will speak
	$('.inputMessage').keypress((e) => {
		if (e.which !== 13) {
			if (roomID) {
				if ($('.inputMessage').is(":focus")) isTyping();
				else isnotTyping();
			}
		} else {
			if ($('.inputMessage').val().trim()) {
				if (roomID) {
					sendMessage();
					isnotTyping();
				} else {
					clientMessage($('.inputMessage').val());
				}
			}


		}
	})

	// specify the typting
	socket.on('typing', (data) => {
		if (data.isTyping && data.person === 'Admin')
			$(".typing").text("Admin is typing...");
		else
			$(".typing").text('');
	});


	// exchange the message
	socket.on('chatMessage', function (data) {
		if (data.isAdmin)
			sender = "Admin"
		else
			sender = "User"

		$(".messages").append(`
			<div class="${ sender }Message mt-2 d-flex animated bounceIn">
					${ chatSound && sender === "Admin" ? `<audio class="d-none" controls autoplay>
				<source src="/assets/sounds/notify.ogg" type="audio/ogg">
				<source src="/assets/sounds/notify.mp3" type="audio/mpeg">
				Your browser does not support the audio element.
				</audio>` : ''}
				<div class="${ sender }Image">
					<img title="botImage" alt="botImage" src="/assets/Images/Avatar/${ sender }.png" style="height: 50px; width: 50px; border-radius: 50%;"/>
				</div>
				<div class="${ sender }Content bg-light p-2 ml-2" style="border-radius: 4px; width: calc(100% - 50px)">
					<h6>${ sender}</h6>
					<p class="mb-0" style="font-size: 14px">${ data.message }</p>
					<span class="bot_timestamp" style="font-size: 12px">${ moment(data.createdAt).fromNow() } </span>
				</div>
			</div>
		`);
		$(".messages").animate({ scrollTop: 20000000 }, "slow");
	});

	const isTyping = () => {
		socket.emit("typing", {
			isTyping: true,
			roomID: roomID,
			person: "User"
		});
	}

	const isnotTyping = () => {
		socket.emit("typing", {
			isTyping: false,
			roomID: roomID,
			person: "User"
		});
	}

	const sendMessage = () => {
		if ($('.inputMessage').val().trim()) {
			socket.emit('chatMessage', {
				roomID: roomID,
				message: $('.inputMessage').val().trim(),
				createdAt: new Date()
			});
			$('.inputMessage').val('').focus();
		}
	}

})