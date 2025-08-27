/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from "react-select";

const InputDropdown = ({
  name,
  value,
  options = [],
  placeholder = "Select",
  onSelect = () => {},
}: any) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? "#515462" : "#C8C8C8", // prev is #8F4E7F
      boxShadow: state.isFocused ? "#172733" : provided.boxShadow, // prev is #8F4E7F
      "&:hover": state.isFocused ? "#172733" : provided["&:hover"], // prev is #8F4E7F
      backgroundColor: state.isDisabled ? "#FFFFFF" : provided.backgroundColor,
      color: state.isDisabled ? "#FFFFFF" : provided.color,
      opacity: state.isDisabled && value == null ? 0.4 : provided.opacity,
      borderRadius: "4px",
      border: "1,5px",
      width: "100%",
      height: "44px",
      fontWeight: 400,
    }),
    valueContainer: (base: any) => ({
      ...base,
      flexWrap: "noWrap",
      innerWidth: "100%",
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  const ValueContainer = (props: any) => {
    return <components.ValueContainer {...props} />;
  };

  const Placeholder = (props: any) => {
    return (
      <components.Placeholder {...props}>
        <div className="flex items-center justify-between font-normal text-default-black-4 ">
          <p>{props.children}</p>
        </div>
      </components.Placeholder>
    );
  };

  return (
    <Select
      menuPortalTarget={document.body}
      value={value}
      defaultMenuIsOpen={false}
      menuPlacement={"auto"}
      options={options}
      isSearchable={false}
      placeholder={placeholder}
      styles={customStyles}
      name={name}
      className={"text-sm w-full h-11"}
      components={{
        IndicatorSeparator: () => null,
        Placeholder,
        ValueContainer,
      }}
      onChange={(selectedOption) => {
        onSelect({
          target: {
            name,
            value: selectedOption,
          },
        });
      }}
      controlShouldRenderValue={true}
    />
  );
};

export default InputDropdown;
