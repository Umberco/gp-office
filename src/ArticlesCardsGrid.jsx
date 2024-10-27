import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Loader } from '@mantine/core';
import { supabase } from './Supabase';
import classes from './ArticlesCardsGrid.module.css';

import DateFormat from "./DateFormat"
import covidImg from "./assets/fp_vaccination_covid.jpg";
import newPatientsImg from "./assets/fp_new_patients.jpg";
import preventiveImg from "./assets/fp_preventive_programs.jpg";

const images = {
  "ockovani-proti-covid-19": covidImg,
  "prijimame-nove-pacienty": newPatientsImg,
  "preventivni-programy": preventiveImg
}

export function ArticlesCardsGrid(home) {

    const  [articles, setArticles] = useState(null)
    var pathNews = "/"
    home ? pathNews = "/news/" : pathNews = "/"

    useEffect(
        () => {
            getArticles()
        },
        []
    )

    const getArticles = async () =>{
        const {data, error} = await supabase
            .from("articles")
            .select()
            .order("id", {ascending: true})

            if (error !== null) {
                console.log(error.message)
                return
            }
            //console.log(data)
            setArticles(data)
    }
  

  const cards = articles?.map((article) => (
    <Card key={article.slug} p="md" radius="md" component={Link} to={pathNews + article.slug} className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={images[article.slug]} radius="md" />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.created_at}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Text c="dimmed">
        {article.description}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      {
        articles === null
        ? <Loader color='cyan' size="lg" type='dots'/>
        :<SimpleGrid cols={{ base: 1, sm: 3 }}>{cards}</SimpleGrid>
      }
    </Container>
  );
}