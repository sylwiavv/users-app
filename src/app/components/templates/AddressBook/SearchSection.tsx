import { useNavigate , useParams} from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { ButtonWithSpinner } from "../../atoms/ButtonWithSpinner/ButtonWithSpinner";
import FormField from "../../atoms/FormField/FormField";
import { SearchUserForm } from "../../organizms/forms/SearchUser/SearchUserForm";
import { useUsers } from "../../../context/UsersContext";
import { useSearchUser } from "../../../../server-actions/hooks/useSearchUser";
import { useLocation } from "react-router";

export const SearchSection = () => {
  const { users, setFilteredUsers, refreshUsers} = useUsers();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    skype: "",
    building: "",
    room: "",
    department: "",
    searchQuery: "", 
  };
 
  const handleOnSubmit = () => {
    setIsLoading(true);

    const queryParams = new URLSearchParams(
      Object.entries(formValues)
        .filter(([_, value]) => value !== "") 
        .map(([key, value]) => [key, String(value)])
    ).toString();

    const searchQuery = Object.values(formValues).filter((value) => value !== "") 

    const filtered = useSearchUser({
      query: searchQuery as string[], 
      data: users,
    });

    setFilteredUsers([...filtered]);
    setIsLoading(false);

    navigate(`/address-book?${queryParams}`);
  };

  const { handleInputChange, formValues, handleSubmit } = useForm(
    defaultValues,
    handleOnSubmit
  );

  

  const handleCleanSearchResults = async () => {
    const hasParams = location.search.length > 0;
    const thereAreSomeSearchParams = Object.values(formValues).some((value) => value !== "");
  
    if (thereAreSomeSearchParams || hasParams) {
      navigate(`/address-book`);
        await refreshUsers();
    } 
  };


  return (
    <section className="search-section">
      <div className="search-tabs">
        <input
          type="radio"
          id="basic-search"
          name="search-type"
          defaultChecked
        />
        <input type="radio" id="advanced-search" name="search-type" />
        <div className="tabs-labels">
          <label htmlFor="basic-search" className="tab-label" onClick={handleCleanSearchResults}>
            Basic Search
          </label>
          <label htmlFor="advanced-search" className="tab-label" onClick={handleCleanSearchResults}>
            Advanced Search
          </label>
        </div>
        <div className="search-tabs-content box-shadow">
          <div className="tab-content basic">
            <SearchUserForm />
          </div>
          <div className="tab-content advanced">
            <form className="advanced-search-form" onSubmit={handleSubmit}>
              <div className="advanced-search-form__fields">
                <FormField
                  id="name"
                  label="Name"
                  name="name"
                  onChange={handleInputChange}
                  value={formValues.name}
                  error={""}
                />

                <FormField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={formValues.email}
                  error={""}
                />

                <div className="row">
                  <FormField
                    id="phone"
                    label="Phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={formValues.phone}
                    error={""}
                  />
                  <FormField
                    id="skype"
                    label="Skype"
                    name="skype"
                    onChange={handleInputChange}
                    value={formValues.skype}
                    error={""}
                  />
                </div>

                <div className="row">
                  <FormField
                    id="building"
                    label="Building"
                    name="building"
                    onChange={handleInputChange}
                    value={formValues.building}
                    error={""}
                  />

                  <FormField
                    id="room"
                    label="Room"
                    name="room"
                    onChange={handleInputChange}
                    value={formValues.room}
                    error={""}
                  />
                </div>

                <div className="row">
                  <FormField
                    id="department"
                    label="Department"
                    name="department"
                    type="select"
                    onChange={handleInputChange}
                    value={formValues.department}
                    error={""}
                  />
                </div>
              </div>
              <ButtonWithSpinner
                type={"submit"}
                className="signin__button blue-button"
                isLoading={isLoading}
                onClick={handleOnSubmit}
              >
                Search
              </ButtonWithSpinner>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
