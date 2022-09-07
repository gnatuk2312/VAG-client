import cn from "classnames";
import Image from "next/image";

import Spinner from "../../public/images/spinner.gif";

const Loading = (props) => {
  const { className, isVisible } = props;

  return (
    <div className={cn("loading", { "loading_is-visible": isVisible }, className)}>
      <Image src={Spinner} layout="fill" alt="loading" />
    </div>
  );
};

export default Loading;
