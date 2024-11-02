import {useState} from "react"
import { supabase } from "../Supabase"

import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack
} from "@mantine/core"

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(["login", "register"])
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : "Neplatný email"),
      password: val =>
        val.length <= 6 ? "Heslo musí obsahovat alespoň 6 znaků" : null
    }
  })


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Prihasjui", form.email, form.password)

    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if (!error && data) {
        console.log(data)
    }

    if (error){
        console.log(error)
    }

  }



  return (
    <Paper radius="md" p="xl" my="md" withBorder {...props}>
      <Text size="lg" ta="center" fw={500}>
        Vítejte v administrační zóně
      </Text>

      <Divider label="Zadejte své přihlašovací údaje" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={event =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="email@gmail.com"
            value={form.values.email}
            onChange={event =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Heslo"
            placeholder="Vaše heslo"
            value={form.values.password}
            onChange={event =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Heslo musí obsahovat alespoň 6 znaků"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={event =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="flex-end" mt="xl">
{/*         //Registraci zatím nedělám, jenom pro administraci nebude třeba
            <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button type="submit" radius="xl" color="#4FC4E3">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
