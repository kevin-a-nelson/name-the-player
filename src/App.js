import BballReferenceTable from "./components/BballReferenceTable/BballRefrenceTable";
import BaseballReferenceTable from "./components/BaseballReferenceTable/BaseballReferenceTable";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NBATeamAbbrev from "./NBATeamAbbrev.js";
import stringSimilarity from "string-similarity";

function App() {
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState([]);
  const [matchPer, setMatchPer] = useState(0);
  const [closestPlayer, setClosestPlayer] = useState("");
  const [reveal, setReveal] = useState(false);
  const [teamNames, setTeamNames] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("ATL");
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("NBA");

  const fetchLeagues = () => {
    axios
      .get(
        `https://raw.githubusercontent.com/kevin-a-nelson/bball-reference-json/main/leagues.json`
      )
      .then((response) => response.data)
      .then((data) => {
        setLeagues(data);
      });
  };

  const fetchTeamRoster = (league, team) => {
    axios
      .get(
        `https://raw.githubusercontent.com/kevin-a-nelson/bball-reference-json/main/${league}/${team}.json`
      )
      .then((response) => response.data)
      .then((data) => {
        if (league === "NBA") {
          data.sort(function (a, b) {
            return b.pts_per_g - a.pts_per_g;
          });
        }
        if (league === "MLB") {
          data.sort(function (a, b) {
            return b.PA - a.PA;
          });
          data = data.filter(function (player) {
            return player.pos_summary != "1" && player.pos_summary != "/1";
          });
        }
        console.log(data);
        setPlayers(data);
      });
  };

  const fetchTeamNames = async (league) => {
    return axios
      .get(
        `https://raw.githubusercontent.com/kevin-a-nelson/bball-reference-json/main/${league}/teamNames.json`
      )
      .then((response) => response.data)
      .then((data) => {
        data.sort();
        setTeamNames(data);
      });
  };

  useEffect(() => {
    fetchLeagues();
    fetchTeamNames(selectedLeague);
    fetchTeamRoster(selectedLeague, selectedTeam);
  }, []);

  const handleChange = (e) => {
    const newPlayers = players;

    setPlayerInput(e.target.value);

    let maxMatchPer = 0;
    let newClosestPlayer = "";

    let playerMatch = false;

    for (let i = 0; i < newPlayers.length; i++) {
      const inputPlayerName = e.target.value.toLowerCase();
      const playerName = newPlayers[i].player.toLowerCase();

      let weight = stringSimilarity.compareTwoStrings(
        inputPlayerName,
        playerName
      );

      weight = Math.round(weight * 100);

      if (weight > maxMatchPer) {
        maxMatchPer = weight;
        newClosestPlayer = newPlayers[i].player;
      }

      if (weight == 100) {
        newPlayers[i].show = true;
        setPlayers(newPlayers);
        setPlayerInput("");
        playerMatch = true;
      }
    }

    playerMatch ? setMatchPer(0) : setMatchPer(maxMatchPer);
    setClosestPlayer(newClosestPlayer);
  };

  const handleTeamChange = (e) => {
    const newTeam = e.target.value;
    setMatchPer(0);
    setSelectedTeam(newTeam);
    setClosestPlayer("");
    setPlayerInput("");
    fetchTeamRoster(selectedLeague, newTeam);
  };

  const handleLeagueChange = async (e) => {
    const newLeague = e.target.value;
    setMatchPer(0);
    setClosestPlayer("");
    setPlayerInput("");
    setSelectedLeague(newLeague);
    fetchTeamNames(newLeague);

    if (newLeague === "MLB") {
      setSelectedTeam("ARI");
      fetchTeamRoster(newLeague, "ARI");
    } else if (newLeague === "NBA") {
      setSelectedTeam("ATL");
      fetchTeamRoster(newLeague, "ATL");
    }
  };

  const resetPlayers = () => {
    const newPlayers = players.map((player) => {
      return { ...player, show: false };
    });
    setPlayers(newPlayers);
  };

  const revealAll = () => {
    const newPlayers = players.map((player) => {
      return { ...player, show: true };
    });
    setPlayers(newPlayers);
  };

  return (
    <div className="App">
      <h3 className="center">Name the Players</h3>
      <div className="mb-20"></div>
      <select
        className="select-league"
        onChange={handleLeagueChange}
        value={selectedLeague}
      >
        {leagues
          ? leagues.map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })
          : null}
      </select>
      <div className="mb-20"></div>
      <select
        className="select-team"
        onChange={handleTeamChange}
        value={selectedTeam}
      >
        {teamNames
          ? teamNames.map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })
          : null}
      </select>
      <div className="mb-20"></div>
      <input
        onChange={handleChange}
        className="player-input"
        type="text"
        value={playerInput}
        placeholder="Enter a Player"
      />
      <p>Closest Match: {matchPer}%</p>
      <div className="mb-20"></div>
      <div
        className="reveal"
        onMouseEnter={() => setReveal(true)}
        onMouseLeave={() => setReveal(false)}
      >
        {reveal && matchPer != 0 ? closestPlayer : "See Closest Match"}
      </div>
      <div className="mb-20"></div>

      {selectedLeague === "MLB" ? (
        <BaseballReferenceTable playerInput={playerInput} players={players} />
      ) : null}

      {selectedLeague === "NBA" ? (
        <BballReferenceTable playerInput={playerInput} players={players} />
      ) : null}

      <div className="mb-20"></div>
      <div class="flex">
        <button onClick={resetPlayers} className="reset-btn">
          Reset
        </button>
        <div class="w-20"></div>
        <button class="reveal-btn" onClick={revealAll} className="reset-btn">
          Reveal All
        </button>
      </div>
    </div>
  );
}

export default App;
