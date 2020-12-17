import axios from "axios";


export const searchByName = async(keyword)=>{
   try {
       const res = await axios({
           method:"GET",
           url:"http://localhost:8000/api/product/search?q="+keyword
       });
   
       if(res.data.status=="success")
       {    
        
           alert("");
        window.setTimeout(()=>{
            location.assign("/product/search?q="+keyword)
        }, 2000);
       }
   } catch (error) {
       console.log(error);
   }
}