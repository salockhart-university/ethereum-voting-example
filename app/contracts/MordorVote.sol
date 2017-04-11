pragma solidity ^0.4.7;
contract MordorVote {

    uint voterid = 0;
    uint vote4can1;
    uint vote4can2;

    struct User
    {
        string firstname;
        string lastname;
        string dob;
        bool voted;
        uint vid;   // To vote, the user has to present the voter id
    }

    // List of voters
    User[] ufull;

    // Events for logging
    event UserCreated(string fname, string lname, string dob, uint voteid);
    event VoteCast(bytes32 voteid, string message);
    event VotesCounted(uint vote4can1, uint vote4can2);

    ///////////////////////////////////////////////////////////////
    function MordorVote() {
        voterid = 0;
        CreateUser("Master", "User", "01/01/1970");
    }

    function CreateUser(string fname, string lname, string dob) returns (uint) {
        voterid++;
        User memory utemp;
        utemp.firstname = fname;
        utemp.lastname = lname;
        utemp.dob = dob;
        utemp.vid = voterid;
        utemp.voted = false;
        ufull.push(utemp);
        UserCreated(fname, lname, dob, voterid);
        return voterid;
    }

    function GetVoterId(string lname, string dob) constant returns (uint) {
        for ( uint i=0; i < ufull.length; i++)
        {
            if ((sha3(ufull[i].lastname) == sha3(lname)) && (sha3(ufull[i].dob) == sha3(dob)))
            {
                uint ret = ufull[i].vid;
                return ret;
            }
        }
        return 0;
    }

    function Vote(uint vid, uint vote) returns (string) {
        for ( uint i = 0; i < ufull.length; i++) {
            if (vid == ufull[i].vid) {
                if (ufull[i].voted) {
                    VoteCast(sha3(vid), "Tried to vote twice");
                    return "Cannot vote again";
                }
                if (vote == 1) {
                    VoteCast(sha3(vid), "Voted for Batman");
                    ufull[i].voted = true;
                    vote4can1++;
                    return "Candidate 1 voted successfully";
                }
                if (vote == 2) {
                    VoteCast(sha3(vid), "Voted for Iron Man");
                    ufull[i].voted = true;
                    vote4can2++;
                    return "Candidate 2 voted successfully";
                }
            }
        }
        return "User not found";
    }

    function GetVoteCount (uint voterid) returns (string) {
        if (voterid != 1) {
            return "Only the Master can see the results";
        }
        VotesCounted(vote4can1, vote4can2);
        return "Success";
    }
}
