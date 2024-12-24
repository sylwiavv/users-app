import { SearchSection } from "../components/templates/AddressBook/SearchSection";
import { EmployeeListSection } from "../components/templates/AddressBook/EmployeeListSection";
import { useUsers } from "../context/UsersContext";
import { GridLayout } from "../layouts/GridLayout";
import { useEffect } from "react";

const AddressBookPage = () => {
  const { filteredUsers, refreshUsers } = useUsers();

  useEffect(() => {
    (async () => {
      await refreshUsers();
    })();
  }, []);

  return (
    <GridLayout>
      <SearchSection />
      <EmployeeListSection users={filteredUsers} />
    </GridLayout>
  );
};

export { AddressBookPage };
