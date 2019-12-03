

export class QIngredient {
  id: number;
  name: string;
  amount: string;
}


export class Drink {
  id: number;
  name: string;
  ingredients: QIngredient[];
  instructions: string;
  userId: number;

  constructor (i:number = 0, n:string = "", ings:QIngredient[] = [], instrs:string = "", uid:number = 0) {
    this.id = i;
    this.name = n;
    this.ingredients = ings;
    this.instructions = instrs;
    this.userId = uid;
  }
}



export class Ingredient {
  id: number;
  name: string;
  comments: string;
}





// types from the API

export class CDBDrinksObject {
  drinks: CDBDrink[];
}


export class CDBDrink {
  idDrink: string;
  strDrink: string;
  //strTags: string;
  //strCategory: string;
  //strGlass: string;
  strInstructions: string;
  //strInstructionsDE: string;
  //strDrinkThumb: string;
  strIngredient1: string; strIngredient2: string; strIngredient3: string; strIngredient4: string; strIngredient5: string;
  strIngredient6: string; strIngredient7: string; strIngredient8: string; strIngredient9: string; strIngredient10: string;
  strIngredient11: string; strIngredient12: string; strIngredient13: string; strIngredient14: string; strIngredient15: string;
  strMeasure1: string; strMeasure2: string; strMeasure3: string; strMeasure4: string; strMeasure5: string;
  strMeasure6: string; strMeasure7: string; strMeasure8: string; strMeasure9: string; strMeasure10: string;
  strMeasure11: string; strMeasure12: string; strMeasure13: string; strMeasure14: string; strMeasure15: string;
  //strCreativeCommonsConfirmed: string;
}

// {"idDrink":"17141","strDrink":"Smut","strDrinkAlternate":null,"strDrinkES":null,"strDrinkDE":null,"strDrinkFR":null,"strDrinkZH-HANS":null,"strDrinkZH-HANT":null,
//  "strTags":null,"strVideo":null,"strCategory":"Punch \/ Party Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Beer mug",
//  "strInstructions":"Throw it all together and serve real cold.","strInstructionsES":null,"strInstructionsDE":"Sch\u00fctte alles zusammen und serviere es kalt.",
//  "strInstructionsFR":null,"strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,
//  "strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rx8k8e1504365812.jpg",
//
//  "strIngredient1":"Red wine","strIngredient2":"Peach schnapps","strIngredient3":"Pepsi Cola","strIngredient4":"Orange juice","strIngredient5":null,"strIngredient6":null,
//  "strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,
//
//  "strMeasure1":"1\/3 part ","strMeasure2":"1 shot ","strMeasure3":"1\/3 part ","strMeasure4":"1\/3 part ","strMeasure5":null,"strMeasure6":null,"strMeasure7":null,
//  "strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,
//
//  "strCreativeCommonsConfirmed":"No","dateModified":"2017-09-02 16:23:32"}