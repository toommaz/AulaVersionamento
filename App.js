import { View, Text, Image, StyleSheet, TextInput } from 'react-native'

export default function App() {
  return (

   <View style={css.container}>
      <Text style={css.textos}>O Melhor Motorola do mundo!</Text>
      <TextInput style={css.entrada} />
      <Image style={css.imagem} source={require('')}/>
      <Text style={css.textos}> Ai liguei a lanterna</Text>
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
    entrada:{
    height: 40,
    width:250,
    backgroundColor:'#ffffff',
    margin: 8,
    borderRadius:10,
  },
    imagem:{
    width: 250,
    height: 300,
  },
})
