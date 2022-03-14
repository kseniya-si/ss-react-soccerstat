function Logo(props) {
  function handleClick(e) {
    e.preventDefault();
    props.callback({ view: "index" });
  }

  return (
    <div className="Logo">
      <img src="/logo192.png" alt="logo" onClick={handleClick} />
    </div>
  );
}

export default Logo;
