import React from 'react';
import {addDoc, collection, getDocs} from 'firebase/firestore';
import {db} from '../../../firebaseConfig';
import {Controller, useForm} from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';

type FormData = {
  nome: string;
  sobrenome: string;
  email: string;
  idade: string;
  endereco: string;
  errors: any;
};

export default function Form() {
  const collectionRef = collection(db, 'forms');

  const addForm = async (data: FormData) => {
    try {
      await addDoc(collectionRef, data);
      console.log('Data added to Firestore');
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      nome: '',
      sobrenome: '',
      email: '',
      idade: '',
      endereco: '',
    },
  });

  const onSubmit = (data: FormData) => {
    addForm(data);
    console.log(data);
    reset({
      nome: '',
      sobrenome: '',
      email: '',
      idade: '',
      endereco: '',
    });
  };

  return (
    <ScrollView>
      <View style={styles.navbar}>
        {/* <Text style={{color: '#000'}}></Text> */}
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Formulário dos Pais</Text>

        <Controller
          name="nome"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.nome && <Text style={styles.error}>Preencha o Nome.</Text>}
        <Controller
          name="sobrenome"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Sobrenome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.sobrenome && (
          <Text style={styles.error}>Preencha o Sobrenome</Text>
        )}
        <Controller
          name="email"
          control={control}
          rules={{required: 'Preencha o e-mail'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="E-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.email && <Text style={styles.error}> Preencha o E-mail </Text>}
        <Controller
          name="idade"
          control={control}
          rules={{required: 'Preencha a idade'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Idade"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()} // Convert value to string
              style={styles.input}
              keyboardType="numeric"
            />
          )}
        />
        {errors.idade && <Text style={styles.error}>Preencha a Idade</Text>}

        <Controller
          name="endereco"
          control={control}
          rules={{required: 'Preencha o endereço'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Endereço"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.endereco && (
          <Text style={styles.error}>Preencha o Endereço</Text>
        )}

        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            Enviar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    marginTop: 100,
    alignItems: 'center',
    borderColor: 'black',
  },
  navbar: {
    backgroundColor: '#5500ff',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    padding: 0,
    margin: 0,

    width: '100%',
    paddingHorizontal: 30,
  },
  input: {
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  error: {
    color: 'red',
    marginTop: -10,
    marginBottom: 15,
  },
  button: {
    marginVertical: 40,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});
