import { NumberInput, Group, Button, Box } from '@mantine/core';
import { UserFormProvider, useUserForm } from '@/features/form2/UserContext';
import { NameInput } from '@/features/form2/NameInput';
import { isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';

export const UserForm = (props: { csrfToken: string}) => {
  const form = useUserForm({
    initialValues: {
      age: 22,
      name: '山田太郎',
    },

    validate: {
      name: isNotEmpty('名前は必須項目です'),
      age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
    },
  });

  const handleSubmit = async () => {
    const response = await fetch('/api/form-handler/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // csrf_token: 'invalid token'
        csrf_token: props.csrfToken
      }),
    });
    console.log(await response.json());
  };

  return (
    <UserFormProvider form={form}>
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit(() => handleSubmit())}>
        <NumberInput label="Age" withAsterisk {...form.getInputProps('age')} />
        <NameInput />
        <Group position="center" mt="md">
          <Button type="submit">送信</Button>
        </Group>
      </Box>
    </UserFormProvider>
  );
};
