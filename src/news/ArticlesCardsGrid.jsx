import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Loader } from '@mantine/core';
import { supabase } from '../Supabase';
import classes from './ArticlesCardsGrid.module.css';

import DateFormat from "./DateFormat"
import photoPlaceholder from "../assets/fp_placeholder_photo.svg";

export function ArticlesCardsGrid({home}) {

    const  [articles, setArticles] = useState(null)
    var pathNews = ""
    var articlesCount = 9
    home ? pathNews = "/news/" : pathNews = ""
    home ? articlesCount = 3 : articlesCount = 21

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
            .order("created_at", {ascending: false})
            .eq("isActive", true)
            .limit(articlesCount)

            if (error !== null) {
                console.log(error.message)
                return
            }
            //console.log(data)
            setArticles(data)
    }
  

  const cards = articles?.map((article) => (
    <Card key={article.slug} p="md" radius="md" component={Link} to={pathNews + article.slug} className={classes.card} onClick={() => window.scrollTo(0,0)}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image !== null ? import.meta.env.VITE_SUPABASE_STORAGE + article.image : photoPlaceholder} className={classes.articleImg}/>
        {/* <Image src={images[article.slug] ?  images[article.slug] : photoPlaceholder} fit={images[article.slug] ? "cover" : "object-fit"} radius="md" /> */}
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        <DateFormat dateTime={article.created_at}/>
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
        :<SimpleGrid cols={{base: 1, sm: 3}}>{cards}</SimpleGrid>
      }
    </Container>
  );
}