import React, { useEffect } from 'react';
import { Button } from 'react-native';

import { TextInput, View } from '@app/components';
import { StackScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { GoalEditableFields, useGoalsStore } from '@app/core';
import { useForm, FormProvider } from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';
import { IconList } from './IconList';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormFields = GoalEditableFields;

const getResolver = () =>
  yupResolver<yup.SchemaOf<FormFields>>(
    yup.object({
      icon: yup.mixed().defined().required(),
      title: yup.string().required(),
    }),
  );

const EditGoalModal = ({ navigation, route: { params } }: StackScreenProps<'Goal'>) => {
  const {
    goals: { getGoal, updateGoal },
    createGoal,
  } = useGoalsStore();

  const form = useForm<FormFields>({
    defaultValues: params.mode === 'update' ? getGoal(params.id) : { title: '' },
    resolver: getResolver(),
  });

  const onSubmit = async (fields: FormFields) => {
    if (!(await form.trigger())) return;
    // setSaveAvailable(false);

    if (params.mode === 'update') updateGoal(params.id, fields);
    else createGoal(fields);

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
    <View style={styles.view}>
      <FormProvider {...form}>
        <TextInput<FormFields> name="title" placeholder="Name your goal" />

        <IconList name="icon" />
      </FormProvider>
    </View>
  );
};

const styles = {
  view: tw.style('flex p-3 pt-5'),
};

const Wrapper = observer(EditGoalModal);
export { Wrapper as EditGoalModal };
