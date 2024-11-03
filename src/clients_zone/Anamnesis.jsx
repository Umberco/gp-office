import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Select, Textarea, Code, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import {YearPickerInput} from '@mantine/dates'

import classes from "./Anamnesis.module.css"

export function Anamnesis() {
    const [active, setActive] = useState(0);

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        name: '',
        birthDate: '',
        address: '',
        email: '',
        familyHistory: '',
        chronicDiseases: '',
        medications: '',
        allergies: '',
        smoking: '',
        alcohol: '',
        exercise: '',
        currentIssues: '',
        symptoms: '',
      },
  
      validate: (values) => {
      /*   if (active === 0) {
          return {
            username:
              values.username.trim().length < 6
                ? 'Username must include at least 6 characters'
                : null,
            password:
              values.password.length < 6 ? 'Password must include at least 6 characters' : null,
          };
        }
  */
        if (active === 1) {
          return {
            name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
            email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          };
        }
  
        return {}; 
      },
    });
    const [year, setYear] = useState(null);

    const nextStep = () =>
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 3 ? current + 1 : current;
      });
  
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  
    const handleSumbit = async ({values}) =>{

      try {
          console.log(values);
          const { error } = await supabase
            .from("anamnesis")
            .insert({
              name: values.name,
              birthDate: values.birthDate,
              address: values.address,
              email: values.email,
              familyHistory: values.familyHistory,
              chronicDiseases: values.chronicDiseases,
              medications: values.medications,
              allergies: values.allergies,
              smoking: values.smoking,
              alcohol: values.alcohol,
              exercise: values.exercise,
              currentIssues: values.currentIssues,
              symptoms: values.symptoms,
            });
      
          if (error) {
            console.error("Database insert error:", error.message);
            return;
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
  }

    return (
    <Container size="sm" className={classes.wrapper}>
      <form onSubmit={handleSumbit}>
        <Stepper color='#4FC4E3' active={active}>
          <Stepper.Step label="Úvod" description="Osobní údaje">
            <TextInput
              withAsterisk
              label="Jméno a příjmení"
              placeholder="Zadejte jméno a příjmení"
              key={form.key('name')}
              {...form.getInputProps('name')}
              required
            />
            <YearPickerInput
              withAsterisk
              mt="md"
              label="Rok narození"
              placeholder="Vyberte rok narození"
              value={year}
              onChange={setYear}
              key={form.key('birthDate')}
              {...form.getInputProps('birthDate')}
              required
            />
            <TextInput 
              label="Adresa"
              placeholder="Zadejte adresu"
              {...form.getInputProps('address')} 
              required 
            />
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
          </Stepper.Step>
  
          <Stepper.Step label="Anamnéza" description="Zdravotní informace">
            <Textarea 
              label="Rodinná anamnéza" 
              {...form.getInputProps('familyHistory')} 
            />
            <Textarea 
              label="Chronické nemoci" 
              {...form.getInputProps('chronicDiseases')} 
            />
            <Textarea 
            label="Pravidelné léky" 
            {...form.getInputProps('medications')} 
            />
            <Textarea 
            label="Alergie" 
            {...form.getInputProps('allergies')} 
            />
            <Select
              label="Kouření"
              data={['Ne', 'Ano, méně než 10 cigaret denně', 'Ano, více než 10 cigaret denně']}
              {...form.getInputProps('smoking')}
            />
            <Select
              label="Konzumace alkoholu"
              data={['Ne', 'Příležitostně', 'Pravidelně']}
              {...form.getInputProps('alcohol')}
            />
            <Select
              label="Cvičení"
              data={['Ne', '1-2x týdně', 'Více než 2x týdně']}
              {...form.getInputProps('exercise')}
            />
          </Stepper.Step>
  
          <Stepper.Step label="Doplňující informace" description="Aktuální léčba, obtíže">
          <Textarea 
          label="Aktuální zdravotní potíže" 
          {...form.getInputProps('currentIssues')} 
          />
          <Textarea 
          label="Příznaky" 
          {...form.getInputProps('symptoms')} 
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
            {active === 3 && <Button type="submit" color='#4FC4E3'>
              Odeslat
            </Button>}
        </Group>
        </form>
      </Container>
    );
}

export default Anamnesis;