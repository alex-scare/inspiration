import React, { useEffect } from 'react';
import { Button } from 'react-native';

import { Text, TextInput, View } from '@app/components';
import { StackScreenProps } from '../Navigator.types';
import { observer } from 'mobx-react-lite';
import { Goal, useGoalsStore } from '@app/core';
import { useForm, FormProvider } from 'react-hook-form';

type FormFields = Omit<Goal, 'id' | 'power'>;

const EditGoalModal = ({ navigation, route: { params } }: StackScreenProps<'Goal'>) => {
  const { getGoal, createGoal, updateGoal } = useGoalsStore();

  const form = useForm<FormFields>({
    defaultValues: params.mode === 'update' ? getGoal(params.id) : { title: '' },
  });

  const onSubmit = async (form: FormFields) => {
    // if (!(await form.trigger())) return;
    // setSaveAvailable(false);

    if (params.mode === 'update') updateGoal(params.id, form);
    else createGoal(form);

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => onSubmit(form.getValues())}
          // disabled={!saveAvailable}
        />
      ),
    });
  }, []);

  return (
    <View>
      <FormProvider {...form}>
        <Text>goal title</Text>
        <TextInput<FormFields> name="title" />
      </FormProvider>
    </View>
  );
};

const Wrapper = observer(EditGoalModal);
export { Wrapper as EditGoalModal };
