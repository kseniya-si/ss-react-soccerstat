import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Pagination from "../Pagination";

function Competitions(props) {
  let perPage = 9;
  const [isLoading, setIsLoading] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [limits, setLimits] = useState({ from: 0, to: perPage });

  function handleClick(e) {
    e.preventDefault();
    console.log(competitions.length);
    let competition = competitions.find((item) => item.id === +e.target.id);
    props.callback({ view: "competition", item: competition });
  }

  const getDataFromApi = function () {
    setIsLoading(true);
    axios
      .get("http://api.football-data.org/v2/competitions/", {
        headers: {
          "X-Auth-Token": process.env.REACT_APP_FOOTBALL_GAMES_API_KEY,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setCompetitions(response.data.competitions);
      })
      .catch((error) => {
        setIsLoading(false);
        setCompetitions(null);
      });
  };

  useEffect(getDataFromApi, []);

  if (isLoading) {
    return <Loading />;
  } else {
    if (competitions) {
      return (
        <div>
          <div className="SoccerStatBodyCompetitions">
            {competitions.slice(limits.from, limits.to).map((competition) => (
              <div
                id={competition.id}
                onClick={handleClick}
                className="competition"
              >
                <div id={competition.id} className="competitionName">
                  {competition.name}
                </div>
                <div id={competition.id} className="competitionCountryName">
                  {competition.area.name}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            count={competitions.length}
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

export default Competitions;
