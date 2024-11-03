import { Link } from 'react-router-dom';
import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { IconCalendarClock, IconHelpHexagon, IconHeartbeat } from '@tabler/icons-react';
  import classes from './ClientsMenu.module.css';
  
  const mockdata = [
    {
      title: 'Objednání',
      description:
        'Snadno a rychle si zde můžete domluvit termín návštěvy u našeho praktického lékaře. Vyberte si čas, který vám nejlépe vyhovuje, a my se postaráme o zbytek.',
      icon: IconCalendarClock,
      link: '/clients'
    },
    {
      title: 'Otázky a odpovědi',
      description:
        'Máte dotazy ohledně svého zdraví nebo našich služeb? V této sekci najdete odpovědi na nejčastější otázky. Pokud nenajdete, co hledáte, neváhejte nás kontaktovat.',
      icon: IconHelpHexagon,
      link: "/clients/faq"
    },
    {
      title: 'Anamnéza',
      description:
        'Zde můžete vyplnit a aktualizovat svou zdravotní anamnézu. Tyto informace nám pomohou lépe porozumět vašemu zdravotnímu stavu a poskytnout vám co nejlepší péči.',
      icon: IconHeartbeat,
      link: "/clients/anamnesis"
    },
  ];
  
  export function ClientsMenu() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      <Link to={feature.link} className={classes.navLink}>
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={theme.colors.cyan[6]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
      </Link>
    ));
  
    return (
      <Container size="lg" py="xl">
        <Group justify="center">
          <Badge variant="filled" size="lg" color='cyan'>
            KLIENTSKÁ ZÓNA
          </Badge>
        </Group>
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Víteje v naší klientské zóně
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
            Zde najdete všechny potřebné informace a nástroje pro pohodlnou správu svého zdraví. Naše klientská zóna je rozdělena do tří hlavních sekcí:
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }