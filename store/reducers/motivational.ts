import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface MotivationalSentences {
  value: string
}

const sentences = [
    `La felicità trattenuta è il seme; La felicità condivisa è il fiore. - John Harrigan`,
    `L’amore è il fiore che devi lasciare crescere. - John Lennon`,
    `Se guardi nella direzione giusta, puoi vedere che il mondo intero è un giardino. - Hodgson Burnett`,
    `Prenditi il tuo tempo per annusare le rose. - Proverbio`,
    `L’amore è come i fiori di campo; si trova spesso nei posti più improbabili. - Ralph Waldo Emerson`,
    `Un fiore non può sbocciare senza il sole, e un uomo non può vivere senza amore. - Max Müller`,
    `Ci sono sempre fiori per chi vuole vederli. - Henri Matisse`,
    `La vita è il fiore per il quale l’amore è il miele. - Victor Hugo`,
    `Che posto solitario sarebbe un mondo senza fiori di campo! - Roland R. Kemler`,
    `Preferirei indossare fiori tra i capelli, piuttosto che diamanti al collo. - Sconosciuto`,
    `I fiori sono un’orgogliosa affermazione che un raggio di bellezza valorizza tutte le utilità del mondo.`
]  


// Define the initial state using that type
const initialState: MotivationalSentences = {
  value: sentences[getRandomInt(sentences.length)]
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  


export const motivationalSlice = createSlice({
  name: 'wordgarden',
  initialState,
  reducers: {
    daysentence: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = sentences[getRandomInt(sentences.length)]
    }
  }
})

// Action creators are generated for each case reducer function
export const { daysentence } = motivationalSlice.actions

export default motivationalSlice.reducer