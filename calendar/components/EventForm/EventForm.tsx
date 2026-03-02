import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';

import { ThemedView } from "../themed/themed-view";
import { ThemedText } from "../themed/themed-text";
import { ThemedInput } from '../themed/themed-input';
import { IconButton } from '../buttons/IconButton';
import { commonStyles, containers, pickerStyles } from '@/styling/common';


import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';
import { PrivateEvent, PrivateEventRequest, RepetitiveEvents, Role } from '@/types/dist';
import { EventValidationSchema } from './eventValidationSchema';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedPicker } from '../themed/themed-picker';
import { OneTimePrivateEvents } from '@/types/dist';
import { AuthContext } from '@/contexts/AuthContext';
import { MyInput } from '../themed/my-input';

import { ThemedSwitch } from '../themed/themed-switch';
import { RequiredStar } from '../ui/required-star';
import { DateTime } from 'luxon';
import { DateTimePicker } from '../pickers/DateTimePicker';

const privateEventsType: string[] = [OneTimePrivateEvents.oneTimeRehearsal, OneTimePrivateEvents.publicEvent, OneTimePrivateEvents.trip, OneTimePrivateEvents.other];
const privateEventsTypeForAdminAndConductor = [...privateEventsType, RepetitiveEvents.recurringRehearsal];

type EventProps = {
  event?: PrivateEvent;
  date?: string;
}

const initialValues = {
  eventType: '',
  title: '',
  description: '',
  address: '',
  city: '',
  country: '',
  mapLink: '',
  start: undefined,
  end: undefined,
  durationInMinutes: '',
}

