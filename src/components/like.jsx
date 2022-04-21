const Like = (props) => {
  let heartClass = "fa fa-heart";
  if (!props.liked) heartClass += "-o";
  return <i onClick={props.onClick} className={heartClass}></i>;
};

export default Like;
