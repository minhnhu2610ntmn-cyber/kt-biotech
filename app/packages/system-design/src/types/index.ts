import { SingleValue, MultiValue, ActionMeta } from 'react-select';

export interface MessagesProviderProps {
  children: React.ReactNode;
}

export interface MessageState {
  messages: Record<string, string> | null;
  locale: string;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps {
  options: OptionType[];
  value?: OptionType | OptionType[] | null;
  onChange: (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}
