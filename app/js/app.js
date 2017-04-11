/*@Author Abhinav Halra
 * Javascript for front end interaction with Ballot Contract
 * Ethereum and Blockchain Workshop : 29 Mar,2017
 */
function doSomeStartupStuff() {
	var options = {
		format: 'mm/dd/yyyy',
		todayHighlight: true,
		autoclose: true,
	};
	var date_input = $('input[name="date"]');
	date_input.datepicker(options);
	// add your embarkJS event listener here to initialize the web3 filter at page load

	function logHandler(event) {
		console.log("Logging", event);
		document.getElementById("balloteventTxtarea").innerHTML += JSON.stringify(event.args) + "\n";
	}

	MordorVote.VoteCast({ from: web3.eth.accounts }, 'latest').then(logHandler);

	MordorVote.VotesCounted({ from: web3.eth.accounts }, 'latest').then(function(event) {
		alert("Votes:\nBatman: " + event.args.vote4can1 + "\nIron Man: " + event.args.vote4can2);
		logHandler(event);
	});

	MordorVote.UserCreated({ from: web3.eth.accounts }, 'latest').then(function(event) {
		alert("Voter ID:" + event.args.voteid);
		logHandler(event);
	});
}

function registerVoter() {
	var fname = document.getElementById("firstnameTxt").value;
	var lname = document.getElementById("lastnameTxt").value;
	var dob = document.getElementById("date").value;
	///////////////////////////////////////////////////////////////////////////////////////////
	MordorVote.CreateUser(fname, lname, dob, {
		gas: 500000
	});

}

function getVoteCounts() {
	var id = document.getElementById("masteridTxt").value;
	if (MordorVote.GetVoteCount.call(id) === "Only the Master can see the results") {
		return alert("Only the Master can see the results");
	}
	MordorVote.GetVoteCount(id, {
		gas: 500000
	});
}

function castVote() {
	var voteid = document.getElementById("voteridTxt").value;
	///////////////////////////////////////////////////////////////////////////////////////////
	var canID = 0;
	var canName = "";
	if (document.getElementById("bradio").checked === true) {
		canID = 1;
		canName = "Batman";
	} else if (document.getElementById("iradio").checked === true) {
		canID = 2;
		canName = "Iron Man";
	}

	if (MordorVote.Vote.call(voteid, canID) != "User not found") {
		if (MordorVote.Vote.call(voteid, canID) == "Cannot vote again") {
			return window.alert("Sorry, you can only vote once.");
		}
		MordorVote.Vote(voteid, canID, {
			gas: 500000
		}).then(function(value) {
			window.alert(canName + " voted successfully!\n" + "Transaction =" + value);
		});
	}
}

$(document).ready(function() {
	$(".nav-tabs a").click(function() {
		$(this).tab('show');
		document.getElementById("firstnameTxt").value = "";
		document.getElementById("lastnameTxt").value = "";
		document.getElementById("date").value = "";
		document.getElementById("regstatLabel").innerHTML = "";
		document.getElementById("voteridTxt").value = "";
	});
});
