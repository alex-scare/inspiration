import React from 'react';
import { FieldPath, useController, useFormContext } from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';
import { TextInput as RnTextInput, TextInputProps as RnTextInputProps } from 'react-native';

interface Props<Form> extends Omit<RnTextInputProps, 'onChangeText' | 'value'> {
  name: FieldPath<Form>;
  onAfterChangeText?: (value: string) => void;
}

const TextInput = <Form extends object>({
  name,
  onAfterChangeText,
  style,
  ...props
}: Props<Form>) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return (
    <RnTextInput
      value={field.value}
      onChangeText={(value) => {
        field.onChange(value);
        onAfterChangeText?.(value);
      }}
      onBlur={() => {
        if (!field.value?.length) return;
        const value = field.value.trim();
        field.onChange(value);
        onAfterChangeText?.(value);
      }}
      style={[styles.main, style]}
      {...props}
    />
  );
};

const styles = {
  main: tw.style('rounded-xl'),
};

const Wrapper = React.memo(TextInput) as typeof TextInput;
export { Wrapper as TextInput };
