function TeamsTab(props) {
  function handleClick(e) {
    e.preventDefault();
    props.callback({ view: "teams" });
  }

  return (
    <div className="TeamsTab">
      <div onClick={handleClick}>Команды</div>
    </div>
  );
}

export default TeamsTab;
