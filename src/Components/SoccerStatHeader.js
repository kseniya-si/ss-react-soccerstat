import { useState } from "react";
import Logo from "./Logo";
import CompetitionsTab from "./CompetitionsTab";
import TeamsTab from "./TeamsTab";

function SoccerStatHeader(props) {
  return (
    <table className="SoccerStatHeader">
      <tr>
        <td>
          <Logo callback={props.callback} />
        </td>
        <td>
          <CompetitionsTab callback={props.callback} />
        </td>
        <td>
          <TeamsTab callback={props.callback} />
        </td>
      </tr>
    </table>
  );
}

export default SoccerStatHeader;
