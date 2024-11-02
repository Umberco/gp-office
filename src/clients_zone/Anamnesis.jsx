import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from "./Anamnesis.module.css"

export function Anamnesis() {
    const [active, setActive] = useState(0);

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        username: '',
        password: '',
        name: '',
        email: '',
        website: '',
        github: '',
      },
  
      validate: (values) => {
        if (active === 0) {
          return {
            username:
              values.username.trim().length < 6
                ? 'Username must include at least 6 characters'
                : null,
            password:
              values.password.length < 6 ? 'Password must include at least 6 characters' : null,
          };
        }
  
        if (active === 1) {
          return {
            name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
            email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          };
        }
  
        return {};
      },
    });
  
    const nextStep = () =>
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 3 ? current + 1 : current;
      });
  
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  
    return (
    <Container size="sm" className={classes.wrapper}>
        <Stepper color='#4FC4E3' active={active}>
          <Stepper.Step label="Úvod" description="Osobní údaje">
            <TextInput
              label="Jméno"
              placeholder="Jméno"
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <TextInput
              mt="md"
              label="Příjmení"
              placeholder="Příjmení"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
          </Stepper.Step>
  
          <Stepper.Step label="Anamnéza" description="Zdravotní informace">
            <TextInput
              label="Name"
              placeholder="Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
          </Stepper.Step>
  
          <Stepper.Step label="Doplňující informace" description="Léčba, obtíže">
            <TextInput
              label="Website"
              placeholder="Website"
              key={form.key('website')}
              {...form.getInputProps('website')}
            />
            <TextInput
              mt="md"
              label="GitHub"
              placeholder="GitHub"
              key={form.key('github')}
              {...form.getInputProps('github')}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Hotovo! Shrnutí:
            <Code block mt="xl">
              {JSON.stringify(form.getValues(), null, 2)}
            </Code>
          </Stepper.Completed>
        </Stepper>
  
        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" color='#4FC4E3' onClick={prevStep}>
              Zpět
            </Button>
            )}
          {active !== 3 && <Button color='#4FC4E3' onClick={nextStep}>
              Další
            </Button>}
        </Group>
      </Container>
    );
}

export default Anamnesis;