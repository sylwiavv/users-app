import FormField from "../../../atoms/FormField/FormField";
import { useForm } from "../../../../hooks/useForm";
import { useUser } from "../../../../../server-actions/hooks/useUser";
import { FormButtons } from "../../../atoms/FormButtons";
import { useUserDetails } from "../../../../context/UserDetailsContext";

export const PersonalForm = ({closeModal}: {closeModal: () => void}) => {
  const { userDetails, setUserDetails } = useUserDetails();

  const { updateUser } = useUser();

  if (!userDetails) return <p>Something went wrong, try again.</p>;

  const { id, first_name, last_name, first_native_name, last_native_name } =
    userDetails;

  const defaultValues = {
    first_name,
    last_name,
    first_native_name,
    last_native_name,
  };

  const handleOnSubmit = () => {
    (async () => {
      try {
        const response = await updateUser({ id, data: formValues });
        if (response?.status === 200) {
          setUserDetails(response.data);
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
        <h3 className="edit-form__section-title">Personal Info</h3>
      </div>

      <form onSubmit={handleOnSubmit} className="edit-form__section">
        <div>
          <FormField
            error=""
            label="First Name"
            name="first_name"
            id="first_name"
            value={formValues.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Last Name"
            name="last_name"
            id="last_name"
            value={formValues.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="First Native Name"
            name="first_native_name"
            id="first_native_name"
            value={formValues.first_native_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Last Native Name"
            name="last_native_name"
            id="last_native_name"
            value={formValues.last_native_name}
            onChange={handleInputChange}
          />
        </div>
        <FormButtons
          isLoading={false}
          onClose={closeModal}
          onSend={handleOnSubmit}
        />
      </form>
    </>
  );
};
