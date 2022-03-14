import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Pagination from "../Pagination";

function Team(props) {
  let perPage = 10;
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [limits, setLimits] = useState({ from: 0, to: perPage });
  const [matches, setMatches] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const getDataFromApi = function () {
    if (dateFrom && dateTo) {
      setIsLoadingMatches(true);
      axios
        .get(
          "http://api.football-data.org/v2/teams/" + props.team.id + "/matches",
          {
            params: {
              dateFrom: new Date(dateFrom).toISOString().split("T")[0],
              dateTo: new Date(dateTo).toISOString().split("T")[0],
            },
            headers: {
              "X-Auth-Token": process.env.REACT_APP_FOOTBALL_GAMES_API_KEY,
            },
          }
        )
        .then((response) => {
          setIsLoadingMatches(false);
          setMatches(response.data.matches);
        })
        .catch((error) => {
          setIsLoadingMatches(false);
          setMatches(null);
        });
    }
  };

  useEffect(getDataFromApi, [props.team.id, dateFrom, dateTo]);

  let changeDateFrom = (dateFromObject) => {
    let value = Date.parse(dateFromObject.target.value);
    if (!isNaN(value)) {
      setDateFrom(value);
    }
  };

  let changeDateTo = (dateToObject) => {
    let value = Date.parse(dateToObject.target.value);
    if (!isNaN(value)) {
      setDateTo(value);
    }
  };

  let translateStatus = (status) => {
    let statuses = {
      SCHEDULED: "запланирован",
      LIVE: "в пряямом эфире",
      IN_PLAY: "в игре",
      PAUSED: "пайза",
      FINISHED: "завершён",
      POSTPONED: "отложен",
      SUSPENDED: "приостановлен",
      CANCELED: "отменён",
    };

    return statuses[status];
  };

  return (
    <div className="SoccerStatBodyTeam">
      <p className="breadcrumbs">Команды &gt; {props.team.name}</p>
      <p />
      <p>Матчи</p>
      <p>
        с <input type="text" onChange={changeDateFrom} /> по{" "}
        <input type="text" onChange={changeDateTo} />
      </p>
      {isLoadingMatches ? (
        <Loading />
      ) : matches ? (
        <div className="teamMatches">
          <table>
            {matches.slice(limits.from, limits.to).map((match) => (
              <tr id={match.id} className="matchRow">
                <td>{match.utcDate.split("T")[0]}</td>
                <td>{match.utcDate.split("T")[1].split("Z")[0]}</td>
                <td>{translateStatus(match.status)}</td>
                <td>{match.homeTeam.name}</td>
                <td>-</td>
                <td>{match.awayTeam.name}</td>
                <td>
                  {match.score.fullTime.homeTeam} :{" "}
                  {match.score.fullTime.awayTeam}
                </td>
                <td>
                  {match.score.extraTime.homeTeam} :{" "}
                  {match.score.extraTime.awayTeam}
                </td>
                <td>
                  {match.score.penalties.homeTeam} :{" "}
                  {match.score.penalties.awayTeam}
                </td>
              </tr>
            ))}
          </table>
          <Pagination
            count={matches.length}
            perPage={perPage}
            callback={setLimits}
          />
        </div>
      ) : (
        <p>Не удалось получить данные о матчах команды</p>
      )}
    </div>
  );
}

export default Team;
