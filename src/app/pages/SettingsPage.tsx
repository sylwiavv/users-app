import { useState, FormEvent, useEffect } from "react";
import { useUsers } from "../context/UsersContext";
import { SettingsTableRow } from "../components/Settings/SettingsTableRow";
import { MagnifyingGlassIcon } from "../../assets/icons/icons";
import FormField from "../components/atoms/FormField/FormField";
import { IconFormField } from "../components/atoms/IconFormField/IconFormField";
import { GridLayout } from "../layouts/GridLayout";
import { useSearchUser } from "../../server-actions/hooks/useSearchUser";

const SettingsPage = () => {
  const { filteredUsers, refreshUsers, users, setFilteredUsers } = useUsers();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // W tym miejscu można dodać logikę wyszukiwania
  };

  const handleModalClose = () => {
    const modal = document.getElementById("edit-user-role");
    if (modal) {
      modal.style.display = "none";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(name, value);
    setSearchQuery(value);

    const filtered = useSearchUser({
      query: searchQuery,
      data: users,
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    (async () => {
   await refreshUsers()
    })()

  },[])

  console.log(searchQuery);

  return (
    <>
      <h2 className="page-title">Roles and Permissions</h2>

      <div className="address-book fadeIn">
        <div className="address-book__header">
          <div className="address-book__header_search item">
            <form id="searchFormSettingsPage" onSubmit={handleSearch}>
              <IconFormField
                type="text"
                placeholder="Type to search"
                id="searchInputSettingsPage"
                name="searchInput"
                error={""}
                value={searchQuery}
                onChange={(e) => handleInputChange(e)}
                icon={<MagnifyingGlassIcon />}
              />

              {/* <button
                  type="submit"
                  id="searchButtonSettingsPage"
                  className="blue-button"
                >
                  Search
                </button> */}
            </form>
          </div>
          <div className="address-book__header__role item">
            Address Book Role
          </div>
          <div className="address-book__header__admin item">Admin</div>
        </div>

        <ul className="address-book__content">
          {filteredUsers.map((user) => (
            <SettingsTableRow key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </>
  );
};

export { SettingsPage };
