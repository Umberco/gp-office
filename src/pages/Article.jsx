import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Loader, Button } from '@mantine/core';
import { supabase } from '../Supabase';

import ArticleForm from '../news/ArticleForm';

import fp_placeholder_photo from "../assets/fp_placeholder_photo.svg";
import covidImg from "../assets/fp_vaccination_covid.jpg";
import newPatientsImg from "../assets/fp_new_patients.jpg";
import preventiveImg from "../assets/fp_preventive_programs.jpg";

const images = {
  "ockovani-proti-covid-19": covidImg,
  "prijimame-nove-pacienty": newPatientsImg,
  "preventivni-programy": preventiveImg
}

function ArticleDetail({article, onEdit}){
    return(
        <>
        <h1>{article.title}</h1>
        <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
            <div style={{flex: "1", paddingTop: "15px"}}>
                <img src={images[article.slug] ? images[article.slug] : fp_placeholder_photo} style={{width: "350px", borderRadius: "10px"}}/>
            </div>
            <div style={{display: "flex", flexDirection: "column", flex: "1", alignItems: "flex-end"}}>
            <p style={{paddingTop: "15px", textAlign: "justify"}}>
                {article.body}<br></br>
            </p>
            <Button onClick={onEdit} color='#4FC4E3'>Editovat</Button>
            </div>
        </div>
        </>
    )
}



function Article() {
    const {articleId} = useParams()

    const [articles, setArticles] = useState(null)
    const [isEdited, setIsEdited] = useState(false)
    const [showInsert, setShowInsert] =  useState(false)
    const [hideInsertBtn, setHideInsertBtn] = useState(false)

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
            setArticles(data)
    }

    const addArticle = async ({values}) =>{
            console.log(values)
        const {error} =  await supabase
            .from("articles")
            .insert({
                title: values.title,
                description: values.description,
                body: values.body
            })
            console.log(error)

            if (error !== null) {
                console.log(error.message)
                return
            }
            getArticles()
            setShowInsert(false)
            setIsEdited(false)
            setHideInsertBtn(false)

    }

    const editArticle = async ({values, articleId}) => {

        console.log(values)
        console.log(articleId)
    const {error} =  await supabase
        .from("articles")
        .update({
            title: values.title,
            description: values.description,
            body: values.body
        })
        .eq("id", articleId)
        console.log(error)

        if (error !== null) {
            console.log(error.message)
            return
        }
        getArticles()
        setShowInsert(false)
        setIsEdited(false)
        setHideInsertBtn(false)
}

      
    return ( 
        <>
        <Container>
        {hideInsertBtn === false
            ?<Button onClick={() => {setShowInsert(true); setHideInsertBtn(true)}} color='#4FC4E3' my="lg">Vložit nový článek</Button>
            :<Button onClick={() => {setShowInsert(false); setIsEdited(false); setHideInsertBtn(false)}} color='red' my="lg">Zrušit</Button>
        }
        {   
            showInsert === true
            ? <ArticleForm
                title={""}
                description={""}
                body={""} 
                onSubmit={addArticle}
              />
            : articles === null
            ? <Loader color='cyan' size="lg" type='dots'/>
            : (
                isEdited
                ? <ArticleForm
                    title={articles.title}
                    description={articles.description}
                    body={articles.body}
                    onSubmit={editArticle}
                    articleId={articles.id}
                />
                : <ArticleDetail article={articles} onEdit={() => {setIsEdited(true); setHideInsertBtn(true)}}/>
              )
            
        }
        </Container>
        </>
     );
}

export default Article;