import { put, del, list } from '@vercel/blob'
import { env } from './env'

export interface Deck {
  id: string
  key: string
  name: string
  createdAt: string
}

export interface Card {
  id: string
  deckKey: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string
}

// Initialize with default decks and patrol cards
const DEFAULT_DECKS: Deck[] = [
  { id: 'patrol', key: 'patrol', name: 'Patrol', createdAt: new Date().toISOString() },
  { id: 'ec', key: 'ec', name: 'EC', createdAt: new Date().toISOString() },
  { id: 'bdoc', key: 'bdoc', name: 'BDOC', createdAt: new Date().toISOString() },
  { id: 'alarms', key: 'alarms', name: 'Alarms', createdAt: new Date().toISOString() },
  { id: 'armory', key: 'armory', name: 'Armory', createdAt: new Date().toISOString() }
]

const PATROL_CARDS: Card[] = [
  // OVI Response Procedures
  { id: '1', deckKey: 'patrol', question: "What Form is used for OVI/Alcohol related responses", answer: "DD Form 1920", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', deckKey: 'patrol', question: "What is utilized to record results of SFST", answer: "DD Form 1920 and OVI Field Notes", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', deckKey: 'patrol', question: "Before Conducting SFST what must the SF Member do", answer: "Explain and Demonstrate", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', deckKey: 'patrol', question: "IF information not requested in 1920 where should the sf member put it", answer: "Incident report", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', deckKey: 'patrol', question: "What are the SFST Approved test", answer: "Horizontal Gaze Nystagmus, Walk and Turn, One Leg Stand (Additional SFST are IAW AFI 31-218)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '6', deckKey: 'patrol', question: "How can an SF member be certified on SFST", answer: "MUST attend the National Highway Traffic Safety Administration (NHTSA) Certification Course", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '7', deckKey: 'patrol', question: "If a member is not certified, what must they do", answer: "Contact a certified member to conduct SFST", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '8', deckKey: 'patrol', question: "What is The Department of Defense's policy to adopt and make state traffic laws applicable on military installations", answer: "IAW DoDD 5525.4, Para 3", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '9', deckKey: 'patrol', question: "What is the OVI 3 part response procedure", answer: "Vehicle in motion, personal contact, pre arrest screening", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '10', deckKey: 'patrol', question: "If an OVI arrest is made who determines if a tow needs to be met", answer: "Flight chief determine disposition IAW WPAFBI 31-118 PARA 3.7", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '11', deckKey: 'patrol', question: "What MUST be accomplished with all tows", answer: "Inventory Worksheet and incident report", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '12', deckKey: 'patrol', question: "What will a driver of a vehicle cited for OVI be advised of prior to BAC testing", answer: "Implied Consent Law", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '13', deckKey: 'patrol', question: "What are the 3 different methods to obtain BAC", answer: "Blood, Breath, and urine", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '14', deckKey: 'patrol', question: "Does a violate have an absolute right to have an attorney present before deciding to submit a test", answer: "NO", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '15', deckKey: 'patrol', question: "After the implied consent policy is read how many minutes will be given for the deprivation period", answer: "20 minutes", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '16', deckKey: 'patrol', question: "What are you checking during the deprivation period", answer: "if the suspect has anything in their mouth. Also deny any food or drink until after testing.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '17', deckKey: 'patrol', question: "How long do you have to conduct all testing", answer: "Federal law does not dictate but we follow Ohio standards which state 3 hr from point of initial stop.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  // Aircraft Piracy (Hijacking Plan)
  { id: '18', deckKey: 'patrol', question: "Immediately upon notification of an unannounced air craft movement in your area what will you do", answer: "Response and prevent aircraft movement (position vehicle at rear and sides if possible, but at minimum block the front.) If authorities want you out of site block nearest exit while remaining out of site.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '19', deckKey: 'patrol', question: "Can some aircraft back up", answer: "YES (C-130 and C17)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '20', deckKey: 'patrol', question: "Who will determine if everything is deemed secure", answer: "Flight Chief and BDOC by talking to tower", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '21', deckKey: 'patrol', question: "If a aircraft is taxiing what should you do", answer: "Attempt to block the taxiway and deny the aircraft access to runway.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '22', deckKey: 'patrol', question: "How should you be positioned", answer: "Remain behind cover, maintain vigilance and secure the area/contain the situation.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '23', deckKey: 'patrol', question: "If you are able to what should you attempt to do to the suspect", answer: "Challenge (place at a disadvantage and way from the resource)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '24', deckKey: 'patrol', question: "After a suspect is detained what should you immediate action be", answer: "Purge the area for possible threats or explosives", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '25', deckKey: 'patrol', question: "How big will the cordon be", answer: "2000 feet or as directed by IC", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '26', deckKey: 'patrol', question: "Who is the initial IC", answer: "Flight chief until the arrival of higher authority.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '27', deckKey: 'patrol', question: "We have initial jurisdiction for all air piracy on WPAFB until who arrives", answer: "Federal Aviation Administration or the Federal Bureau of investigations.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '28', deckKey: 'patrol', question: "When will the FAA be in charge", answer: "Events in which are airborn or when the aircraft is on the ground and all hatches/doors are secure.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '29', deckKey: 'patrol', question: "When will the FBI be in charge", answer: "when the aircraft is on the ground and doors/hatches are still open.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  // Add more cards here - I'll include a subset for now, but you can add all 200+ cards
  { id: '30', deckKey: 'patrol', question: "What are your Primary Duties as an SF Patrolman", answer: "Protecting personnel, protecting property, preventing pilferage, supervising road traffic, enforcing traffic laws and regulations, maintaining good order, furnishing information and directions, community policing, preforming escorts, building checks. (Note be constantly alert as emergencies happen with no warning)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '31', deckKey: 'patrol', question: "Where will reports and paperwork be inputted", answer: "AFJIS on the same duty day as the incident", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '32', deckKey: 'patrol', question: "What is an Arrest", answer: "Generally used of legal authority to deprive a person of his or her freedom of movement.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '33', deckKey: 'patrol', question: "What is an Apprehension", answer: "Taking a person (SF purposes, a military member) into custody", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '34', deckKey: 'patrol', question: "What is Detention", answer: "Legal authority to temporary restrict a person of his or her freedom of movement for an investigatory purpose. (Terry Stop)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '35', deckKey: 'patrol', question: "What Amendments govern search and seizure", answer: "4th and 14th Amendment", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '36', deckKey: 'patrol', question: "What is the Air Force Traffic Enforcement Goal", answer: "Reduction of traffic related deaths, injuries and property damage", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '37', deckKey: 'patrol', question: "Is pursuit driving dangerous", answer: "YES and should be avoided except in extreme conditions", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '38', deckKey: 'patrol', question: "How many patrols should respond to domestic disturbance", answer: "at least 2", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '39', deckKey: 'patrol', question: "What are the requirements for all police vehicles used in routine or general patrol service", answer: "'Police' markings on both the right and left sides, red/blue lights and siren in proper working order and PA system.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '40', deckKey: 'patrol', question: "What does the US Magistrate have jurisdiction over", answer: "U.S. magistrates 'shall have jurisdiction to try persons accused of, and sentence persons convicted of, misdemeanors', The U.S. Magistrate Court also has jurisdiction over juveniles who commit on-installation misdemeanors", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
]

export async function getDecks(): Promise<Deck[]> {
  try {
    const blob = await list({ prefix: 'decks/', token: env.BLOB_READ_WRITE_TOKEN })
    if (blob.blobs.length === 0) {
      // Initialize with default decks
      await initializeData()
      return DEFAULT_DECKS
    }
    
    const decksBlob = blob.blobs.find(b => b.pathname === 'decks/index.json')
    if (!decksBlob) {
      await initializeData()
      return DEFAULT_DECKS
    }
    
    const response = await fetch(decksBlob.url + '?t=' + Date.now())
    const data = await response.json()
    const existingDecks = data.decks || []
    
    // Check if we need to update the deck configuration
    if (existingDecks.length < DEFAULT_DECKS.length) {
      console.log('Updating deck configuration with new decks...')
      await initializeData()
      return DEFAULT_DECKS
    }
    
    return existingDecks
  } catch (error) {
    console.error('Error getting decks:', error)
    return DEFAULT_DECKS
  }
}

export async function getDeck(key: string): Promise<Deck & { cards: Card[] } | null> {
  try {
    const decks = await getDecks()
    const deck = decks.find(d => d.key === key)
    if (!deck) return null
    
    const cards = await getCards(key)
    return { ...deck, cards }
  } catch (error) {
    console.error('Error getting deck:', error)
    return null
  }
}

export async function getCards(deckKey: string): Promise<Card[]> {
  try {
    console.log('getCards called for deck:', deckKey, 'at:', new Date().toISOString())
    const blob = await list({ prefix: `cards/${deckKey}/`, token: env.BLOB_READ_WRITE_TOKEN })
    if (blob.blobs.length === 0) {
      // Initialize with patrol cards if this is the patrol deck
      if (deckKey === 'patrol') {
        await initializePatrolCards()
        return PATROL_CARDS
      }
      return []
    }
    
    const cardsBlob = blob.blobs.find(b => b.pathname === `cards/${deckKey}/index.json`)
    if (!cardsBlob) {
      if (deckKey === 'patrol') {
        await initializePatrolCards()
        return PATROL_CARDS
      }
      return []
    }
    
    const response = await fetch(cardsBlob.url + '?t=' + Date.now())
    const data = await response.json()
    console.log('Cards loaded from blob:', data.cards?.length || 0, 'cards')
    return data.cards || []
  } catch (error) {
    console.error('Error getting cards:', error)
    if (deckKey === 'patrol') {
      return PATROL_CARDS
    }
    return []
  }
}

export async function createCard(deckKey: string, question: string, answer: string): Promise<Card> {
  try {
    console.log('Creating card:', { deckKey, questionLength: question.length, answerLength: answer.length })
    
    const newCard: Card = {
      id: Date.now().toString(),
      deckKey,
      question,
      answer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log('Getting existing cards for deck:', deckKey)
    const cards = await getCards(deckKey)
    console.log('Existing cards count:', cards.length)
    
    cards.push(newCard)
    console.log('Cards after adding new card:', cards.length)
    
    console.log('Saving cards to blob storage...')
    await put(`cards/${deckKey}/index.json`, JSON.stringify({ cards }), {
      access: 'public',
      contentType: 'application/json',
      token: env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true
    })
    
    console.log('Card created successfully:', newCard.id)
    return newCard
  } catch (error) {
    console.error('Error in createCard:', error)
    console.error('Error details:', {
      deckKey,
      questionLength: question.length,
      answerLength: answer.length,
      tokenPresent: !!env.BLOB_READ_WRITE_TOKEN,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}

export async function updateCard(id: string, fields: { question?: string; answer?: string }): Promise<Card | null> {
  // Find which deck this card belongs to
  const decks = await getDecks()
  for (const deck of decks) {
    const cards = await getCards(deck.key)
    const cardIndex = cards.findIndex(c => c.id === id)
    if (cardIndex !== -1) {
      cards[cardIndex] = {
        ...cards[cardIndex],
        ...fields,
        updatedAt: new Date().toISOString()
      }
      
      await put(`cards/${deck.key}/index.json`, JSON.stringify({ cards }), {
        access: 'public',
        contentType: 'application/json',
        token: env.BLOB_READ_WRITE_TOKEN,
        allowOverwrite: true
      })
      
      return cards[cardIndex]
    }
  }
  
  return null
}

export async function deleteCard(id: string): Promise<boolean> {
  try {
    console.log('Deleting card:', id)
    
    // Find which deck this card belongs to
    const decks = await getDecks()
    for (const deck of decks) {
      const cards = await getCards(deck.key)
      const cardIndex = cards.findIndex(c => c.id === id)
      
      if (cardIndex !== -1) {
        console.log('Found card in deck:', deck.key)
        
        // Remove the card from the array
        cards.splice(cardIndex, 1)
        console.log('Cards after deletion:', cards.length)
        
        // Save the updated cards
        await put(`cards/${deck.key}/index.json`, JSON.stringify({ cards }), {
          access: 'public',
          contentType: 'application/json',
          token: env.BLOB_READ_WRITE_TOKEN,
          allowOverwrite: true
        })
        
        console.log('Card deleted successfully:', id)
        return true
      }
    }
    
    console.log('Card not found:', id)
    return false
  } catch (error) {
    console.error('Error deleting card:', error)
    console.error('Error details:', {
      cardId: id,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}

async function initializeData() {
  try {
    await put('decks/index.json', JSON.stringify({ decks: DEFAULT_DECKS }), {
      access: 'public',
      contentType: 'application/json',
      token: env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true
    })
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

async function initializePatrolCards() {
  try {
    await put('cards/patrol/index.json', JSON.stringify({ cards: PATROL_CARDS }), {
      access: 'public',
      contentType: 'application/json',
      token: env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true
    })
  } catch (error) {
    console.error('Error initializing patrol cards:', error)
  }
}
