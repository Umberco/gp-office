import {
  Paper,
  Text,
/*   TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Table, */
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import { OfficeHoursTable } from "./OfficeHoursTable";
import classes from "./GetInTouch.module.css";

export function GetInTouch() {
  return (
    <Paper shadow="md" radius="lg" mb="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ background: "#4FC4E3" }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Ordinační hodiny
          </Text>

          <OfficeHoursTable />

          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Ordinace Hradecká s.r.o.
          </Text>

          <ContactIconsList />
        </div>

        <iframe
          style={{ border: "none", borderRadius: "15px", width: "100%" }}
          src="https://frame.mapy.cz/s/kunetosona"
        ></iframe>

        {/*       
          //NICE TO HAVE - Kontaktní formulář přes mail
          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <Text fz="lg" fw={700} className={classes.title}>
            Kontaktujte nás
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Jméno" placeholder="Jméno" />
              <TextInput label="Email" placeholder="pacient@gmail.com" required />
            </SimpleGrid>

            <TextInput mt="md" label="Předmět" placeholder="Předmět" required />

            <Textarea
              mt="md"
              label="Vaše zpráva"
              placeholder="Sem prosím napište Váš dotaz"
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                Poslat zprávu
              </Button>
            </Group>
          </div>
        </form> */}
      </div>
    </Paper>
  );
}
