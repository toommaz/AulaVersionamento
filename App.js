import { View, Text, Image, StyleSheet, } from 'react-native'

export default function App() {
  return (

   <View style={css.container}>
     <Text style={css.textos}>O Melhor Motorola do mundo!</Text>
     <Text style={css.textos}> Ai liguei a lanterna</Text>
     <Image style={css.imagem} source={require('')}/>
   </View>

  );
}
const css = StyleSheet.create({
  container:{
    backgroundColor: '#836FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },

  textos:{
    fontSize:20,
    fontWeight:100,

  },
    imagem:{
    width: 250,
    height: 300,
  },
})
