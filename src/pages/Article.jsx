import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Loader } from '@mantine/core';

import { supabase } from '../Supabase';
import covidImg from "../assets/fp_vaccination_covid.jpg";
import newPatientsImg from "../assets/fp_new_patients.jpg";
import preventiveImg from "../assets/fp_preventive_programs.jpg";

const images = {
  "ockovani-proti-covid-19": covidImg,
  "prijimame-nove-pacienty": newPatientsImg,
  "preventivni-programy": preventiveImg
}


function Article() {
    const {articleId} = useParams()

    const  [articles, setArticles] = useState(null)

    useEffect(
        () => {
            getArticles()
        },
        [articleId]
    )

    const getArticles = async () =>{
        const {data, error} = await supabase
            .from("articles")
            .select()
            .eq("slug", articleId)
            .limit(1)
            .single()

            if (error !== null) {
                console.log(error.message)
                return
            }
            console.log(data)
            setArticles(data)
    }

      
    return ( 
        <>
        <Container>       

        
        {
            articles === null
            ? <Loader color='cyan' size="lg" type='dots'/>
            : <>
            <h1>{articles.title}</h1>
            <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
                <div style={{flex: "1", paddingTop: "15px"}}>
                    <img src={images[articles.slug]} style={{width: "350px", borderRadius: "10px"}}/>
                </div>
                <p style={{flex: "1", paddingTop: "15px"}}>
                    {articles.body}
                </p>
            </div>
            </>
        }
        </Container>
        
        </>
     );
}

export default Article;