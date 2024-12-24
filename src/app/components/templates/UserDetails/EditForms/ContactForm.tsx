import FormField from "../../../atoms/FormField/FormField";
import { useForm } from "../../../../hooks/useForm";
import { useUser } from "../../../../../server-actions/hooks/useUser";
import { FormButtons } from "../../../atoms/FormButtons";
import { useUserDetails } from "../../../../context/UserDetailsContext";

export const ContactForm = ({closeModal}: {closeModal: () => void}) => {
  const { userDetails, setUserDetails } = useUserDetails();

  const { updateUser } = useUser();

  if (!userDetails) return <p>Something went wrong, try again.</p>;

  const { id, phone, email, skype, cnumber } = userDetails;

  const defaultValues = {
    phone,
    email,
    skype,
    cnumber,
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
        <h3 className="edit-form__section-title">Contact Info</h3>
      </div>

      <form onSubmit={handleOnSubmit} className="edit-form__section">
        <div>
          <FormField
            error=""
            label="Mobile Phone"
            name="phone"
            id="phone"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="Skype"
            name="skype"
            id="skype"
            value={formValues.skype}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormField
            error=""
            label="C-Number"
            name="cnumber"
            id="cnumber"
            value={formValues.cnumber}
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