export const EventForm = ({
  event,
  date,
}: EventProps) => {

  const { t } = useTranslation();

  const router = useRouter();

  // if (!date) {
  //   Alert.alert(t('warning'), t('eventForm_msg'), [{
  //     text: t('close')
  //   }]);
  //   router.back();
  // }
  const start = date ? DateTime.fromFormat(date, 'yyyy-MM-dd').toJSDate() : DateTime.now().toJSDate();

  const { user } = useContext(AuthContext);

  const isAdmin = user.role === Role.admin;
  const isConductor = user.role === Role.conductor;


  const onSubmit = (values: any) => {
    // TODO requester + isSend PrivateEventRequest
  }

  const [showRequired, setShowRequired] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [startTime, setStartTime] = useState(false);

  const [isSend, setIsSend] = useState(false);


  const toggleSwitch = () => {
    setShowRequired((st) => !st);
  }

  const toggleSwitchAdditional = () => {
    setShowAdditional((st) => !st);
  }

  const handleStartAt = (date: Date | undefined) => {
    console.log("🚀 ~ handleStartAt ~ date:", date);

  }

  const toggleSetStartAt = () => {
    console.log("🚀 ~ handleStartAtSelect ~ date: click");
    setStartTime((st) => !st);
  }
  
  const log = (data: any) => {
    console.log("🚀 ~ log ~ date: click", data);
    
  }


  return (<SafeAreaView>
    <ThemedSwitch
      name={'requiredSwitch'}
      onValueChange={toggleSwitch}
      value={showRequired}
    />
    <ThemedSwitch
      name={'addSwitch'}
      onValueChange={toggleSwitchAdditional}
      value={showAdditional}
    />

    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Formik
          initialValues={{ ...initialValues, start }}
          validationSchema={EventValidationSchema(t)}
          onSubmit={values => onSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (<>
            <ThemedView style={[containers.form, { marginTop: 0, marginBottom: 300 }]}>

              <ThemedText style={commonStyles.label}>{t('eventType')}</ThemedText>
              <ThemedView style={[containers.inputWr, { paddingLeft: 10 }]}>
                {/* TODO fix */}
                {showRequired && <RequiredStar />}

                <ThemedPicker
                  selectedValue={values.eventType}
                  optionsList={isAdmin || isConductor ? privateEventsTypeForAdminAndConductor
                    : privateEventsType}
                  showChoose={values.eventType ? false : true}
                  style={pickerStyles.picker}
                  mode={"dropdown"}
                  label={t('select_msg')}
                  t={t}
                  onValueChange={(val) => setFieldValue('eventType', val)}
                />
              </ThemedView>

              <ThemedView style={[containers.inputWr, { borderColor: 'transparent', margin: 0 }, containers.titleWithIconButton]}>
                {showRequired && <RequiredStar />}
                <ThemedText>{DateTime.fromJSDate(values.start).toFormat('yyyy-MM-dd  HH:mm')}</ThemedText>

                {!startTime && <ThemeButton
                  buttonStyle={[commonStyles.themedButtonWithIcon, { minWidth: 100 }]}
                  handler={() => toggleSetStartAt()}
                  disabled={isSend}
                  iconName="time"
                  iconSize={20}
                  iconColor={commonStyles.themedButtonWithIcon.color}
                  textStyle={commonStyles.default}
                  buttonText={t('startAt')}
                />}

                {startTime && <DateTimePicker
                  testID="dateTimePicker"
                  value={start}
                  mode={'time'}
                  is24Hour={true}
                  display='spinner'
                  minuteInterval={30}
                  timeZoneName={'Europe/Sofia'}
                  onChange={(e, date) => { setFieldValue('start', date); toggleSetStartAt()}}
                  onError={log}
                />}

              </ThemedView>

              {!!values.durationInMinutes && <ThemedText style={commonStyles.label}>{t('durationInMinutes')}</ThemedText>}
              <MyInput
                wrapperStyle={containers.inputWr}
                style={commonStyles.input}
                showRequired={showRequired}
                isRequired={true}
                placeholder={t('durationInMinutes')}
                value={values.durationInMinutes}
                keyboardType="numeric"
                onBlur={handleBlur('durationInMinutes')}
                onChangeText={handleChange('durationInMinutes')}
              />
              {errors.durationInMinutes && touched.durationInMinutes &&
                <ThemedText type="error" >{errors.durationInMinutes}</ThemedText>}


              {!!values.title && <ThemedText style={commonStyles.label}>{t('title')}</ThemedText>}
              <MyInput
                wrapperStyle={containers.inputWr}
                style={commonStyles.input}
                showRequired={showRequired}
                isRequired={true}
                placeholder={t('title')}
                value={values.title}
                onBlur={handleBlur('title')}
                onChangeText={handleChange('title')}
              />
              {errors.title && touched.title &&
                <ThemedText type="error" >{errors.title}</ThemedText>}

              {!!values.description && <ThemedText style={commonStyles.label}>{t('description')}</ThemedText>}
              <MyInput
                wrapperStyle={containers.inputWr}
                style={[commonStyles.input, (values.description?.length > 20 ? { height: 150 } : {})]}
                placeholder={t('description')}
                value={values.description}
                multiline={values.description?.length > 20}
                onBlur={handleBlur('description')}
                onChangeText={handleChange('description')}
              />
              {errors.description && touched.description &&
                <ThemedText type="error" >{errors.description}</ThemedText>}


              {showAdditional && <>
                {!!values.address && <ThemedText style={commonStyles.label}>{t('address')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('address')}
                  value={values.address}
                  onBlur={handleBlur('address')}
                  onChangeText={handleChange('address')}
                />
                {errors.address && touched.address &&
                  <ThemedText type="error" >{errors.address}</ThemedText>}


                {!!values.city && <ThemedText style={commonStyles.label}>{t('city')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('city')}
                  value={values.city}
                  onBlur={handleBlur('city')}
                  onChangeText={handleChange('city')}
                />
                {errors.city && touched.city &&
                  <ThemedText type="error" >{errors.city}</ThemedText>}


                {!!values.country && <ThemedText style={commonStyles.label}>{t('country')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('country')}
                  value={values.country}
                  onBlur={handleBlur('country')}
                  onChangeText={handleChange('country')}
                />
                {errors.country && touched.country &&
                  <ThemedText type="error" >{errors.country}</ThemedText>}


                {!!values.mapLink && <ThemedText style={commonStyles.label}>{t('mapLink')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('mapLink')}
                  value={values.mapLink}
                  onBlur={handleBlur('mapLink')}
                  onChangeText={handleChange('mapLink')}
                />
                {errors.mapLink && touched.mapLink &&
                  <ThemedText type="error" >{errors.mapLink}</ThemedText>}

              </>}







              <ThemeButton
                buttonStyle={[commonStyles.themedButtonWithIcon]}
                handler={() => handleSubmit()}
                disabled={isSend}
                iconName="add"
                iconSize={26}
                iconColor={commonStyles.themedButtonWithIcon.color}
                textStyle={commonStyles.subtitle}
                buttonText={!event ? t('add_event') : t('update_event')}
              />

            </ThemedView>
          </>)}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>);
}
