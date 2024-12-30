import { Dispatch, ReactNode, SetStateAction } from "react";
import DatePickerComponent from "../../../../atoms/DatePickerComponent";
import FormField from "../../../../atoms/FormField/FormField";
import { IUser, IVisa } from "../../../../../types/users";
import { TFormValues } from "../../../../../hooks/useForm";
import IconButton from "../../../../atoms/IconButton/IconButton";
import { PlusIcon, TrashIcon } from "../../../../../../assets/icons/icons";

interface IVisaSectionProps {
  visaList: IVisa[];
  setVisaList: React.Dispatch<React.SetStateAction<IVisa[]>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formValues: TFormValues;
  setFormValues: Dispatch<SetStateAction<TFormValues>>;
}

export const VisaSection = ({
  visaList,
  setVisaList,
  formValues,
  setFormValues,
}: IVisaSectionProps) => {
    
  const addVisa = () => {
    setVisaList([
      ...visaList,
      {
        issuing_country: "",
        type: "",
        start_date: new Date(),
        end_date: new Date(),
      },
    ]);
  };

  const removeVisa = (index: number) => {
    const updatedVisaList = visaList.filter((_, i) => i !== index);
    setVisaList(updatedVisaList);
  };

  const handleSetDate = ({
    e,
    index,
    field,
  }: {
    e: string | Date;
    index: number;
    field: keyof IVisa;
  }) => {
    setFormValues((prevValues) => {
      const visaList = Array.isArray(prevValues.visa) ? prevValues.visa : [];
      const updatedVisa = [...visaList];

      if (!updatedVisa[index]) {
        updatedVisa[index] = {
          issuing_country: "",
          type: "",
          start_date: new Date(),
          end_date: new Date(),
        };
      }

      if (field === "start_date" || field === "end_date") {
        updatedVisa[index][field] = e instanceof Date ? e : new Date(e);
      } else {
        updatedVisa[index][field] = e as string;
      }

      return {
        ...prevValues,
        visa: updatedVisa,
      };
    });
  };

  return (
    <div className="form-section">
      <h3 className="form-section__title">Visa Information</h3>

      <div className="form-section__wrapper">
        {visaList.map((_, index) => (
          <div key={index} className="visa__section">
            <div className="visa__section-wrapper">
            <div className="row">
              {Array.isArray(formValues.visa) && (
                <FormField
                  error={""}
                  label="Issuing Country"
                  name="issuing_country"
                  value={formValues.visa?.[index]?.issuing_country}
                  onChange={(e) =>
                    handleSetDate({
                      e: e.target.value,
                      index,
                      field: "issuing_country",
                    })
                  }
                />
              )}
              {Array.isArray(formValues.visa) && (
                <FormField
                  error={""}
                  label="Visa Type"
                  name="type"
                  value={formValues.visa[index]?.type}
                  onChange={(e) =>
                    handleSetDate({ e: e.target.value, index, field: "type" })
                  }
                />
              )}
            </div>
            <div className="row">
              <div className="input-label__wrapper">
                <label className="input-label__wrapper__label">
                  Start Date
                </label>
                {Array.isArray(formValues.visa) && (
                  <DatePickerComponent
                    startDate={formValues.visa?.[index]?.start_date as Date}
                    setStartDate={(date) =>
                      handleSetDate({ e: date, index, field: "start_date" })
                    }
                    placeholderText="Select start date"
                  />
                )}
              </div>
              <div className="input-label__wrapper">
                <label className="input-label__wrapper__label">End Date</label>
                {Array.isArray(formValues.visa) && (
                  <DatePickerComponent
                    startDate={formValues.visa?.[index]?.end_date as Date}
                    setStartDate={(date) =>
                      handleSetDate({ e: date, index, field: "end_date" })
                    }
                    placeholderText="Select end date"
                  />
                )}
              </div>
            </div>
            </div>
            <IconButton
              className="visa-remove"
              icon={<TrashIcon />}
              onClick={() => removeVisa(index)}
            />
          </div>
        ))}
        
      </div>

      <IconButton
      type="button"
        className="visa-add"
        icon={<PlusIcon />}
        onClick={addVisa}
        label="Add another visa"
      />
    </div>
  );
};
