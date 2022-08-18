import Link from "next/link";

import EditIcon from "../../../public/icons/edit-icon.svg";
import StarIconEmpty from "../../../public/icons/star-icon-empty.svg";
import StarIconFilled from "../../../public/icons/star-icon-filled.svg";

const TableItem = (props) => {
  const { client } = props;
  const { _id, name, phone, email, carBrand, carModel, licensePlate, favorite } = client;
  return (
    <div className="table-item">
      <Link href={`/admin/clients/${_id}`} passHref>
        <a className="table-item__client" href="replace">
          <span className="table-item__avatar">{name.slice(0, 1)}</span>
          <p className="table-item__name">{name}</p>
        </a>
      </Link>
      <a href={`tel:${phone}`} className="table-item__phone-number">
        {phone}
      </a>
      <p className="table-item__car">
        {carBrand} {carModel}
      </p>
      <p className="table-item__license-plate">{licensePlate}</p>
      <a href={`mailto:${email}`} className="table-item__email">
        {email}
      </a>
      <div className="table-item__action">
        <Link href={`/admin/clients/${_id}`} passHref>
          <a className="table-item__edit" href="replace">
            <EditIcon />
          </a>
        </Link>
        {favorite && <StarIconFilled />}
        {!favorite && <StarIconEmpty />}
      </div>
    </div>
  );
};

export default TableItem;
