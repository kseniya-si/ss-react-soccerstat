import { useState } from "react";
import SoccerStatHeader from "./SoccerStatHeader";
import SoccerStatBody from "./SoccerStatBody";

function SoccerStat() {
  const [template, setTemplate] = useState({ view: "index" });

  return (
    <div className="SoccerStat">
      <hr />
      <table>
        <th>
          <td>
            <SoccerStatHeader callback={setTemplate} />
          </td>
        </th>
      </table>
      <hr />
      <table>
        <tr>
          <td>
            <SoccerStatBody template={template} callback={setTemplate} />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default SoccerStat;
