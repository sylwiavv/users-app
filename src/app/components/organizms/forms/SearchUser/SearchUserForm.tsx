import { useForm } from "../../../../hooks/useForm";
import { useSearchUser } from "../../../../../server-actions/hooks/useSearchUser";
import { useUsers } from "../../../../context/UsersContext";
import { IconFormField } from "../../../atoms/IconFormField/IconFormField";
import { MagnifyingGlassIcon } from "../../../../../assets/icons/icons";

const defaultValues = {
  searchQuery: "",
};

export const SearchUserForm = () => {
  const { users, setFilteredUsers } = useUsers();

  const handleOnSubmit = () => {
    const filtered = useSearchUser({
      query: formValues.searchQuery,
      data: users,
    });

    setFilteredUsers(filtered);
  };

  const { handleInputChange, formValues, handleSubmit } = useForm(
    defaultValues,
    handleOnSubmit
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const filtered = useSearchUser({
        query: formValues.searchQuery,
        data: users,
      });

      setFilteredUsers(filtered);
    }
  };

  return (
    <form id="searchForm" onSubmit={handleSubmit}>
      <IconFormField
        placeholder="Type to search"
        type="text"
        id={"searchQuery"}
        name={"searchQuery"}
        error={""}
        value={formValues.searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        icon={<MagnifyingGlassIcon />}
      />
      {/* <input type="text" id="searchInput" placeholder="Search by ID, Name..." /> */}
      <button type="submit" id="searchBtn" className="blue-button">
        Search
      </button>
    </form>
  );
};
