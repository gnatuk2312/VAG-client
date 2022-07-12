import cn from "classnames";

const Button = (props) => {
  const { children, className, onClick = null } = props;
  return (
    <button onClick={onClick} type="button" className={cn("button", className)}>
      {children}
    </button>
  );
};

export default Button;
