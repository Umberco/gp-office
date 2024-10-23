import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';
import covidImg from "./assets/fp_vaccination_covid.jpg";
import newPatientsImg from "./assets/fp_new_patients.jpg";
import preventiveImg from "./assets/fp_preventive_programs.jpg";

const mockdata = [
  {
    title: 'Očkování proti COVID-19',
    image:
      covidImg,
    date: 'Září 9, 2022',
  },
  {
    title: 'Příjmáme nové pacienty',
    image:
      newPatientsImg,
    date: 'Srpen 27, 2022',
  },
  {
    title: 'Preventivní programy',
    image:
      preventiveImg,
    date: 'Červen 9, 2022',
  }
];

export function ArticlesCardsGrid() {
  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} radius="md" />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Text c="dimmed">
      Body text for whatever you’d like to say. 
      Add main takeaway points, quotes, anecdotes, 
      or even a very very short story. 
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{cards}</SimpleGrid>
    </Container>
  );
}