import React, { useContext, useState } from 'react';
import { Text, Pressable, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedView } from "../themed-components/themed-view";
import { ThemedText } from "../themed-components/themed-text";
import { ThemedInput } from '../themed-components/themed-input';
import { commonStyles, containers, pickerStyles } from '@/styling/common';
import { requester } from '@/requester/requester';
import { AuthContext } from '@/contexts/AuthContext';
import { ApiEndpoints, ElbetitsaApiCalls, Role, UpdateUserProfileRequest, UpdateUserResponse, Voice } from '@/types/dist';
import { ThemedPicker } from '../themed-components/themed-picker';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { UserValidationSchema } from './userValidationSchema';


const voices: string[] = Object.values(Voice);

const authorizedForVoiceSet = [Role.admin, Role.member];

export const UserProfileForm = ({
  handleSuccess,
}: { handleSuccess: () => void }) => {

  const { t } = useTranslation();

  const { user, token, logIn } = useContext(AuthContext);
  const isAuthorizedForVoiceSet = authorizedForVoiceSet.includes(user.role);

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    voice: user?.voice,
  } as UpdateUserProfileRequest

  const [isSend, setIsSend] = useState(false);

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.updateUserProfile], params: [user.userId] })

  const onSubmit = async (values: UpdateUserProfileRequest) => {
    setIsSend(true);
    try {

      const res: UpdateUserResponse = await requester({
        ...requestArgs,
        formData: values,
      });
      logIn({ ...res, token });
      Alert.alert(t('warning'), t('update_msg_success'), [{
        text: t('close')
      }])
      handleSuccess();
    } catch (err: Error | unknown) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('update_msg_error')}. ${err instanceof Error ? t(err.message) : ''}. ${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Log error', err);
      setIsSend(false);
    }
  }


  return (<>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidationSchema(t)}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (<>

          <ThemedView style={[containers.form, { marginBottom: 350 }]}>

            <ThemedText type='subtitle'>{t('updateUser')}</ThemedText>


            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                placeholder={t('firstName')}
                value={values.firstName}
                onBlur={handleBlur('firstName')}
                onChangeText={handleChange('firstName')}
              />
            </ThemedView>
            {errors.firstName && touched.firstName &&
              <ThemedText type="error" >{errors.firstName}</ThemedText>}

            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                placeholder={t('lastName')}
                value={values.lastName}
                onBlur={handleBlur('lastName')}
                onChangeText={handleChange('lastName')}
              />
            </ThemedView>
            {errors.lastName && touched.lastName &&
              <ThemedText type="error" >{errors.lastName}</ThemedText>}


            {isAuthorizedForVoiceSet && <ThemedView style={[containers.inputWr, { paddingLeft: 10 }]}>
              <ThemedPicker
                selectedValue={values.voice}
                optionsList={voices}
                showChoose={values.voice ? false : true}
                style={pickerStyles.picker}
                mode={"dropdown"}
                label={t('select_msg')}
                onValueChange={(val) => setFieldValue('voice', val)}
              />
            </ThemedView>}

            {/* <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                editable={false}
                readOnly={true}
                value={user.email}
              />
            </ThemedView>


            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                editable={false}
                readOnly={true}
                value={user.role}
              />
            </ThemedView> */}


            <Pressable style={[commonStyles.themedButtonWithIcon, { padding: 10 }]}
              onPress={() => handleSubmit()} disabled={isSend}>
              <Ionicons name="log-in-outline" size={26} color={commonStyles.themedButtonWithIcon.color} />
              <Text style={commonStyles.subtitle}>{t('save')}</Text>
            </Pressable>
          </ThemedView>
        </>)}
      </Formik >
    </KeyboardAvoidingView>
  </>);
}
