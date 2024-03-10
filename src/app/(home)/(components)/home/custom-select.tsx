import { cn } from '@/lib/utils';
import { Select, SelectItem } from '@nextui-org/react';

interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  value: string | Set<string>;
  isRequired?: boolean;
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded';
  setValue: (e: string) => void;
  data: string[];
  className?: string;
  classNames?: object;
  isLoading?: boolean;
  disabled?: boolean;
}
export const CustomSelect = ({
  label,
  placeholder = 'Chọn',
  value,
  setValue,
  variant = 'bordered',
  isRequired = false,
  isLoading = false,
  data,
  className,
  disabled = false,
  classNames,
}: CustomSelectProps) => {
  return (
    <Select
      variant={variant}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      labelPlacement={'outside'}
      selectedKeys={value}
      classNames={classNames}
      isLoading={isLoading}
      disallowEmptySelection
      className={cn('max-w-xs', className)}
      disabled={disabled}
      onSelectionChange={e => {
        setValue(e as any);
      }}
    >
      {data.map(item => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};
