import cn from "classnames";

const Container = (props) => {
  const { children, className } = props;
  return <div className={cn("container", className)}>{children}</div>;
};

export default Container;
