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
  `I fiori sono un’orgogliosa affermazione che un raggio di bellezza valorizza tutte le utilità del mondo.`,
  `Un giardino è un riflesso dell’anima di chi lo coltiva. - Proverbio`,
  `Anche il più piccolo dei fiori può illuminare una stanza oscura. - Sconosciuto`,
  `I fiori sono la poesia della terra. - Gerard De Nerval`,
  `Chi semina gentilezza raccoglie felicità, proprio come i fiori che sbocciano in primavera. - Sconosciuto`,
  `Un fiore sboccia per la sua gioia, non per cercare attenzione. - Oscar Wilde`,
  `La bellezza di un fiore sta nella sua semplicità e nel suo essere unico. - Sconosciuto`,
  `Anche nei terreni più aridi, i fiori trovano un modo per crescere. - Proverbio`,
  `Come i fiori si volgono al sole, così noi dobbiamo cercare la luce della felicità. - Sconosciuto`,
  `Un campo di fiori è un promemoria che la bellezza è dappertutto, se guardiamo con attenzione. - Sconosciuto`,
  `Ogni fiore che sboccia ci ricorda che i cambiamenti portano nuova vita. - Sconosciuto`,
  `La natura non ha fretta, eppure tutto si compie, come un fiore che sboccia al momento giusto. - Lao Tzu`,
  `I fiori non competono tra loro; semplicemente sbocciano. - Zen Proverb`,
  `Ogni fiore è un’anima che sboccia nella natura. - Gerard De Nerval`
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