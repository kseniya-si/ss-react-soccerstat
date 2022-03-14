import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Pagination from "../Pagination";

function Teams(props) {
  let perPage = 9;
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [limits, setLimits] = useState({ from: 0, to: perPage });

  function handleClick(e) {
    e.preventDefault();
    console.log(teams, +e.target.id);
    let team = teams.find((item) => item.id === +e.target.id);
    props.callback({ view: "team", item: team });
  }

  const getDataFromApi = function () {
    setIsLoading(true);
    axios
      .get("https://api.football-data.org/v2/teams/", {
        headers: {
          "X-Auth-Token": process.env.REACT_APP_FOOTBALL_GAMES_API_KEY,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setTeams(response.data.teams);
      })
      .catch(() => {
        setIsLoading(false);
        setTeams(null);
      });
  };

  useEffect(getDataFromApi, []);

  if (isLoading) {
    return <Loading />;
  } else {
    if (teams) {
      return (
        <div>
          <div className="SoccerStatBodyTeams">
            {teams.slice(limits.from, limits.to).map((team) => (
              <div id={team.id} onClick={handleClick} className="team">
                <div id={team.id} className="teamName">
                  {team.name}
                </div>
                <div id={team.id} className="teamLogo">
                  <img id={team.id} src={team.crestUrl} alt="img"></img>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            count={teams.length}
            perPage={perPage}
            callback={setLimits}
          />
        </div>
      );
    } else {
      return <p>Не удалось получить данные</p>;
    }
  }
}

export default Teams;
