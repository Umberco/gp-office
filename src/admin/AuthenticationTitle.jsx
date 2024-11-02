import {useState} from "react"
import {supabase} from "../Supabase"

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
  import classes from './AuthenticationTitle.module.css';
  
  
  export function AuthenticationTitle() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Vítejte zpátky
        </Title>
{/*         <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text> */}
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="mail@gmail.com" required />
          <PasswordInput label="Heslo" placeholder="Vaše heslo" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" color='#4FC4E3'>
            Přihlásit se
          </Button>
        </Paper>
      </Container>
    );
  }