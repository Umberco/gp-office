import { Text, Box, Stack, rem } from "@mantine/core";
import {
  IconIdBadge2,
  IconPhone,
  IconMapPin,
  IconAt,
} from "@tabler/icons-react";
import classes from "./ContactIcons.module.css";
function ContactIcon({ icon: Icon, title, description, ...others }) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}
const contactData = [
  { title: "IČO", description: "123456789", icon: IconIdBadge2 },
  { title: "Email", description: "ordinacehk@gmail.com", icon: IconAt },
  { title: "Telefon", description: "+420 777 888 999", icon: IconPhone },
  {
    title: "Adresa",
    description: "Pospíšilova 281/18 Hradec Králové 500 03",
    icon: IconMapPin,
  },
];

export function ContactIconsList() {
  const items = contactData.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
