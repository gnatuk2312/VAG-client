import { Link } from "react-scroll";
import cn from "classnames";

const Button = (props) => {
  const { children, className, onClick = null } = props;
  return (
    <Link
      onClick={onClick}
      className={cn("button", className)}
      href="#book-appointment"
      to="book-appointment"
      smooth
      duration={500}
    >
      {children}
    </Link>
  );
};

export default Button;
