import { supabase } from "../Supabase";
import { useState } from "react";

function ImageUpload() {
    
    const [file, setFile] = useState()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (file === null){
            console.log("Není vybrán žádný soubor")
            return
        }

        const {data, error} = await supabase.storage 
            .from("articles")
            .upload("profily/" + file.name, file)
        //ošetřit nahrání stejné fotky - pokud je stejné jméno
        console.log(data)
        console.log(error)
    }
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    return ( 
    <>
    <form onSubmit={handleSubmit}>
        <input 
            type="file"
            onChange={handleFileChange}
        />
        <button>Odeslat</button>
    </form>
    </> );
}

export default ImageUpload;