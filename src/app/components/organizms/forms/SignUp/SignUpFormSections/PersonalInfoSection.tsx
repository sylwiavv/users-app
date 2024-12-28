import { CopyIcon } from "../../../../../../assets/icons/icons";
import { TFormValues } from "../../../../../hooks/useForm";
import FormField from "../../../../atoms/FormField/FormField";
import {
  ESnackbarTypes,
  useSnackbar,
} from "../../../../../context/SnackbarContex";
enum AVATARS {
  LINK = "https://avatar.iran.liara.run/public",
}

export interface ISignUpSectionProps {
  errors: Record<string, string>;
  formValues: TFormValues;
  handleInputBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const PersonalInfoSection = ({
  errors,
  formValues,
  handleInputBlur,
  handleInputChange,
}: ISignUpSectionProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const copyLink = () => {
    navigator.clipboard.writeText(AVATARS.LINK);
    enqueueSnackbar("Link copied", {
      variant: ESnackbarTypes.SUCCESS,
    });
  };

  return (
    <div className="form-section">
      <h3 className="form-section__title">Personal info</h3>
      <div className="form">
        <div className="row">
          <FormField
            error={errors.first_name}
            label="First Name"
            name="first_name"
            id="first_name"
            value={formValues.first_name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <FormField
            error={errors.last_name}
            label="Last Name"
            name="last_name"
            id="last_name"
            value={formValues.last_name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div className="">
          <FormField
            error={errors.user_avatar}
            label="User avatar"
            name="user_avatar"
            id="user_avatar"
            value={formValues.user_avatar}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <div className="additional-info">
            You can use this link 
            <span onClick={copyLink} className="link">
            <CopyIcon />
              {AVATARS.LINK}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
