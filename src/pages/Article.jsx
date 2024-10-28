import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Loader, Button } from '@mantine/core';
import { supabase } from '../Supabase';

import ArticleForm from '../ArticleForm';

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
                <img src={images[article.slug]} style={{width: "350px", borderRadius: "10px"}}/>
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

function ArticleEdit({book, onSave, onCancel}) {


    return ( 
        <>
        <h1>formular na upravu</h1>
        </>
     );
}

function ArticleAdd() {

    return (
        <>
        </>
     );
}


function Article() {
    const {articleId} = useParams()

    const [articles, setArticles] = useState(null)
    const [isEdited, setIsEdited] = useState(false)
    const [showInsert, setShowInsert] =  useState(false)
    //const [hideInsertBtn, setHideInsertBtn] = useState(false)

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

    const addArticle = async () =>{

        const {error} =  await supabase
            .from("articles")
            .insert({
                //data z formulare
            })

            if (error) {
                console.log(error.message)
            }
    }
      
    return ( 
        <>
        <Container>
        {showInsert === false
            ?<Button onClick={() => setShowInsert(true)} color='#4FC4E3' my="lg">Vložit nový článek</Button>
            :<Button onClick={() => {setShowInsert(false); setIsEdited(false)}} color='red' my="lg">Zrušit</Button>
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

/*                  article={articles}
                    onSave={saveBook}
                    onCancel={() => {setIsEdited(false)}} */
                    title={articles.title}
                    description={articles.description}
                    body={articles.body}
                />
                : <ArticleDetail article={articles} onEdit={() => {setIsEdited(true); setShowInsert(true)}}/>
              )
            
        }
        </Container>
        </>
     );
}

export default Article;