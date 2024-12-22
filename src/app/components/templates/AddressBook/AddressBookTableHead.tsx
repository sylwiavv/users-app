import {
  CircleDotIcon,
  DoorIcon,
  PersonIcon,
  SuitcaseIcon,
} from "../../../../assets/icons/icons";

export const AddRessBookTableHead = () => {
  return (
    <div className="employee-list-table-head">
      <div className="employee-list-table-head__first-col">
        <span className="employee-list-table-head__first-col__photo icon">
          <CircleDotIcon /> Photo
        </span>
        <span className="employee-list-table-head__first-col__name icon">
          <PersonIcon /> Name
        </span>
      </div>

      <div className="employee-list-table-head__second-col">
        <span className="employee-list-table-head__second-col__department icon">
          <SuitcaseIcon /> Department
        </span>
        <span className="employee-list-table-head__second-col__room icon">
          <DoorIcon /> Room
        </span>
      </div>
    </div>
  );
};
