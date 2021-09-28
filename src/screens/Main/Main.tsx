/**
 * Main Game Screen
 */


//#region import react and libraries

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
//#endregion

//#region import interfaces
import { deckType, cardType } from '../../interfaces/api/api';
//#endregion

//#region import requests
import { createNewDeck, drawCard } from '../../requests/'
//#endregion


//#region import styles
import { styles } from './styles';
//#endregion



const MainScreen = () => {

  //#region constants
  const [deck, setDeck] = useState<deckType>()
  const [card, setCard] = useState<cardType>()
  const [currentCardValue, setCurrentCardValue] = useState<number>(0)
  const [prevCard, setPrevCard] = useState<number>(0)
  const [successCounter, setSuccessCounter] = useState<number>(0)
  //#endregion 

  //#region functions
  const getCreatedDeckID = () => {
    createNewDeck()
      .then(res => {
        if (res.data) {
          let tempDeck = {
            status: res.data.status,
            id: res.data.deck_id,
            remaining: res.data.remaining,
            shuffled: res.data.shuffled,
          }
          setDeck(
            tempDeck
          )
          showCard(tempDeck, true, '')
        }
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'Somethings went wrong',
          [

            { text: 'Ok' },
          ]
        )
      })
  }


  const showCard = (deck: object, resetPrev = false, flag: string) => {
    if (deck) {
      drawCard(deck.id)
        .then(res => {
          if (res.data) {
            if (resetPrev) {
              convertCardValue(res.data.cards[0].value, setPrevCard)
            }
            else if (flag) {
              flag === 'up' ? convertCardValue(res.data.cards[0].value, setCurrentCardValue) > prevCard && setSuccessCounter(successCounter + 1)
                :
                convertCardValue(res.data.cards[0].value, setCurrentCardValue) < prevCard && setSuccessCounter(successCounter + 1)
              setPrevCard(currentCardValue)
            }
            setCard(
              {
                image: res.data.cards[0].image,
                value: res.data.cards[0].value,
                suit: res.data.cards[0].suit,
              }
            )
            setDeck(
              {
                ...deck,
                remaining: res.data.remaining
              }
            )
          }
        })
        .catch(err => {
          Alert.alert(
            'Error',
            'Somethings went wrong',
            [

              { text: 'Ok' },
            ]
          )
        })
    }
  }

  const convertCardValue = (value: string, funcSet) => {

    switch (value) {
      case '1':
        funcSet(1)
        return 1
      case '2':
        funcSet(2)
        return 2
      case '3':
        funcSet(3)
        return 3
      case '4':
        funcSet(4)
        return 4
      case '5':
        funcSet(5)
        return 5
      case '6':
        funcSet(6)
        return 6
      case '7':
        funcSet(7)
        return 7
      case '8':
        funcSet(8)
        return 8
      case '9':
        funcSet(9)
        return 9
      case '10':
        funcSet(10)
        return 10
      case 'KING':
        funcSet(13)
        return 13
      case 'QUEEN':
        funcSet(12)
        return 12
      case 'JACK':
        funcSet(11)
        return 11
      case 'ACE':
        funcSet(14)
        return 14
      case 'JOKER':
        funcSet(15)
        return 15
      default:
        return 0

    }
  }

  //#endregion

  //#region useeffects
  useEffect(() => {
    getCreatedDeckID()
  }, [])

  //#endregion


  return (
    <SafeAreaView style={styles.container}>
      {deck && card ?
        deck.remaining > 0 ?
          <>
            <View style={styles.statisticsWrapper}>
              <Text>
                {`Predicted count: ${successCounter}`}
              </Text>
              <Text>
                {`Remain count: ${deck.remaining}`}
              </Text>
            </View>

            <View style={styles.cardShowWrapper}>
              <View style={styles.cardImageWrapper}>
                <Image source={{ uri: card.image }} style={styles.cardImage} />
              </View>
            </View>

            <View style={styles.predButtons}>
              <TouchableOpacity
                style={styles.downButton}
                onPress={() => showCard(deck, false, 'down')}
              >
                <Text style={styles.buttonText}>Go Down</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.upButton}
                onPress={() => showCard(deck, false, 'up')}
              >
                <Text style={styles.buttonText}>Go Up</Text>
              </TouchableOpacity>
            </View>
          </>

          : <Text>Game Over</Text>
        : <Text>Loading...</Text>}
    </SafeAreaView>
  );
};



export default MainScreen;
