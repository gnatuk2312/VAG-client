import cn from "classnames";

const AdminTitle = (props) => {
  const { title, className } = props;

  return <h1 className={cn("admin-title", className)}>{title}</h1>;
};

export default AdminTitle;
