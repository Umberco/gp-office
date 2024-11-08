import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Select, Textarea, Code, Container, NumberInput, Paper, Text, Flex, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabase } from '../Supabase';
import { useNavigate } from 'react-router-dom';

import classes from "./Anamnesis.module.css";

import { IconRosetteDiscountCheck } from "@tabler/icons-react"

export function Anamnesis() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate()
    const [errorText, setErrorText] = useState(null)

    const form = useForm({
        initialValues: {
            name: '',
            birthDate: '',
            address: '',
            email: '',
            phone: '',
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
            const errors = {};
            if (active === 0) {
                if (!values.name.trim()) {
                    errors.name = 'Jméno je povinné';
                }
                if (!values.birthDate) {
                    errors.birthDate = 'Rok narození je povinný';
                }
                if (!values.address.trim()) {
                    errors.address = 'Adresa je povinná';
                }
                if (values.email && !/^\S+@\S+$/.test(values.email)) {
                    errors.email = 'Neplatný email';
                }
            }
            if (active === 1) {
                if (!values.smoking) {
                    errors.smoking = 'Prosím vyberte';
                }
                if (!values.alcohol) {
                    errors.alcohol = 'Prosím vyberte';
                }
                if (!values.exercise) {
                    errors.exercise = 'Prosím vyberte';
                }
            }
            return errors;
        },
    });

    const nextStep = () => {
        if (!form.validate().hasErrors) {
            setActive((current) => (current < 3 ? current + 1 : current));
        }
    };

    const prevStep = () => setActive((current) => {setErrorText(null); return (current > 0 ? current - 1 : current )});

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            const { error } = await supabase
                .from("anamnesis")
                .insert(values);

            if (error) {
                console.error("Database insert error:", error.message)
                setErrorText("Database insert error:", error.message)
                return;
            }

            setActive(4);
        } catch (err) {
            console.error("Unexpected error:", err)
            setErrorText("Unexpected error:", err)
        }
    };

    return (
        <Container size="sm" className={classes.wrapper}>
          {active === 4
          ?<Container justify='center'>
             <Paper shadow='xs' mt="xl" p="md">
                <Flex justify="center"align="center" direction="column" gap='md'>
                  <IconRosetteDiscountCheck width={80} height={80} color='#4FC4E3'/>
                  <Text>Vaši anamnézu jsme v pořádku přijali. Děkujeme za vyplnění.</Text>
                  <Button color='#4FC4E3' onClick={() => navigate("/clients")}>Zpět na hlavní stránku</Button>
                </Flex>
             </Paper>
           </Container>
          :(
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stepper color='#4FC4E3' active={active}>
                    <Stepper.Step label="Úvod" description="Osobní údaje">
                        <TextInput
                            withAsterisk
                            label="Jméno a příjmení"
                            placeholder="Zadejte jméno a příjmení"
                            {...form.getInputProps('name')}
                        />
                        <NumberInput
                            withAsterisk
                            mt="md"
                            label="Rok narození"
                            placeholder="Zadejte rok narození"
                            min={1920}
                            max={2024}
                            defaultValue={1980}
                            {...form.getInputProps('birthDate')}
                        />
                        <TextInput
                            withAsterisk
                            label="Adresa"
                            placeholder="Zadejte adresu"
                            {...form.getInputProps('address')}
                        />
                        <TextInput
                            mt="md"
                            label="Email"
                            placeholder="Zadejte email"
                            {...form.getInputProps('email')}
                        />
                        <NumberInput
                            mt="md"
                            label="Telefon"
                            prefix="+420"
                            placeholder="Zadejte telefoní číslo"
                            hideControls
                            {...form.getInputProps('phone')}
                        />
                    </Stepper.Step>

                    <Stepper.Step label="Anamnéza" description="Zdravotní informace">
                        <Textarea
                            label="Rodinná anamnéza"
                            placeholder="Popište zdravotní stav Vašich rodičů - zaměřte se prosím především na chronické nemoci"
                            {...form.getInputProps('familyHistory')}
                        />
                        <Textarea
                            label="Chronické nemoci"
                            placeholder="Vyplňte s jakými chronickými nemocemi se léčíte"
                            {...form.getInputProps('chronicDiseases')}
                        />
                        <Textarea
                            label="Pravidelné léky"
                            placeholder="Seznam léků, které pravidelně užíváte včetně dávkování"
                            {...form.getInputProps('medications')}
                        />
                        <Textarea
                            label="Alergie"
                            placeholder="Máte na něco alergii? Případně uveďte i projevy"
                            {...form.getInputProps('allergies')}
                        />
                        <Select
                            withAsterisk
                            label="Kouření"
                            placeholder="Vyberte..."
                            data={['Ne', 'Ano, méně než 10 cigaret denně', 'Ano, více než 10 cigaret denně']}
                            {...form.getInputProps('smoking')}
                        />
                        <Select
                            withAsterisk
                            label="Konzumace alkoholu"
                            placeholder="Vyberte..."
                            data={['Ne', 'Příležitostně', 'Pravidelně']}
                            {...form.getInputProps('alcohol')}
                        />
                        <Select
                            withAsterisk
                            label="Cvičení"
                            placeholder="Vyberte..."
                            data={['Ne', '1-2x týdně', 'Více než 2x týdně']}
                            {...form.getInputProps('exercise')}
                        />
                    </Stepper.Step>

                    <Stepper.Step label="Doplňující informace" description="Aktuální léčba, obtíže">
                        <Textarea
                            label="Aktuální zdravotní potíže"
                            placeholder="Napište Vaše aktuální zdravotní komplikace"
                            {...form.getInputProps('currentIssues')}
                        />
                        <Textarea
                            label="Příznaky"
                            placeholder="Specifikujte příznaky"
                            {...form.getInputProps('symptoms')}
                        />
                    </Stepper.Step>
                    <Stepper.Completed>
                        Děkujeme za aktualizaci Vaší lékařské anamnézy. Pečlivě si prosím zkontrolujte vyplněné údaje a případně potvrďte odeslání tlačítkem <strong>Odeslat</strong>:
                        <Paper shadow='xs' mt="xl" p="md">
                            <Flex direction="column" gap='xs'>
                                <Text><strong>Jméno a příjmení:</strong> {form.values.name}</Text>
                                <Text><strong>Rok narození:</strong> {form.values.birthDate}</Text>
                                <Text><strong>Adresa:</strong> {form.values.address}</Text>
                                <Text><strong>Email:</strong> {form.values.email}</Text>
                                <Text><strong>Telefon:</strong> {form.values.phone}</Text>
                                <Text><strong>Rodinná anamnéza:</strong> {form.values.familyHistory}</Text>
                                <Text><strong>Chronické nemoci:</strong> {form.values.chronicDiseases}</Text>
                                <Text><strong>Pravidelné léky:</strong> {form.values.medications}</Text>
                                <Text><strong>Alergie:</strong> {form.values.allergies}</Text>
                                <Text><strong>Kouření:</strong> {form.values.smoking}</Text>
                                <Text><strong>Konzumace alkoholu:</strong> {form.values.alcohol}</Text>
                                <Text><strong>Cvičení:</strong> {form.values.exercise}</Text>
                                <Text><strong>Aktuální zdravotní potíže:</strong> {form.values.currentIssues}</Text>
                                <Text><strong>Příznaky:</strong> {form.values.symptoms}</Text>
                            </Flex>
                        </Paper>
                        {errorText === null
                        ?<></>
                        :<Alert variant="light" color="red" title="Chyba" my="md">
                            Chyba při odesílání. Zkontrolujte připojení k internetu a zkuste to prosím později.<br></br><br></br>
                            {errorText}
                         </Alert>
                        }
                    </Stepper.Completed>
                </Stepper>

                <Group justify="flex-end" mt="xl">
                    {active !== 0 && (
                        <Button variant="default" color='#4FC4E3' onClick={prevStep}>
                            Zpět
                        </Button>
                    )}
                    {active !== 3 && (
                        <Button color='#4FC4E3' onClick={nextStep}>
                            Další
                        </Button>
                    )}
                    {active === 3 && (
                        <Button type="submit" color='#4FC4E3'>
                            Odeslat
                        </Button>
                    )}
                </Group>
            </form>
          )
          }
            
        </Container>
    );
}

export default Anamnesis;
