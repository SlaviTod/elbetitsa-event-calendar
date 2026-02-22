import React from 'react';
import { StyleSheet, Button, Pressable, useColorScheme } from "react-native";
import { Formik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LoginRequest } from "../../../elbetitsa-types/dist";
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import { LoginValidationSchema } from "./validateLoginForm";
import { useTranslation } from "react-i18next";
import { ThemedInput } from '../themed-input';


export const LoginForm = () => {

  const { t } = useTranslation();

  const onSubmit = (values: LoginRequest) => {
    console.log("🚀 ~ onSubmit ~ values:", values)
    // TODO requester 
  }


  return (<>

    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={() => LoginValidationSchema(t)}
      onSubmit={onSubmit}

      style={styles.form}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ThemedView>

          <ThemedInput
            style={styles.input}
            placeholder={t('email')}
            value={values.email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
          />

          <ThemedInput
            style={styles.input}
            placeholder={t('password')}
            value={values.password}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('password')}
          />


          {/* <Button title="Submit" onPress={() => handleSubmit()}></Button> */}
          <Pressable>
            <ThemedView >
              <Ionicons name="log-in" size={24} color="black" />
              <ThemedText onPress={() => handleSubmit()}>{t('login')}</ThemedText>
            </ThemedView>
          </Pressable>

        </ThemedView>
      )}
    </Formik>
    {/* TODO isFirstLogin => welcome alert  */}
  </>);
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  input: {
    minWidth: 200,
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'orange',
    borderStyle: 'solid',
    borderRadius: 10,

  }
})