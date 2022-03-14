import Index from "./Body/Index";
import Teams from "./Body/Teams";
import Team from "./Body/Team";
import Competitions from "./Body/Competitions";
import Competition from "./Body/Competition";

function SoccerStatBody(props) {
  let content;

  console.log("soccerstatbody", props);
  if (props.template.view === "teams") {
    content = <Teams callback={props.callback} />;
  } else if (props.template.view === "team") {
    content = <Team team={props.template.item} />;
  } else if (props.template.view === "competitions") {
    content = <Competitions callback={props.callback} />;
  } else if (props.template.view === "competition") {
    content = <Competition competition={props.template.item} />;
  } else {
    content = <Index />;
  }

  return <div className="SoccerStatBody">{content}</div>;
}

export default SoccerStatBody;
