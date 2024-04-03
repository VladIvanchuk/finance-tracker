import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  CheckboxLabel,
} from "@gluestack-ui/themed";

interface ThemedCheckboxProps {
  size?: "lg" | "sm" | "md";
  isDisabled?: boolean;
  isInvalid?: boolean;
  label: string;
  value: "string";
  onChange: (value: boolean) => void;
  defaultIsChecked?: boolean;
}

const ThemedCheckbox = ({
  size = "lg",
  isDisabled = false,
  isInvalid = false,
  label,
  value,
  onChange,
  defaultIsChecked,
}: ThemedCheckboxProps): React.ReactElement => {
  return (
    <Checkbox
      size={size}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      aria-label={label}
      defaultIsChecked={defaultIsChecked}
    >
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{label}</CheckboxLabel>
    </Checkbox>
  );
};

export default ThemedCheckbox;
