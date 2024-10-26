import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mantine/core';

import covidImg from "../assets/fp_vaccination_covid.jpg"

function Article() {
    const {articleId} = useParams()

    const article = {
        title: 'Očkování proti COVID-19',
        image: covidImg,
        date: 'Září 9, 2022',
    }
      
    return ( 
        <>
        <Container>
        <h1>{article.title}</h1>
        <div style={{display: "flex"}}>
        <div style={{flex: "1"}}>
            <p>{article.date}</p>
            <img src={covidImg} style={{width: "300px", height: "300px"}}/>
            <p>{articleId}</p>
        </div>
        <p style={{flex: "1", paddingTop: "15px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quam recusandae blanditiis accusamus quas sit velit corrupti, 
            beatae esse inventore culpa repellendus eius eos aut temporibus in obcaecati ducimus quod eveniet.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quam recusandae blanditiis accusamus quas sit velit corrupti, 
            beatae esse inventore culpa repellendus eius eos aut temporibus in obcaecati ducimus quod eveniet.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quam recusandae blanditiis accusamus quas sit velit corrupti, 
            beatae esse inventore culpa repellendus eius eos aut temporibus in obcaecati ducimus quod eveniet.
        </p>
        </div>
        
        </Container>
        
        </>
     );
}

export default Article;