import { Injectable } from '@angular/core';
import { AssetsServices } from '../assets/assets.service';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private AssetsServices1 :AssetsServices) { 



  }


// getAssetsPopupData(id : string ) : string 
// {

//  let asset =  this.AssetsServices1.getAssetbyId(id);
// let  content =  "<Div> Asset id: "+asset.Id+"</Div>"  +
//                 "<Div> descrption: "+asset.descrption+"</Div>"  ; 

// return content ; 
// }

getAssetsPopupData(Id : string ) : string 
{

 //let asset =  this.AssetsServices1.getAssetbyId(id);
let  content =  "<Div> Asset id: "+Id+"</Div>"  +
                "<Div> descrption: "+Id+"</Div>"  ; 

return content ; 
}


}
