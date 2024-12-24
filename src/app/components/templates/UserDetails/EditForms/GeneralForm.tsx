import FormField from "../../../atoms/FormField/FormField";
import { useForm } from "../../../../hooks/useForm";
import { useUser } from "../../../../../server-actions/hooks/useUser";
import { FormButtons } from "../../../atoms/FormButtons";
import { useUserDetails } from "../../../../context/UserDetailsContext";

export const GeneralForm =  ({closeModal}: {closeModal: () => void}) => {
  const { userDetails, setUserDetails } = useUserDetails();

  const { updateUser } = useUser();
  

  if (!userDetails) return <p>Something went wrong, try again.</p>;

  const {
    id,
    department,
    building,
    room,
    desk_number,
  } = userDetails;

  const defaultValues = {
    department,
    building,
    room,
    desk_number: desk_number.toString(),
  };

  const handleOnSubmit = () => {
    (async () => {
      try {
        const response = await updateUser({ id, data: formValues });
        if (response?.status === 200) {
          const updatedData = await response?.json();
          setUserDetails(updatedData);
          closeModal()
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const { formValues, handleInputChange } = useForm(
    defaultValues,
    handleOnSubmit
  );

  return (
    <>
      <div className="edit-form__header">
        <h3 className="edit-form__section-title">General Info</h3>
      </div>

      <form onSubmit={handleOnSubmit} className="edit-form__section">
        <div>
          <FormField
            error=""
            label="Department"
            name="department"
            id="department"
            value={formValues.department}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Building"
            name="building"
            id="building"
            value={formValues.building}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Room"
            name="room"
            id="room"
            value={formValues.room}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Desk Number"
            name="desk_number"
            id="desk_number"
            value={formValues.desk_number}
            onChange={handleInputChange}
          />
        </div>

        <select name="menager">
        <option value="">--Choose menager--</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="hr">HR</option>
      </select>
        <FormButtons
          isLoading={false}
          onClose={closeModal}
          onSend={handleOnSubmit}
        />
      </form>
    </>
  );
};
