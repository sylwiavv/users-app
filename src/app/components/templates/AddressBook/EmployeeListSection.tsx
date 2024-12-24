import { IUser } from "../../../types/users";
import { useNavigate } from "react-router-dom";
import { GridRowToggler } from "../../../layouts/GridRowToggler/GridRowToggler";
import { useState } from "react";
import { AddRessBookTableHead } from "./AddressBookTableHead";
import { EmployeeCard } from "./EmployeeCard";
import { useUsers } from "../../../context/UsersContext";
import { Loader } from "../../atoms/Loader/Loader";

interface IEmployeeListSectionProps {
  users: IUser[];
}

export const EmployeeListSection = ({ users }: IEmployeeListSectionProps) => {
  const layoutToggler = localStorage.getItem("layoutToggler");
  const { usersAreLoading } = useUsers();

  const navigate = useNavigate();

  const handleOnClick = ({ id }: Pick<IUser, "id">) => {
    navigate(`/user-details/${id}`);
  };

  const [isGrid, setIsGrid] = useState(layoutToggler);

  if (usersAreLoading) {
    return <Loader />
  }

  return (
    <div className={`employee-list ${isGrid}`}>
      <GridRowToggler
        children={
          <p className="employee-list__user-count">
            {users.length > 0
              ? `${users.length} employees displayed`
              : `${users.length} employee displayed`}
          </p>
        }
        onLayoutChange={setIsGrid}
      ></GridRowToggler>

      {isGrid !== "_grid" && <AddRessBookTableHead />}

      {users.map((user) => (
        <EmployeeCard key={user.id} user={user} handleOnClick={handleOnClick} />
      ))}
    </div>
  );
};
