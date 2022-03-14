function CompetitionsTab(props) {
  function handleClick(e) {
    e.preventDefault();
    props.callback({ view: "competitions" });
  }

  return (
    <div className="CompetitionsTab">
      <div onClick={handleClick}>Лиги</div>
    </div>
  );
}

export default CompetitionsTab;
