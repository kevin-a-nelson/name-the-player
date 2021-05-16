import BballReferenceTable from "./components/BballReferenceTable/BballRefrenceTable";
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
  const [leagues, setLeagues] = useState([]);

  const fetchTeamRoster = (team) => {
    axios
      .get(
        `https://raw.githubusercontent.com/kevin-a-nelson/bball-reference-json/main/NBA/${team}.json`
      )
      .then((response) => response.data)
      .then((data) => {
        data.sort(function (a, b) {
          return b.pts_per_g - a.pts_per_g;
        });
        console.log(data);
        setPlayers(data);
      });
  };

  const fetchTeamNames = (league) => {
    axios
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
    fetchTeamNames("NBA");
    fetchTeamRoster(teamNames[0]);
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

      if (inputPlayerName === playerName) {
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
    console.log(newTeam);
    setMatchPer(0);
    setClosestPlayer("");
    setPlayerInput("");
    fetchTeamRoster(newTeam);
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
      <select className="select-team" onChange={handleTeamChange}>
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
      <BballReferenceTable playerInput={playerInput} players={players} />
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
